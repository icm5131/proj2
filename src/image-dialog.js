import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class imageDialog extends DDD {

    static get tag() {
        return 'image-dialog';
    }

    constructor() {
        super();
        this.opened = false;
    }

    static get styles() {
        return [ 
            super.styles,
            css`

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

    render() {
        /* !this.opened ? "" : */ return html`
            <div class="wrap">
                <div class="info">
                    <div class="img-count">
                        2/2
                    </div>
                    <div class="img-description">
                        as;dflakjs;flkj
                    </div>
                    <div class="close">
                        X
                    </div>
                </div>    
                <div class="img-area">
                    <div class="img-selection">
                        <-
                    </div>
                    <div class="img-container">
                        <img class="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWH39-n22ql-S0elN3GFE2iHy4_x9mmUzhCACZFq9kg&s">
                        <img class="img" src="https://i.redd.it/op96es9026wy.png">
                    </div>
                    <div class="img-selection">
                        ->
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            ...super.properties,
            opened: { type: Boolean }
        };
    }
}

globalThis.customElements.define(imageDialog.tag, imageDialog);
