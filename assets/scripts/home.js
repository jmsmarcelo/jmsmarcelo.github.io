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
            "title": ["main", "h1", [["textContent", text('main-home-title')]]]
        }
    ][i]
}
async function createContainer(el) {
    if(!texts[html.lang]) {
        texts[html.lang] = await getData('home');
    }
    for(let i = 0; i < navMainList.children.length; i++) {
        navMainList.children[i].addEventListener('click', function() {
            const tabActive = document.querySelector('.nav-main__list .active');
            if(tabActive) {
                tabActive.classList.remove('active');
            }
            this.classList.add('active');
            while(main.lastChild) {
                main.lastChild.remove();
            }
            createElems(mainMaps(i), {main: main});
        });
    }
    (el || navMainList.children[0]).click();
}
createContainer();