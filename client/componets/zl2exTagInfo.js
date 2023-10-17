import {html, css, LitElement} from 'lit';

import { zl2exTag } from './zl2exTag.js';

export class zl2exTagInfo extends LitElement
{
    static properties = 
    {
        tag: {type: Object}
    };

    static styles = css`

    *
    {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :host
    {
        display: flex;
        flex-direction: row;
        flex: 1 0 0;
        justify-content: start;
        align-items: start;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    input
    {
        color: var(--var-text-color);
        background-color: inherit;
        padding: 0.5rem 1rem;
        border: none;
    }

    input:hover,
    input:active,
    input:focus
    {
        outline: none;
        background-color: var(--var-color-neutral-300);
    }

    input:focus
    {
        outline: 2px solid var(--var-color-secondary-300);
        outline-radius: 1   rem;
    }
    `;

    constructor()
    {
        super();
        this.tag = new zl2exTag();
    }

    async firstUpdated()
    {
    
    }

    render()
    {
        
        return html`
            <input type="text" value=${this.tag.name}/>
            <input type="number" value=${this.tag.value}/>
            <input type="text" value=${this.tag.opcPath}/>
        `;
    }
}

customElements.define("zl2ex-tag-info", zl2exTagInfo);
