import {Router} from '@vaadin/router';

import {checkUserSession} from './auth/user.js';

//redirect to login page if no user JWT is avalible or valid
checkUserSession();

//apollo
import '@apollo-elements/components/apollo-client';

//custom lit componets
import './componets/zl2exHeaderNav.js';
import './componets/zl2exNavItem.js';

//generic lit componets


//pages
import './pages/zl2exPageLogin.js';
import './pages/zl2exPageRegister.js';
import './pages/zl2exPageHome.js';
import './pages/zl2exPage404.js';

// load pages that arent required to render /
async function loadPages()
{
    await import('./pages/zl2exPageAbout.js');
    await import('./pages/zl2exPageTagEditor.js');
    await import('./pages/zl2exPageTrending.js');
}

loadPages();

export const router = new Router(document.querySelector("#outlet"));
router.setRoutes([
    {path: '/', component: 'zl2ex-page-home'},
    {path: '/login', component: 'zl2ex-page-login'},
    {path: '/register', component: 'zl2ex-page-register'},
    {path: '/about', component: 'zl2ex-page-about'},
    {path: '/tag-editor', component: 'zl2ex-page-tag-editor'},
    {path: '/trending', component: 'zl2ex-page-trending'},
    {path: '(.*)', component: 'zl2ex-page-404'}
]);

/*NAV*********************************************************/