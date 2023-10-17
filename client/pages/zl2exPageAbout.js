import {html, css, LitElement} from 'lit';
import { router } from '../index.js';

export class zl2exPageAbout extends LitElement
{

    static properties = 
    {
        location: {type: Object},
        prop: {},
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
        flex: 1;
    }

    .container
    {
        display: flex;
        flex-direction: row;
        flex: 1 0 0;
        background-color: red;
    }
   
   
    `;

    constructor()
    {
        super();
        this.location = router.location;
    }


    render()
    {
        return html`
            ABOUT
        `;
    }
}

customElements.define("zl2ex-page-about", zl2exPageAbout);
