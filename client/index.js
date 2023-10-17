import {Router} from '@vaadin/router';

//custom lit componets
import './componets/zl2exHeaderNav.js';
import './componets/zl2exNavItem.js';

//generic lit componets


//pages
import './pages/zl2exPageHome.js';
import './pages/zl2exPage404.js';


async function loadPages()
{
    await import('./pages/zl2exPageAbout.js');
    await import('./pages/zl2exPageTagEditor.js');
}

loadPages();

export const router = new Router(document.querySelector("#outlet"));
router.setRoutes([
    {path: '/', component: 'zl2ex-page-home'},
    {path: '/about', component: 'zl2ex-page-about'},
    {path: '/tag-editor', component: 'zl2ex-page-tag-editor'},
    {path: '(.*)', component: 'zl2ex-page-404'}
]);






/*NAV*********************************************************/