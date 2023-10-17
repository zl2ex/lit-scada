import {html, css, LitElement} from 'lit';

import '../componets/zl2exDigitalIn.js';

export class zl2exPageHome extends LitElement
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
    }

    firstUpdated()
    {
        
    }


    render()
    {
        return html`
            <div class="container">
                <h1>HOME</h1>

                <div class="hmi zl2ex">
                    <zl2ex-digital-in 
                        ?value=${this.tags.aprt01.value}
                        ?fault=${this.tags.aprt01.fault}
                        text="DI">
                        <p slot="label">name</p>
                    </zl2ex-digital-in>
                </div>

            </div>
        `;
    }
}

customElements.define("zl2ex-page-home", zl2exPageHome);
