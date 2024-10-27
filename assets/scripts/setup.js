const schemeMode = window.matchMedia('(prefers-color-scheme: dark)');
const html = document.documentElement;
function changeTheme() {
    html.dataset.theme = (schemeMode.matches ? 'dark' : 'light');
}
changeTheme();
{
    const lang = navigator.language || navigator.userLanguage;
    html.lang = (lang.search('pt') > -1 ? 'pt-BR' : 'en');
}
function createElems(m, t) {
    for(const k in m) {
        t[k] = document.createElement(m[k][1]);
        if(m[k][2]) {
            for(const v of m[k][2]) {
                if(v.length === 3) {
                    t[k][v[0]][v[1]] = v[2];
                } else if(v.length === 2) {
                    t[k][v[0]] = v[1];
                }
            }
        }
        if(t[m[k][0]]) {
            t[m[k][0]].appendChild(t[k]);
        }
    }
}
function getData(fileName) {
    return fetch(`assets/lang/${fileName}_${html.lang.toLowerCase()}.json` , {method: 'GET'})
        .then(r => {
            if(!r.ok) {
                throw new Error(r.status);
            }
            return r.json();
        }).catch(e => {
            throw new Error(e.message || 'error');
        })
}
const texts = {}
function text(t) {
    return texts[html.lang][t] || '';
};