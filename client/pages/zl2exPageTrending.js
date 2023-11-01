import {html, css, LitElement} from 'lit';

import '@google-web-components/google-chart';

export class zl2exPageTrending extends LitElement
{

    static properties = 
    {
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
        flex-direction: column;
        flex: 1 0 0;
    }
    `;

    constructor()
    {
        super();
        this.tags = {
            aprt01: {
                type: "bool",
                value: true,
                fault: false,
                opcPath: "OPC[dev].h1"
            },
        
            aprt02: {
                type: "float",
                value: 12,
                opcPath: "OPC[dev].h1"
            }
        };

        this.chartData = `[["tag", "aprt01"], ["aprt01", 31]]`
        ;

        this.chartOptions = {
            
        };
    }

    firstUpdated()
    {
        
    }


    render()
    {
        return html`
            <div class="container">
                <h1>Trending</h1>
                <google-chart data=${this.chartData}></google-chart>

            </div>
        `;
    }
}

customElements.define("zl2ex-page-trending", zl2exPageTrending);
