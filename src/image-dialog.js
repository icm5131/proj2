import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class imageDialog extends DDD {

    static get tag() {
        return 'image-dialog';
    }

    constructor() {
        super();
        this.opened = true;
        this.title = "img-gallery";
        this.image = [];
        this.imageNumber = 1; //current number shown
        this.totalImageNumber = 5;
    }

    static get styles() {
        return [
            super.styles,
            css`

                /* :host {
                    display: none;
                } */

                :host([opened]) {
                    display:flex;
                    z-index: 10000;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }

                .wrap {
                    margin: var(--ddd-spacing-3);
                    width: 95vw;
                    height: 95vh;
                    border: var(--ddd-border-lg);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    text-align: center;
                }

                .info {
                    width: 100%;
                    display: inline-flex;
                    flex-wrap: wrap;
                    margin: var(--ddd-spacing-4);
                }

                .img-count {
                    width: 10%;
                }

                .img-description {
                    width: 80%;
                }

                .img-area {
                    display: inline-flex;
                    flex-wrap: wrap;
                    width: 100%;
                    margin: auto;
                }

                .img-selection {
                    width: 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .img-container {
                    width: 80%;
                    height: 500px;
                    overflow: hidden;
                }

                .img {
                    margin: auto;
                    width: 70%;
                }
            `
        ];
    }

    closeBtn() {
        this.opened = false;
    }

    firstUpdated() {
        var data = document.querySelectorAll('media-image');
        data.forEach(image => {
            this.image.push(image.getAttribute('imgSrc'));
        })

        console.log(this.image);

        window.addEventListener('image-clicked', (e) => {
            var url = e.target.attributes.imgSrc.nodeValue;
            this.imageNumber = this.image.indexOf(url) + 1;
            this.visable = true;
        })
        if (this.imageNumber < this.totalImageNumber)
            this.imageNumber = this.imageNumber + 1;
        else {
            this.imageNumber = 1;
        }
        this.requestUpdate();
    }

    leftClick() {
        if (this.imageNumber > 1) {
            this.imageNumber = this.imageNumber - 1;
        }
        else {
            this.imageNumber = this.totalImageNumber;
        }
        this.requestUpdate();
    }
    

    render() {
        return  /* (!this.opened) ? '' :  */ html`
            <div class="wrap">
                <div class="info">
                    <div class="img-count">
                        ${this.imageNumber}/${this.totalImageNumber}
                    </div>
                    <div class="img-description">
                        as;dflakjs;flkj
                    </div>
                    <div class="close">
                        <button class="exit" @click="${this.closeBtn}">X</button>
                    </div>
                </div>    
                <div class="img-area">
                    <div class="img-selection">
                        <button class="left"><-</button>
                    </div>
                    <div class="img-container">
                        <img class="img" src="${this.image(this.imageNumber-1)}">
                    </div>
                    <div class="img-selection">
                        <button class="right">-></button>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            ...super.properties,
            opened: { type: Boolean },
            title: { type: String },
            image: { type: Array },
            imageNumber: { type: Number },
            totalImageNumber: { type: Number }
        };
    }
}

globalThis.customElements.define(imageDialog.tag, imageDialog);
