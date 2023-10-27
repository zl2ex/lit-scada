import {Router} from '@vaadin/router';
import jwtDecode from 'jwt-decode';

//apollo
import '@apollo-elements/components/apollo-client';

//custom lit componets
import './componets/zl2exHeaderNav.js';
import './componets/zl2exNavItem.js';

//generic lit componets


//pages
import './pages/zl2exPageLogin.js';
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
    {path: '/about', component: 'zl2ex-page-about'},
    {path: '/tag-editor', component: 'zl2ex-page-tag-editor'},
    {path: '/trending', component: 'zl2ex-page-trending'},
    {path: '(.*)', component: 'zl2ex-page-404'}
]);

/*NAV*********************************************************/


const root = {
    user: null,
    props: null
};

function checkUserSession()
{
    let loggedOut = true;
    const token = localStorage.getItem("token");
    
    if(token)
    {
        const decodedToken = jwtDecode(token);

        if(decodedToken.exp * 1000 < Date.now())
        {
            localStorage.removeItem("token");
        }
        else // token has not expired
        {
            root.user = decodedToken;
            console.log("user already logged in" + root.user);
            loggedOut = false;
        }
    }

    if(loggedOut && window.location.href.includes("/login") == false)
    {
        window.location.href = "/login";
    }   
}

checkUserSession();