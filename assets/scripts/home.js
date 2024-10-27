const themeMode = document.querySelector('.icon.tm');
const changeLang = document.querySelector('.icon.lang');
themeMode.addEventListener('click', function() {
    html.dataset.theme = (html.dataset.theme === 'dark' ? 'light' : 'dark');
});
changeLang.addEventListener('click', function() {
    html.lang = (html.lang === 'en' ? 'pt-BR' : 'en');
    createContainer(document.querySelector('.nav-main__list .active'));
});
schemeMode.addEventListener('change', changeTheme);

const navMainList = document.querySelector('.nav-main__list');
const main = document.querySelector('.container');
function mainMaps(i) {
    return [
        {
            "title": ["main", "h1", [["textContent", 'lang__main-home-title']]]
        }
    ][i]
}
const navMain = {};
const navMainLang = {};
function createContainer(el) {
    for(let i = 0; i < navMainList.children.length; i++) {
        navMainList.children[i].addEventListener('click', async function() {
            if(!navMain[i]) {
                navMain[i] = [];
                await loadScript(`nav-main-${i}`);
            }
            if(!navMainLang[html.lang] || !navMainLang[html.lang][i]) {
                if(!navMainLang[html.lang]) {
                    navMainLang[html.lang] = [];
                }
                navMainLang[html.lang][i] = await getData('nav-main-' + i); 
            }
            const tabActive = document.querySelector('.nav-main__list .active');
            if(tabActive) {
                tabActive.classList.remove('active');
            }
            this.classList.add('active');
            while(main.lastChild) {
                main.lastChild.remove();
            }
            createElems(navMain[i], {main: main}, navMainLang[html.lang][i]);
        });
    }
    (el || navMainList.children[0]).click();
}
createContainer();