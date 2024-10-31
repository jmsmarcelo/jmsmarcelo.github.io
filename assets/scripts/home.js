const themeMode = document.querySelector('.icon.tm');
const changeLang = document.querySelector('.icon.lang');
const navMainEls = document.querySelectorAll('.nav-main__list a');
let navSelected = 0;
const main = document.querySelector('.container');
const navMain = {};
const navMainLang = {};
themeMode.addEventListener('click', function(e) {
    e.preventDefault();
    html.dataset.theme = (html.dataset.theme === 'dark' ? 'light' : 'dark');
});
changeLang.addEventListener('click', function(e) {
    e.preventDefault();
    html.lang = (html.lang === 'en' ? 'pt-BR' : 'en');
    createContainer(navSelected);
    updateAG(btnsAG, [changeLang, themeMode]);
    updateAG(ariaMainAG, navMainEls);
});
schemeMode.addEventListener('change', changeTheme);
async function createContainer(i) {
    if(!navMain[i]) {
        await loadScript(`container-main-${i}`);
    }
    if(!navMainLang[html.lang] || !navMainLang[html.lang][i]) {
        if(!navMainLang[html.lang]) {
            navMainLang[html.lang] = [];
        }
        navMainLang[html.lang][i] = await getData('container-main-' + i); 
    }
    const tabActive = document.querySelector('.nav-main__list .active');
    if(tabActive) {
        tabActive.classList.remove('active');
    }
    navMainEls[i].classList.add('active');
    while(main.lastChild) {
        main.lastChild.remove();
    }
    createElems(navMain[i], {main: main}, navMainLang[html.lang][i]);
}
function setupNavMain() {
    for(let i = 0; i < navMainEls.length; i++) {
        navMainEls[i].addEventListener('click', function(e) {
            e.preventDefault();
            createContainer(i);
            navSelected = i;
        });
    }
    navMainEls[navSelected].click();
}
setupNavMain();
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
updateAG(ariaMainAG, navMainEls);
createElems({
    copy: ['body', 'p', [['innerHTML', `&copy; ${new Date().getFullYear()} `]]],
    by: ['copy', 'a', [['textContent', 'Jose Marcelo'], ['href', 'https://github.com/jmsmarcelo']]]
}, {body: document.querySelector('.footer')});
