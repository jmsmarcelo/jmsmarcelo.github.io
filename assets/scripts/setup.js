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
function loadScript(fn) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = `assets/scripts/${fn}.js`;
        s.type = 'text/javascript';
        s.onload = () => resolve(fn);
        s.onerror = () => reject(new Error('error: ' + fn));
        document.head.appendChild(s);
    });
}
async function createElems(m, t, l) {
    for(const k in m) {
        t[k] = document.createElement(m[k][1]);
        if(m[k][2]) {
            for(const v of m[k][2]) {
                if(v.length === 3) {
                    t[k][v[0]][v[1]] = setLang(v[2], l);
                } else if(v.length === 2) {
                    t[k][v[0]] = setLang(v[1], l);
                }
            }
        }
        if(t[m[k][0]]) {
            await t[m[k][0]].appendChild(t[k]);
        }
    }
    return t;
}
function setLang(text, lang) {
    if(typeof text === 'string' && text.match(/^lang__.+/)) {
        return lang[text.split('__')[1]] || '';
    }
    return text;
}
function getData(fn) {
    return fetch(`assets/lang/${fn}_${html.lang}.json` , {method: 'GET'})
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