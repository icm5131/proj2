import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class mediaImage extends DDD {

    static get tag() {
        return 'media-image';
    }

    constructor() {
        super();
        this.imgSrc = "https://i.pinimg.com/564x/b6/c0/2a/b6c02a4ad5b3538c4efb6aa194b432a8.jpg";
    }

    static get styles() {
        return [ 
            super.styles,
            css`
                :host {
                    display: inline-flex;
                    flex-wrap: wrap;
                    --img-bord-color-primary: var(--ddd-theme-default-wonderPurple);
                }

                .img-color-bord {
                    background-color: var(--img-bord-color-primary);
                    text-align: center;
                    width: 30vw;
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
                }
            `
        ];
    }

    render() {
        return html`
        <div class="img-color-bord">
            <img class="image" src="${this.imgSrc}" alt="HTML and CSS meme">
        </div>
        `;
    }

    static get properties() {
        return {
            ...super.properties
        };
    }
}

globalThis.customElements.define(mediaImage.tag, mediaImage);
