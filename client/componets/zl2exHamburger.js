import {html, css, LitElement} from 'lit';


export class zl2exHamburger extends LitElement
{

    static properties = 
    {
        active: {},
    };

    static styles = css`
    .hamburger
    {
        width: 60px;
        padding: 10px;
        stroke: var(--var-color-neutral-900);
        z-index: 10;

        & .top, .middle, .bottom
        {
            transition: 0.1s;
        }
    }
    
    .active
    {
        & .top
        {
            transform-origin: top left;
            transform: translate(25%, -5%) rotate(45deg) scaleX(0.85);
        }

        & .middle
        {
            opacity: 0;
        }

        & .bottom
        {
            transform-origin: bottom left;
            transform: translate(25%, 5%) rotate(-45deg) scaleX(0.85);
        }
    }`;

    constructor()
    {
        super();
        this.active = false;
    }

    toggleHamburger()
    {
        this.active = !this.active;

        if(this.active)
        {
            this.shadowRoot.firstElementChild.classList.add("active");
        }
        else 
        {
            this.shadowRoot.firstElementChild.classList.remove("active");
        }
    }

    render() 
    {
        return html`
        <svg @pointerdown="${this.toggleHamburger}" ${this.active} class="hamburger" viewbox="0 0 60 40">
          <g stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <line class="top" x1="15%" y1="15%" x2="85%" y2="15%"></line>
              <line class="middle" x1="15%" y1="50%" x2="85%" y2="50%"></line>
              <line class="bottom" x1="15%" y1="85%" x2="85%" y2="85%"></line>
          </g>
        </svg>`;
    }


}

customElements.define("zl2ex-hamburger", zl2exHamburger);
