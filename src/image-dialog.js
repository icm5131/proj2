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
        return css`
    
          :host {
            display: none;
          }
          :host([visible]) {
            display: flex;
            z-index: 10000;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
    
    
          #image {
            margin: 20px;
            padding: 20px;
            max-width:300px;
            max-height:300px;
            position: absolute;
            left: 12%;
            right: 12%;
            top: 15%;
          }
    
          .backdrop
          {
            margin: auto;
            padding: 8px;
            width:500px;
            height:500px;
            background-color: var(--ddd-theme-default-slateLight);
            color: black;
            position: relative;
            border: var(--ddd-border-lg);
            border-color: var(--ddd-theme-default-potentialMidnight);
            border-radius: var(--ddd-radius-md);
          }
    
            .topRow
              {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
              }
    
            .currentNum
            {
              margin: 8px;
              display: flex;
              justify-content: left;
            }
    
            .closePopupButton
            {
            margin: 8px;
            display: flex;
            justify-content: right
            }
    
            .description
            {
                align-self: center;
                display: flex;
                justify-content: center;
            }
    
            .slide-image {
              width: 100%;
              min-height: 200px;
              height: auto;
              max-height: 400px;
              padding: 10px;
              margin: 0 auto;
            }     
    
            .imageLoop
            {
                margin: 8px;
                display: flex;
                justify-content: space-between;  
                position: absolute;
               bottom: 0;
               width: 95%;
            }
          
    
        `;
    }

    closeBtn() {
        this.visible = false;
    }

    firstUpdated() {
        var data = document.querySelectorAll('media-image');
        data.forEach(image => {
            this.image.push(image.getAttribute('img-src'));
        })

        console.log(this.image);

        window.addEventListener('image-clicked', (e) => {
            var url = e.target.attributes.imgSrc.nodeValue;
            this.imageNumber = this.image.indexOf(url) + 1;
            this.visible = true;
        })
    }

    rightClick() {
        if (this.imageNumber < this.totalImageNumber)
            this.imageNumber = this.imageNumber + 1;
        else {
            this.imageNumber = 1;
        }
        this.requestUpdate();
    }
    leftClick() {
        if (this.imageNumber > 1)
            this.imageNumber = this.imageNumber - 1;
        else {
            this.imageNumber = this.totalImageNumber;
        }
        this.requestUpdate();
    }

    render() {
        return (!this.visible) ? `` : html`
        <div class="backdrop">
        <div class="topRow">
        <div>
          <div class="slide-image-number">${this.imageNumber}</div> of
          <div class="total-image-number">${this.totalImageNumber}</div>
      </div>
    
        <button class="closePopupButton" @click="${this.closeBtn}">
        x
      </button>
    
    </div>
    
    
    
    <div class="slide-image">
        <img id="image" src= ${this.image[this.imageNumber - 1]} alt = "slide">
        </div>
    
        <div class="imageLoop">
            <button class="leftButton" @click="${this.leftClick}">
            ←
      </button>
            <button class="rightButton" @click="${this.rightClick}">
            →
      </button>
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
