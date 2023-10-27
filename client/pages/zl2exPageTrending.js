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
        background-color: red;
    }

    .hmi
    {
        position: ablsolute;
        display: flex;
        flex: 1 0 0;
        background-color: blue;
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

        this.chartData = {

        };

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
                <google-chart data='[["Month", "Days"], ["Jan", 31]]'></google-chart>
                <base-chart id="chart" type="chartType" .data="${this.chartData}" .options="${this.chartOptions}"></base-chart>

            </div>
        `;
    }
}

customElements.define("zl2ex-page-trending", zl2exPageTrending);
