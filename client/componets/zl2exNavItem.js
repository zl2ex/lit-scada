import {html, css, LitElement} from 'lit';

export class zl2exNavItem extends LitElement
{
    static properties = 
    {
        href: {type: String}
    };

    static styles = css`

    *
    {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a
    {
        display: flex;
        flex: 0;
        text-decoration: none;
        color: var(--var-text-color);
        background-color: inherit;
        font-size: 1rem;
        padding: 0.5rem;
        cursor: pointer;
    }

    a:hover, a:focus, a:active
    {
        background-color: var(--var-color-neutral-200);
        outline: none;
    }

    .selected
    {
        border-right: 4px solid var(--var-color-secondary-500);
        background-color: var(--var-color-neutral-200);
    }
    `;

    constructor()
    {
        super();
        this.selected = false;
    }

    firstUpdated()
    {
        if(window.location.pathname === this.href) this.selected = true;
        else this.selected = false;

        this.link = this.shadowRoot.querySelector("a");
        this.link.classList.toggle("selected", this.selected);
    }

    render()
    {
        
        return html`
            <a href=${this.href}>
                <slot></slot>
            </a>
        `;
    }
}

customElements.define("zl2ex-nav-item", zl2exNavItem);
