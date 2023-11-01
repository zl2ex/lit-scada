import {html, css, LitElement} from 'lit';

import '@dile/dile-nav/dile-nav.js';
import '@dile/dile-menu-hamburger/dile-menu-hamburger.js';

export class zl2exHeaderNav extends LitElement
{
    static properties = 
    {
        pageName: {type: Boolean},
        navOpen: {type: Boolean}
    };

    static styles = css`

    *
    {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
/* TD WIP 
    *:focus
    {
        outline: 1px solid var(--var-color-primary-700);
    }
    */
    dile-menu-hamburger
    {
        --dile-hamburger-color: var(--var-color-neutral-900);
        --dile-hamburger-active-color: var(--var-color-neutral-900);
        --dile-hamburger-width: 32px;
        --dile-hamburger-height: 32px;
        --dile-hamburger-padding-y: 15px;
        --dile-hamburger-padding-x: 15px;
    }

    dile-nav
    {
        --dile-nav-background-color: var(--var-color-neutral-300);
        --dile-nav-color: inherit;
        --dile-nav-padding-y: 1rem;
        --dile-nav-padding-x: 1rem;
        --dile-nav-column-gap: 1rem;
        --dile-nav-align-items: center;

        --dile-app-drawer-background-color: var(--var-color-neutral-300);
        
        & h2
        {
            text-align: center;
        }
    }

    .menu
    {
        display: flex;
        flex-direction: column;
        flex: 0;
        overflow: hidden;
        margin-top: calc(var(--dile-hamburger-height) + (2 * var(--dile-hamburger-padding-y)));

        background-color: inherit;
    }

    `;

    constructor()
    {
        super();
        this.navOpen = false;
        this.pageName = "pageName";
    }

    async firstUpdated()
    {
        
    }

    render()
    {
        return html`
            <dile-nav menu="left">
                <h2 slot="title">${this.pageName}</h2>
                <div slot="menu">
                    <dile-menu-hamburger direction="left" hamburgeralwaysvisible>
                        <slot name="nav" slot="menu" class="menu"></slot>
                    </dile-menu-hamburger>
                </div>
                <span slot="actions">
                    User 
                </span>
                <svg class="settings" viewBox="0 0 60 40">
                <g stroke-width="4">
                    <circle cx="20%" cy="50%" r="4px"></circle>
                    <circle cx="50%" cy="50%" r="4px"></circle>
                    <circle cx="80%" cy="50%" r="4px"></circle>
                </g>
                </svg>
            </dile-nav>
        `;
    }
}

customElements.define("zl2ex-header-nav", zl2exHeaderNav);
