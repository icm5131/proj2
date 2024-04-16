import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class playList extends DDD {

    static get tag() {
        return 'play-list';
    }

    constructor() {
        super();
    }

    static get styles() {
        return [ 
            super.styles,
            css`

                .wrap {
                    margin: var(--ddd-spacing-3);
                    width: 80%;
                    border: var(--ddd-border-lg);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                    text-align: center;
                }

                .info {
                    width: 100%;
                    display: inline-flex;
                    flex-wrap: wrap;
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
                }

                .img {
                    width: 20vw;
                }
            `
        ];
    }

    render() {
        return html`
            <div class="wrap">
                <div class="info">
                    <div class="img-count">
                        2/2
                    </div>
                    <div class="img-description">
                        as;dflakjs;flkj
                    </div>
                </div>    
                <div class="img-area">
                    <div class="img-selection">
                        <-
                    </div>
                    <div class="img-container">
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
            ...super.properties
        };
    }
}

globalThis.customElements.define(playList.tag, playList);
