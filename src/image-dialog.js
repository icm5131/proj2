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
                    display: inline-flex;
                    flex-wrap: wrap;
                    width: 80%;
                    border: var(--ddd-border-lg);
                    border-color: var(--ddd-theme-default-potentialMidnight);
                }

                .info {
                    width: 100%;
                    text-align: center;
                }

                .img-count {
                    width: 20%;
                }

                .img-description {
                    width: 80%;
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
                    <div class="left">
                        <-
                    </div>
                    <img src="https://i.redd.it/op96es9026wy.png">
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
