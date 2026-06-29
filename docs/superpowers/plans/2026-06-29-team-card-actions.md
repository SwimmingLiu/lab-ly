# Team Card Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Team card custom right-click menu with visible homepage and copy-email actions.

**Architecture:** Keep the existing static component structure and language dictionary. Convert `includes/project.html` from a full-card link into a non-link card container with a real homepage link and a copy-email button. Replace the JavaScript context menu initializer with a focused copy-button initializer that reuses the existing clipboard fallback.

**Tech Stack:** DevDojo Static templates, vanilla JavaScript, Tailwind utility classes, Node.js built-in test runner.

---

## File Structure

- Modify `includes/project.html`: Team card markup, action row, data attributes for copy buttons.
- Modify `assets/js/main.js`: translation labels, DOM initialization call, copy-email action behavior, removal of custom context menu handling.
- Modify `tests/card-context-menu.test.mjs`: turn the old context menu expectations into visible-action expectations.
- Modify `tests/language-runtime.test.mjs`: assert the new copied feedback translations exist.

## Task 1: Lock The New Card Contract With Failing Tests

**Files:**
- Modify: `tests/card-context-menu.test.mjs`
- Modify: `tests/language-runtime.test.mjs`

- [ ] **Step 1: Replace card interaction expectations**

Update `tests/card-context-menu.test.mjs` to this content:

```js
import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(projectCard, /data-email="\{email\}"/);
assert.doesNotMatch(projectCard, /data-profile-url="\{url\}"/);
assert.doesNotMatch(projectCard, /^<a href="\{url\}"/);
assert.match(projectCard, /data-copy-email="\{email\}"/);
assert.match(projectCard, /data-i18n="context\.visitHomepage"/);
assert.match(projectCard, /data-i18n="context\.copyEmail"/);
assert.match(projectCard, /href="\{url\}"/);
assert.match(projectCard, /type="button"/);

assert.doesNotMatch(mainJs, /initProjectCardContextMenu/);
assert.doesNotMatch(mainJs, /contextmenu/);
assert.doesNotMatch(mainJs, /projectCardContextMenu/);
assert.match(mainJs, /initCopyEmailButtons/);
assert.match(mainJs, /data-copy-email/);
assert.match(mainJs, /getTranslation\('context\.copyEmail'\)/);
assert.match(mainJs, /getTranslation\('context\.emailCopied'\)/);
assert.match(mainJs, /'context.copyEmail': 'Copy email'/);
assert.match(mainJs, /'context.copyEmail': '复制邮箱'/);
assert.match(mainJs, /'context.visitHomepage': 'Visit homepage'/);
assert.match(mainJs, /'context.visitHomepage': '访问主页'/);
assert.match(mainJs, /'context.emailCopied': 'Copied'/);
assert.match(mainJs, /'context.emailCopied': '已复制'/);
assert.match(mainJs, /navigator\.clipboard\.writeText/);
```

- [ ] **Step 2: Add runtime translation expectations**

Append these assertions to `tests/language-runtime.test.mjs` near the existing `context.*` checks:

```js
assert.match(mainJs, /'context.emailCopied': 'Copied'/);
assert.match(mainJs, /'context.emailCopied': '已复制'/);
```

- [ ] **Step 3: Run the failing tests**

Run:

```bash
rtk node --test tests/card-context-menu.test.mjs tests/language-runtime.test.mjs
```

Expected: `tests/card-context-menu.test.mjs` fails because `includes/project.html` still has `data-profile-url`, the full-card `<a>`, no copy button, and `assets/js/main.js` still contains the context menu code.

## Task 2: Implement Visible Team Card Actions

**Files:**
- Modify: `includes/project.html`

- [ ] **Step 1: Replace full-card link markup**

Change the outer element in `includes/project.html` from:

```html
<a href="{url}" data-email="{email}" data-profile-url="{url}" rel="noopener noreferrer" class="relative flex flex-col items-stretch duration-300 ease-out p-7 sm:p-3 group h-auto min-h-56 w-full max-w-64 mx-auto rounded-2xl">
```

to:

```html
<article data-email="{email}" class="relative flex flex-col items-stretch duration-300 ease-out p-7 sm:p-3 group h-auto min-h-56 w-full max-w-64 mx-auto rounded-2xl">
```

Change the closing `</a>` to `</article>`.

- [ ] **Step 2: Add the visible action row**

Inside the existing text block, after the description span:

```html
<span data-i18n="{descriptionKey}" class="mt-2 block text-sm leading-6 break-words text-neutral-600 dark:text-neutral-400">{description}</span>
```

add:

