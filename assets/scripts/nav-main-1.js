navMain[1] = {
    repoTab: ['main', 'section', [['classList', 'repo-tab']]],
    repoTitle: ['repoTab', 'h2', [['textContent', 'lang__title']]],
    repos: ['repoTab', 'ol', [['classList', 'repos']]],
    repoBtn: ['repoTab', 'button', [['textContent', 'lang__btn-name'], ['classList', 'repo-btn'], ['onclick', loadRepo]]]
};
let repoPage = 1;
function loadRepo() {
    const elems = {};
    fetch(`https://api.github.com/users/jmsmarcelo/repos?per_page=5&page=${repoPage}&sort=created&direction=desc`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(json => {
            if(json.length === 0) {
                delete navMain[1].repoBtn;
                return document.querySelector('.repo-btn').remove();
            }
            json.forEach(repo => {
                elems[repo.name + '_li'] = ['repos', 'li', [['classList', 'repo']]],
                elems[repo.name + '_link'] = [repo.name + '_li', 'a', [['classList', 'repo-link'], ['href', repo.svn_url]]],
                elems[repo.name + '_title'] = [repo.name + '_link', 'h3', [['textContent', repo.name]]],
                elems[repo.name + '_description'] = [repo.name + '_link', 'p', [['innerHTML', repo.description || '&nbsp;']]]
                elems[repo.name + '_language'] = [repo.name + '_link', 'p', [['innerHTML', repo.language || '&nbsp;']]]
            });
            createElems(elems, {repos: document.querySelector('.repos')}, navMainLang[html.lang][1]);
            Object.assign(navMain[1], elems);
            repoPage++;
        });
}
loadRepo();