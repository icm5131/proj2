import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class mediaImage extends DDD {

    static get tag() {
        return 'media-image';
    }

    constructor() {
        super();
        this.imgSrc = "";
        this.caption = "Short image description";
        this.description = "Full description of image";
        this.primary = "false";
    }

    handleClick() {
        console.log("Image Clicked");

        const evt = new CustomEvent("image-clicked", {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                opened: true,
            },
        });
        this.dispatchEvent(evt);
    }

    static get styles() {
        return [ 
            super.styles,
            css`
                :host {
                    display: inline-flex;
                    flex-wrap: wrap;
                    --img-bord-color: var(--ddd-theme-default-creekLight);
                    --box-shadow: -16px 16px var(--ddd-theme-default-potentialMidnight);
                }

                :host([primary="true"]) {
                    --img-bord-color: var(--ddd-theme-default-creekTeal);
                }

                .img-color-bord {
                    background-color: var(--img-bord-color);
                    text-align: center;
                    width: 20vw;
                    padding: var(--ddd-spacing-4);
                    /* border */
                    border: var(--ddd-border-lg);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    border-radius: var(--ddd-radius-md);
                }

                .image {
                    border: var(--ddd-border-lg);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    border-radius: var(--ddd-radius-md);
                    width: 95%;
                }

                .img-color-bord:hover,
                .img-color-bord:focus {
                    box-shadow: var(--box-shadow);
                    -webkit-transform: translate(var(--ddd-spacing-4));
                    transform: translate(16px, -16px);
                    transition: all .3s ease-in;
                }

                .caption {
                    font-size: var(--ddd-font-size-4xs);
                    background-color: var(--ddd-theme-default-shrineLight);
                    border: var(--ddd-border-sm);
                    border-radius: var(--ddd-radius-md);
                }
            `
        ];
    }

    render() {
        return html`
            <div class="wrapper">
                <div class="img-color-bord" @click="${this.handleClick}">
                    <img class="image" src="${this.imgSrc}" alt="${this.caption}">
                </div>
                <div class="caption">
                    ${this.caption}
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            ...super.properties,
            imgSrc: { type: String, reflect: true },
            caption: { type: String, reflect: true },
            description: { type: String, reflect: true },
            primary: { type: String, reflect: true }
        };
    }
}

globalThis.customElements.define(mediaImage.tag, mediaImage);
