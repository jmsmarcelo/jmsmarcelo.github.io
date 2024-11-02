containerMain[1] = {
    repoTab: ['main', 'section', [['classList', 'repo-tab']]],
    repoTitle: ['repoTab', 'h2', [['textContent', 'lang__title']]],
    repos: ['repoTab', 'ol', [['classList', 'repos']]],
    repoBtn: ['repoTab', 'button', [['textContent', 'lang__btn_name'], ['classList', 'repo-btn'], ['onclick', loadRepo]]]
};
let repoPage = 1;
const repoPerPage = 5;
function loadRepo() {
    const elems = {};
    loadData(`https://api.github.com/users/jmsmarcelo/repos?per_page=${repoPerPage}&page=${repoPage}&sort=created&direction=desc`)
        .then(json => {
            if(json.length < repoPerPage) {
                delete containerMain[1].repoBtn;
                document.querySelector('.repo-btn').remove();
                if(json.length === 0) return;
            }
            json.forEach(repo => {
                elems[repo.name + '_li'] = ['repos', 'li', [['classList', 'repo']]];
                elems[repo.name + '_link'] = [repo.name + '_li', 'a', [['classList', 'repo-link'], ['href', repo.svn_url]]];
                elems[repo.name + '_title'] = [repo.name + '_link', 'h3', [['textContent', repo.name], ['classList', 'repo-title']]];
                elems[repo.name + '_desc'] = [repo.name + '_link', 'p', [['innerHTML', repo.description || '&nbsp;'], ['classList', 'repo-desc']]];
                elems[repo.name + '_info'] = [repo.name + '_link', 'div', [['classList', 'repo-info']]];
                elems[repo.name + '_lang'] = [repo.name + '_info', 'span', [['innerHTML', repo.language || '&nbsp;'], ['classList', `repo-lang ${repo.language.toLowerCase()}`]]];
                if(repo.stargazers_count > 0) {
                    elems[repo.name + '_star'] = [repo.name + '_info', 'span', [['innerHTML', repo.stargazers_count || '&nbsp;'], ['classList', 'repo-icons star']]];
                }
            });
            createElems(elems, {repos: document.querySelector('.repos')}, containerMainLang[html.lang][1]);
            Object.assign(containerMain[1], elems);
            repoPage++;
        }).catch(() => {
            createElems(
                {status: ['main', 'p', [['textContent', 'lang__repo_erro']]],},
                {main: document.querySelector('.repos')},
                containerMainLang[html.lang][1]
            );
            document.querySelector('.repo-btn').remove();
        });
}
loadRepo();