import {html, css, LitElement} from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { gql } from "graphql-tag";


const tagQuery = gql`   
    query GetTag($id: String!) {
        getTag(_id: $id) {
            data
        }
    }
`;


export class zl2exDigitalIn extends LitElement
{
    static properties = 
    {
        tagName: String,
        text: String,
        query: Object
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
    }

    svg
    {
        --zl2ex-digital-in-color-off: var(--zl2ex-color-state-off, #666);
        --zl2ex-digital-in-color-on: var(--zl2ex-color-state-on, green);
        --zl2ex-digital-in-color-fault: var(--zl2ex-color-state-fault, red);
        --zl2ex-digital-in-color-stroke: var(--zl2ex-color-stroke, #000);


        fill: var(--zl2ex-digital-in-color-off);
        stroke: var(--zl2ex-digital-in-color-stroke);

       /* 
       width: var(--zl2ex-digital-in-width, 30px);
        height: var(--zl2ex-digital-in-height, 30px);
        
        stroke-width: var(--zl2ex-digital-in-stroke-width, 7px);
        */
    }

    .text
    {
        font: bold 100px sans-serif;

        fill: var(--zl2ex-digital-in-color-stroke);
    }
    `;

    constructor()
    {
        super();
        this.query = new ApolloQueryController(this, tagQuery);
        this.errorMessage = "";
    }

    async queryTagData()
    {
        try
        {
            await this.query.executeQuery({ variables: { id: this.tagName }});
        }
        catch(e)
        {
            this.errorMessage = e;
        }

        if(this.query.data)
        {
            this.setFillColor();
        }
        console.log("poll");
        // poll for data every second
        setTimeout(() => { this.queryTagData() }, 1000);
    }

    firstUpdated()
    {
        this.queryTagData();
    }

    updated()
    {
        this.svg = this.shadowRoot.querySelector("svg");
    }

    setFillColor()
    {
        if(!this.svg) return; // hasnt been rendered yet
        let color = "var(--zl2ex-digital-in-color-off)";

        //put higher priority colors at the bottom as they will be overidden

        if(this.query.data.getTag.data.value) color = "var(--zl2ex-digital-in-color-on)";
        if(this.query.data.getTag.data.fault) color = "var(--zl2ex-digital-in-color-fault)";

        this.svg.style.fill = color;
    }

    render()
    {
        return html`
        <p>${this.tagName}</p>
        <svg viewBox="0 0 300 300" width="30px" height="30px">
            <circle cx="50%" cy="50%" r="40%"></circle>
            <text x="50%" y="50%" class="text">test</text>
        </svg>
        `;
    }
}

customElements.define("zl2ex-digital-in", zl2exDigitalIn);