```html
            <span class="mt-4 flex w-full items-center justify-center gap-2">
                <a href="{url}" rel="noopener noreferrer" data-i18n="context.visitHomepage" class="inline-flex min-h-8 items-center justify-center rounded-full border border-neutral-300 px-3 text-[11px] font-semibold leading-none text-neutral-700 duration-200 hover:border-neutral-600 hover:text-neutral-950 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400 dark:hover:text-white">Visit homepage</a>
                <button type="button" data-copy-email="{email}" data-i18n="context.copyEmail" class="inline-flex min-h-8 items-center justify-center rounded-full border border-neutral-300 px-3 text-[11px] font-semibold leading-none text-neutral-700 duration-200 hover:border-neutral-600 hover:text-neutral-950 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400 dark:hover:text-white">Copy email</button>
            </span>
```

- [ ] **Step 3: Run the card contract test**

Run:

```bash
rtk node --test tests/card-context-menu.test.mjs
```

Expected: test still fails because JavaScript has not been updated yet, but the markup-related assertions now pass.

## Task 3: Replace Context Menu JavaScript With Copy Button Behavior

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Add copied feedback translations**

In both `en` and `zh` dictionaries, near the existing `context.copyEmail` and `context.visitHomepage` keys, add:

```js
'context.emailCopied': 'Copied',
```

and:

```js
'context.emailCopied': '已复制',
```

- [ ] **Step 2: Change the DOM initializer call**

In the `DOMContentLoaded` callback, replace:

```js
    initProjectCardContextMenu();
```

with:

```js
    initCopyEmailButtons();
```

- [ ] **Step 3: Remove the context menu functions**

Delete the complete function blocks whose declarations start with these exact lines:

```js
function initProjectCardContextMenu(){
function showProjectCardContextMenu(event, card, menu){
function hideProjectCardContextMenu(menu){
function isHomepageUrl(url){
```

Keep `copyTextToClipboard(text)`.

- [ ] **Step 4: Add the copy button initializer**

Immediately before `copyTextToClipboard(text)`, add:

```js
function initCopyEmailButtons(){
    const buttons = document.querySelectorAll('[data-copy-email]');
    if(!buttons.length){
        return;
    }

    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            const email = button.dataset.copyEmail;
            if(!email){
                return;
            }

            copyTextToClipboard(email);
            button.textContent = getTranslation('context.emailCopied');

            clearTimeout(button.copyResetTimeout);
            button.copyResetTimeout = setTimeout(function(){
                button.textContent = getTranslation('context.copyEmail');
            }, 1600);
        });
    });
}
```

- [ ] **Step 5: Run focused tests**

Run:

```bash
rtk node --test tests/card-context-menu.test.mjs tests/language-runtime.test.mjs
```

Expected: both tests pass.

## Task 4: Verify The Full Site

**Files:**
- No code edits.

- [ ] **Step 1: Run all tests**

Run:

```bash
rtk node --test tests/*.test.mjs
```

Expected: all tests pass.

- [ ] **Step 2: Build static site**

Run:

```bash
rtk npx static build
```

Expected: build exits successfully with `Successfully built your new static website`.

- [ ] **Step 3: Check whitespace**

Run:

```bash
rtk git diff --check -- includes/project.html assets/js/main.js tests/card-context-menu.test.mjs tests/language-runtime.test.mjs
```

Expected: no output and exit code 0.

- [ ] **Step 4: Browser verification**

Open the built site from `_site` and verify:

- Team cards show `Visit homepage` and `Copy email` in English.
- Switching to Chinese changes the actions to `访问主页` and `复制邮箱`.
- Clicking `复制邮箱` changes that button to `已复制` briefly.
- Right-clicking a Team card shows the browser default context menu, not a custom in-page menu.

## Task 5: Commit The Implementation

**Files:**
- Stage: `includes/project.html`
- Stage: `assets/js/main.js`
- Stage: `tests/card-context-menu.test.mjs`
- Stage: `tests/language-runtime.test.mjs`
- Stage: `docs/superpowers/plans/2026-06-29-team-card-actions.md`

- [ ] **Step 1: Inspect staged scope**

Run:

```bash
rtk git diff -- includes/project.html assets/js/main.js tests/card-context-menu.test.mjs tests/language-runtime.test.mjs docs/superpowers/plans/2026-06-29-team-card-actions.md
```

Expected: diff only contains Team card action implementation and this plan.

- [ ] **Step 2: Stage files**

Run:

```bash
rtk git add includes/project.html assets/js/main.js tests/card-context-menu.test.mjs tests/language-runtime.test.mjs docs/superpowers/plans/2026-06-29-team-card-actions.md
```

- [ ] **Step 3: Commit**

Run:

```bash
rtk git commit -m "feat: add visible team card actions"
```

Expected: commit succeeds.
