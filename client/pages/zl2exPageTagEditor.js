import {html, css, LitElement} from 'lit';
import { router } from '../index.js';

import '../componets/zl2exTag.js';
import '@doubletrade/lit-datatable/lit-datatable.js';
import '@doubletrade/lit-datatable/lit-datatable-column.js';
//import '@doubletrade/lit-datatable/lit-datatable-footer.js';

//import '@dile/dile-spinner/dile-spinner.js';
import '@dile/dile-input/dile-input';

export class zl2exPageTagEditor extends LitElement
{

    static properties = 
    {
        location: {type: Object},
        pageName: {type: String},
        tags: {type: Array}
    };

    static styles = css`
    *
    {
        box-sizing: border-box;
    }

    :host
    {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 1rem;
    }

    lit-datatable
    {
       

        --lit-datatable-th-background: var(--var-color-neutral-400);
        --lit-datatable-api-tr-odd-background-color: var(--var-color-neutral-300);
        --lit-datatable-th-color: var(--var-text-color);
        --lit-datatable-td-color: var(--var-text-color);
        --lit-datatable-api-body-td-height: 1rem;
        --lit-datatable-api-header-font-size: 1.2rem;
        --lit-datatable-td-font-size: 1rem;

        --lit-datatable-api-td-padding: 0;
        --lit-datatable-api-horizontal-padding: 0;
    }

    *
    {
        --dile-input-width: 100%;
        --dile-input-border-width: 1px;
        --dile-input-border-color: #888;
        --dile-input-border-radius: 0;
        --dile-input-error-border-color: #c00;
        --dile-input-focus-border-color: #6af;
        --dile-input-disabled-border-color: #eee;
        --dile-input-font-size: 1em;
        --dile-input-line-height: 1.5em;
        --dile-input-label-font-size: 1em;
        --dile-input-label-color: #59e;
        --dile-input-label-font-weight: normal;
        --dile-input-label-margin-bottom: 4px;
        --dile-input-background-color: transparent;
        --dile-input-padding: 5px;
        --dile-input-color: var(--var-text-color);
        --dile-input-placeholder-color: #ccc;
        --dile-input-text-align: left;
        --dile-input-message-padding-top: 4px;
        --dile-input-message-font-size: 0.875rem;
        --dile-input-message-color: #888;
        --dile-input-message-error-color: #c00;
        --dile-input-label-right-margin-left: 10px;
        --dile-input-label-right-font-size: 1.2em;

    }



   
    `;

    constructor()
    {
        super();
        this.location = router.location;
        this.loaded = false;
        this.tableConfig = [
            { property: 'name', header: 'Name', hidden: false },
            { property: 'type', header: 'type', hidden: false },
            { property: 'value', header: 'value', hidden: false },
            { property: 'opcPath', header: 'opcPath', hidden: false }
        ];
        this.getTagData();
        this.poll();
    }

    async getTagData()
    {
        const response = await fetch('http://localhost:8000/tags.json', 
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })

        this.tags = await response.json();
        console.log(this.tags);
        this.loaded = true;
    }

    _handleSizeChanged()
    {

    }

    _handlePageChanged()
    {

    }

    td(value, property) 
    { 
        return html`
            <dile-input
                pattern="[0-9]*" 
                inputmode="numeric"
                value="${value}"
            ></dile-input>
            `;
    }

    async poll()
    {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.getTagData();
        this.poll();
    }

    render()
    {
        if(this.loaded == false) 
        {
            return html`
            <dile-spinner active></dile-spinner>
        `;
        }
        else
        {
            return html`
                <h1>Tag Editor</h1>
                <lit-datatable sticky-header .data="${this.tags}" .conf="${this.tableConfig}">
                    <lit-datatable-column column="${true}" property="name" .html="${this.td}"></lit-datatable-column>
                    <lit-datatable-column column="${true}" property="type" .html="${this.td}"></lit-datatable-column>
                    <lit-datatable-column column="${true}" property="value" .html="${this.td}"></lit-datatable-column>
                    <lit-datatable-column column="${true}" property="opcPath" .html="${this.td}"></lit-datatable-column>
                    <lit-datatable-footer
                        @size-changed="${this._handleSizeChanged}"
                        @page-changed="${this._handlePageChanged}"
                        .availableSize="${[5, 10, 25]}"
                        .totalPages="10"
                        .totalElements="24"
                        .size="25"
                        .page="0"
                        .language="en">
                    </lit-datatable-footer>
                </lit-datatable>
            `;
        }
    }
}

customElements.define("zl2ex-page-tag-editor", zl2exPageTagEditor);
