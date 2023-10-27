import {html, css, LitElement} from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { gql } from "graphql-tag";


const loginQuery = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;


export class zl2exPageLogin extends LitElement
{
    

    static properties = 
    {
        query: Object,
        errorMessage: String
    };

    static styles = css`
    *
    {
        box-sizing: border-box;
    }

    :host
    {
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .container
    {
        width: clamp(200px, 30%, 250px);
        display: flex;
        flex-direction: column;
        flex: 0;
    }

    p
    {
        color: var(--zl2ex-color-state-error);
    }

    .actions
    {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin-top: 15px;
        align-items: center;
        justify-content: space-between;
    }

    *:focus
    {
        outline: 1px solid var(--var-color-primary-700);
    }

    button,
    a
    {
        text-decoration: none;
        color: inherit;
        background-color: inherit;
        border: 2px solid var(--var-color-neutral-100);
        border-radius: 0.3rem;
        padding: 0.1rem 0.4rem;
        font: inherit;
        cursor: pointer;

        &:hover
        {
            filter: brightness(var(--zl2ex-hover-brightness));
        }

        &:active
        {
            filter: brightness(var(--zl2ex-active-brightness));
        }
    }

    .btn-primary
    {
        background-color: var(--var-color-primary-400);
    }

    .btn-secondary
    {
        background-color: var(--var-color-secondary-400);
    }

    `;

    

    constructor()
    {
        super();
        this.query = new ApolloQueryController(this, loginQuery);
        this.errorMessage = "";
    }

    firstUpdated()
    {
        
    }

    updated()
    {
        this.domEmail = this.shadowRoot.querySelector("#email");
        this.domPassword = this.shadowRoot.querySelector("#password");
    }

    async login()
    {
        try
        {
            await this.query.executeQuery({ variables: {
                email: this.domEmail.value,
                password: this.domPassword.value
            }});
        }
        catch(e)
        {
            console.log(e);
            this.errorMessage = "Login failed";
            localStorage.removeItem("token"); // just in case
            return;
        }

        console.log(this.query.data.login.token);

        if(this.query.data) 
        {
            localStorage.setItem("token", this.query.data.login.token);
            window.location.href = "/"; // WIP redirect to requested url
        }
    }

    keyPress(event)
    {
        if(event.keyCode === 13) // enter
        {
            this.login();
        }
    }


    render()
    {
        return html`
            <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label><input id="email" type="email" @keypress=${this.keyPress}/>
                    <label for="password">Password</label><input id="password" type="password" @keypress=${this.keyPress}/>
                    <div class="actions">
                        <button id="login" type="button" class="btn-primary" @click=${this.login}>Login</button>
                        <a class="btn-secondary" href="/register">Register</a></button>
                    </div>
                    <p>${this.errorMessage}</p>
            </div>
        `;
    }
}

customElements.define("zl2ex-page-login", zl2exPageLogin);
