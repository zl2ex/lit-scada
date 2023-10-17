



class NavLink extends HTMLElement
{
    constructor() 
    {
        super();

        const template = document.createElement("template");

        template.innerHTML = `

        <link rel="stylesheet" type="text/css" href="nav-link.css">
        <p><slot name="text">nav-link</slot><p>

        `

        this.attachShadow({mode: "open"});
        this.shadowRoot.append(template.content.cloneNode(true));

    }

    selected()
    {
        this.classList.add("selected");
    }

    connectedCallback()
    {
        console.log("connected");
        this.addEventListener("pointerdown", this.selected);
    }

    disconnectedCallback()
    {
        console.log("disconnected");
        this.removeEventListener("pointerdown");
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        console.log("attr changed" + name + oldValue + newValue);
    }
}

customElements.define("nav-link", NavLink);