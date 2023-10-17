import {html, css, LitElement} from 'lit';

export class zl2exPage404 extends LitElement
{

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
    }


    render()
    {
        return html`
            <h1>404</h1>
            <h3>not found</h3>
        `;
    }
}

customElements.define("zl2ex-page-404", zl2exPage404);
