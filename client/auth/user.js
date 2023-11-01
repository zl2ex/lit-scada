import jwtDecode from 'jwt-decode';

// global session varible
export var session = {
    user: null,
    props: null
};

export function checkUserSession()
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
            session.user = decodedToken;
            console.log(session.user);
            loggedOut = false;
        }
    }

    if(loggedOut && window.location.href.includes("/login") == false)
    {
        window.location.href = "/login";
    }   
}