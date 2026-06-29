# Team Card Actions Design

## Context

The Team page currently uses each member card as a single link to the member profile URL. The card also exposes a custom right-click menu with actions for copying the email address and visiting the homepage. This hides primary actions behind an uncommon interaction, does not work well on touch devices, and makes the visible email address feel non-interactive.

The selected design is to make both important actions visible on the card:

- Visit the member homepage.
- Copy the member email address.

## Goals

- Replace the custom right-click menu with visible card actions.
- Keep homepage access and email copying equally discoverable.
- Make the interaction work on desktop and mobile.
- Preserve existing English and Chinese language switching behavior.
- Restore normal browser right-click behavior on Team cards.

## Non-Goals

- Do not change team member order, names, email addresses, profile URLs, or research direction content.
- Do not redesign the full Team page layout.
- Do not add a mail client launch action unless it is added later as a separate, explicit feature.

## Interaction Design

Each Team card should remain a compact profile summary with avatar, name, email, and research direction. The card itself should no longer be the only clickable target. Instead, it should include a small action row with two direct controls:

- `Homepage` / `主页`: an ordinary link to the member URL.
- `Copy email` / `复制邮箱`: a button that copies the member email to the clipboard.

Clicking `Copy email` should provide lightweight feedback without changing layout. The button label can temporarily change to `Copied` / `已复制`, then return to the normal label. If the Clipboard API is unavailable, the existing textarea fallback copy behavior can be reused.

Right-clicking a card should no longer open a site-specific menu. The browser's default context menu should appear.

## Component Changes

### `includes/project.html`

- Change the outer card from an `<a>` to a non-link container so nested links and buttons are valid HTML.
- Keep the existing visual card treatment: dashed border, hover offset, avatar, centered name, email text, and description.
- Add an action row inside the card with:
  - a profile link using the existing `{url}`;
  - a copy button carrying the existing `{email}` value.
- Add translation hooks for the action labels and copy feedback text.

### `assets/js/main.js`

- Remove the custom project card context menu initialization and contextmenu event handling.
- Add a small initializer for copy-email buttons.
- On click, copy the email address, update the clicked button's label to the localized copied state, then restore it after a short delay.
- Ensure dynamically localized labels are derived from the current site language.

### Translation Keys

Keep the existing language structure and add or reuse keys as follows:

- `context.visitHomepage`: existing label for the homepage action.
- `context.copyEmail`: existing label for the copy action.
- `context.emailCopied`: new label for successful copy feedback.

## Accessibility

- Use a real `<a>` for homepage navigation.
- Use a real `<button type="button">` for copying email.
- Give the copy button an accessible label that includes the email address or uses clear visible text.
- Do not rely on hover-only or right-click-only interactions.
- Keep keyboard interaction natural: Tab reaches both controls, Enter opens the link, Space/Enter activates the copy button.

## Testing

Automated tests should cover:

- `includes/project.html` no longer exposes `data-profile-url` for the context menu path.
- `includes/project.html` includes a homepage link and a copy-email button.
- `assets/js/main.js` no longer registers `contextmenu` handlers for team cards.
- `assets/js/main.js` initializes copy-email buttons and uses `context.emailCopied`.
- English and Chinese translations include `context.emailCopied`.

Manual browser verification should cover:

- Team cards show both actions on desktop and mobile widths.
- Clicking `主页` / `Homepage` navigates to the correct profile URL.
- Clicking `复制邮箱` / `Copy email` copies the address and shows localized feedback.
- Right-clicking a card opens the browser default context menu instead of a custom menu.

## Acceptance Criteria

- The custom right-click menu is removed from Team cards.
- Homepage and copy-email actions are visible without right-clicking.
- Email copying works with localized feedback in English and Chinese.
- Existing team data and bilingual content remain unchanged.
- Tests and static build pass.
