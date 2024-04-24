import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class imageDialog extends DDD {

  static get tag() {
    return 'image-dialog';
  }

  constructor() {
    super();
    this.opened = false;
    this.title = "img-gallery";
    this.imageUrl = [];
    this.imageCaption = [];
    this.imageDescription = [];
    this.imageNumber = 1; //current number shown
    this.totalImageNumber = 5;
  }

  static get styles() {
    return css`
    
      :host {
        display: none;
      }

      :host([opened]) {
        display: flex;
        z-index: 10000;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      
      .image {
        max-width:80%;
        max-height:80%;
        position: absolute;
        left: 12%;
        right: 12%;
        top: 15%;
      }
    
      .wrapper {
        margin: auto;
        padding: 8px;
        width:80vw;
        height: 80vh;
        background-color: var(--ddd-theme-default-slateLight);
        color: black;
        position: relative;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-md);
      }
    
      .info-panel {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    
      .close {
        margin: 8px;
        display: flex;
        justify-content: right
      }
    
      .description {
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
    
      .image-control {
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
    this.opened = false;
  }

  firstUpdated() {
    var data = document.querySelectorAll('media-image');
    data.forEach(image => {
      this.imageUrl.push(image.getAttribute('imgSrc'));
      this.imageCaption.push(image.getAttribute('caption'));
      this.imageDescription.push(image.getAttribute('description'));
    })

    console.log(this.imageUrl, this.imageCaption, this.imageDescription);

    window.addEventListener('image-clicked', (e) => {
      var url = e.target.attributes.imgSrc.nodeValue;
      var cap = e.target.attributes.caption.nodeValue;
      var desc = e.target.attributes.description.nodeValue;
      this.imageNumber = this.imageUrl.indexOf(url) + 1;
      this.opened = true;
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
    return (!this.opened) ? `` : html`
      <div class="wrapper">
        <div class="info-panel">
          <div class="image-counter">
            ${this.imageNumber}/${this.totalImageNumber}
          </div>
          <div class="description">
            ${this.imageDescription[this.imageNumber - 1]}
          </div>
          <button class="close" @click="${this.closeBtn}">
            X
          </button>
        </div>
        <div class="slide-image">
          <img class="image" src= ${this.imageUrl[this.imageNumber - 1]} alt = "slide">
        </div>
        <div class="image-control">
          <button class="left" @click="${this.leftClick}">
            ←
          </button>
          <button class="right" @click="${this.rightClick}">
            →
          </button>
        </div>
      </div>       
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      opened: { type: Boolean, reflect: true },
      title: { type: String, reflect: true },
      imageUrl: { type: Array, reflect: true },
      imageCaption: { type: Array, reflect: true },
      imageDescription: { type: Array, reflect: true },
      imageNumber: { type: Number, reflect: true },
      totalImageNumber: { type: Number, reflect: true }
    };
  }
}

globalThis.customElements.define(imageDialog.tag, imageDialog);
