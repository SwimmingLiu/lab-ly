// Add your javascript here

window.darkMode = false;

const stickyClasses = ['fixed', 'h-14'];
const unstickyClasses = ['absolute', 'h-20'];
const stickyClassesContainer = ['border-neutral-300/50' , 'bg-white/80', 'dark:border-neutral-600/40', 'dark:bg-neutral-900/60', 'backdrop-blur-2xl'];
const unstickyClassesContainer = ['border-transparent'];
let headerElement = null;

document.addEventListener('DOMContentLoaded', function(){
    headerElement = document.getElementById('header');

    if(localStorage.getItem('dark_mode') && localStorage.getItem('dark_mode') == 'true'){
        window.darkMode = true;
        showNight();
    } else {
        showDay();
    }
    stickyHeaderFuncionality();
    applyMenuItemClasses();
    evaluateHeaderPosition();
    mobileMenuFunctionality();
    initProjectCardContextMenu();
});

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }




window.stickyHeaderFuncionality = function(){
    window.addEventListener('scroll', function() {
        evaluateHeaderPosition();
    });
}

window.evaluateHeaderPosition = function(){
    if(window.scrollY > 16){
        headerElement.firstElementChild.classList.add(...stickyClassesContainer);
        headerElement.firstElementChild.classList.remove(...unstickyClassesContainer);
        headerElement.classList.add(...stickyClasses);
        headerElement.classList.remove(...unstickyClasses);
        document.getElementById('menu').classList.add('top-[56px]');
        document.getElementById('menu').classList.remove('top-[75px]');

    } else {
        headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
        headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
        headerElement.classList.add(...unstickyClasses);
        headerElement.classList.remove(...stickyClasses);
        document.getElementById('menu').classList.remove('top-[56px]');
        document.getElementById('menu').classList.add('top-[75px]');
    }
}



document.getElementById('darkToggle').addEventListener('click', function(){
    document.documentElement.classList.add('duration-300');
    
    if(document.documentElement.classList.contains('dark')){
        localStorage.removeItem('dark_mode');
        showDay(true);
        
    } else {
        localStorage.setItem('dark_mode', true);
        showNight(true);
        
    }
});

function showDay(animate){
    document.getElementById('sun').classList.remove('setting');
    document.getElementById('moon').classList.remove('rising');
    
    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('moon').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('dayText').classList.remove('hidden');
        document.getElementById('nightText').classList.add('hidden');

        document.getElementById('moon').classList.add('hidden');
        document.getElementById('sun').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.remove('dark');
            document.getElementById('sun').classList.add('rising');
        }
        
    }, timeout);
}

function showNight(animate){
    document.getElementById('moon').classList.remove('setting');
    document.getElementById('sun').classList.remove('rising');

    let timeout = 0;
    

    if(animate){
        timeout = 500;
        
        document.getElementById('sun').classList.add('setting');
    }

    setTimeout(function(){
        document.getElementById('nightText').classList.remove('hidden');
        document.getElementById('dayText').classList.add('hidden');

        document.getElementById('sun').classList.add('hidden');
        document.getElementById('moon').classList.remove('hidden');

        if(animate){
            document.documentElement.classList.add('dark');
            document.getElementById('moon').classList.add('rising');
        }

    }, timeout);
}

window.applyMenuItemClasses = function(){
    const menuItems = document.querySelectorAll('#menu a');
    console.log(menuItems);
    for(let i = 0; i < menuItems.length; i++){
        if(menuItems[i].pathname == window.location.pathname){
            menuItems[i].classList.add('text-neutral-900', 'dark:text-white');
        }
    }
    //:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
}


function mobileMenuFunctionality(){
    document.getElementById('openMenu').addEventListener('click', function(){
        openMobileMenu();
    });

    document.getElementById('closeMenu').addEventListener('click', function(){
        closeMobileMenu();
    });
}

window.openMobileMenu = function(){
    document.getElementById('openMenu').classList.add('hidden');
    document.getElementById('closeMenu').classList.remove('hidden');
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('mobileMenuBackground').classList.add('opacity-0');
    document.getElementById('mobileMenuBackground').classList.remove('hidden');

    setTimeout(function(){
        document.getElementById('mobileMenuBackground').classList.remove('opacity-0');
    }, 1);
}

window.closeMobileMenu = function(){
    document.getElementById('closeMenu').classList.add('hidden');
    document.getElementById('openMenu').classList.remove('hidden');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('mobileMenuBackground').classList.add('hidden');
}

function initProjectCardContextMenu(){
    const cards = document.querySelectorAll('[data-email]');
    if(!cards.length){
        return;
    }

    const menu = document.createElement('div');
    menu.id = 'projectCardContextMenu';
    menu.className = 'fixed z-50 hidden min-w-32 overflow-hidden rounded-md border border-neutral-200 bg-white py-1 text-sm shadow-lg dark:border-neutral-700 dark:bg-neutral-900';
    document.body.appendChild(menu);

    cards.forEach(function(card){
        card.addEventListener('contextmenu', function(event){
            event.preventDefault();
            showProjectCardContextMenu(event, card, menu);
        });
    });

    document.addEventListener('click', function(){
        hideProjectCardContextMenu(menu);
    });

    document.addEventListener('keydown', function(event){
        if(event.key === 'Escape'){
            hideProjectCardContextMenu(menu);
        }
    });

    window.addEventListener('scroll', function(){
        hideProjectCardContextMenu(menu);
    }, { passive: true });
}

function showProjectCardContextMenu(event, card, menu){
    const email = card.dataset.email;
    const profileUrl = card.dataset.profileUrl || card.getAttribute('href');
    const hasHomepage = isHomepageUrl(profileUrl);
    const items = [
        {
            label: '复制邮箱',
            action: function(){
                copyTextToClipboard(email);
            }
        }
    ];

    if(hasHomepage){
        items.push({
            label: '访问主页',
            action: function(){
                window.location.href = profileUrl;
            }
        });
    }

    menu.innerHTML = '';
    items.forEach(function(item){
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'block w-full px-4 py-2 text-left text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800';
        button.textContent = item.label;
        button.addEventListener('click', function(){
            item.action();
            hideProjectCardContextMenu(menu);
        });
        menu.appendChild(button);
    });

    menu.classList.remove('hidden');
    const menuRect = menu.getBoundingClientRect();
    const x = Math.min(event.clientX, window.innerWidth - menuRect.width - 8);
    const y = Math.min(event.clientY, window.innerHeight - menuRect.height - 8);
    menu.style.left = Math.max(8, x) + 'px';
    menu.style.top = Math.max(8, y) + 'px';
}

function hideProjectCardContextMenu(menu){
    if(menu){
        menu.classList.add('hidden');
    }
}

function isHomepageUrl(url){
    if(!url){
        return false;
    }

    return !url.startsWith('mailto:') && !url.startsWith('javascript:');
}

function copyTextToClipboard(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}
