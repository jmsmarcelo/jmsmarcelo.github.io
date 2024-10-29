const themeMode = document.querySelector('.icon.tm');
const changeLang = document.querySelector('.icon.lang');
themeMode.addEventListener('click', function(e) {
    e.preventDefault();
    html.dataset.theme = (html.dataset.theme === 'dark' ? 'light' : 'dark');
});
changeLang.addEventListener('click', function(e) {
    e.preventDefault();
    html.lang = (html.lang === 'en' ? 'pt-BR' : 'en');
    createContainer(document.querySelector('.nav-main__list .active'));
    updateAG(btnsAG, [changeLang, themeMode]);
    updateAG(ariaMainAG, navMainList);
});
schemeMode.addEventListener('change', changeTheme);

const navMainList = document.querySelectorAll('.nav-main__list a');
const main = document.querySelector('.container');
const navMain = {};
const navMainLang = {};
function createContainer(el) {
    for(let i = 0; i < navMainList.length; i++) {
        navMainList[i].addEventListener('click', async function(e) {
            e.preventDefault();
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
    (el || navMainList[0]).click();
}
createContainer();
const btnsAG = [
    {'en': 'Change language', 'pt-BR': 'Mudar idioma'},
    {'en': 'Change theme', 'pt-BR': 'Mudar tema'}
]
const ariaMainAG = [
    {'en': 'Go to home page', 'pt-BR': 'Ir para a página inicial'},
    {'en': 'Go to projects page', 'pt-BR': 'Ir para a página de projetos'},
    {'en': 'Go to about page', 'pt-BR': 'Ir para a página sobre mim'},
    {'en': 'Go to contact page', 'pt-BR': 'Ir para a página de contato'}
];
function updateAG(att, els) {
    for(let i = 0; i < att.length; i++) {
        els[i]['title'] = els[i]['ariaLabel'] = att[i][html.lang];
    }
}
updateAG(btnsAG, [changeLang, themeMode]);
updateAG(ariaMainAG, navMainList);
createElems({
    copy: ['body', 'p', [['innerHTML', `&copy; ${new Date().getFullYear()} `]]],
    by: ['copy', 'a', [['textContent', 'Jose Marcelo'], ['href', 'https://github.com/jmsmarcelo']]]
}, {body: document.querySelector('.footer')});