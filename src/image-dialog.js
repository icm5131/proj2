import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import { ref } from 'lit/directives/ref.js';


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
    this.imagePrimary = []
    this.currPrimary = "false";
    this.imageNumber = 1; //current number shown
    this.totalImageNumber = null;
  }

  static get styles() {
    return css`
    
      :host {
        display: none;
        --bord-wrap-color: var(--ddd-theme-default-shrineLight);
      }

      :host([currPrimary="true"]) {
        --bord-wrap-color: var(--ddd-theme-default-creekTeal);
      }

      :host([currPrimary="false"]) {
        --bord-wrap-color: var(--ddd-theme-default-creekLight);
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

      .image-control button {
        background-color: transparent;
        border: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-shrineLight);
        border-radius: var(--ddd-radius-xs);
      }

      .wrapper {
        margin: auto;
        padding: var(--ddd-spacing-4);
        width: 90vw;
        max-height: 90vh;
        background-color: var(--bord-wrap-color);
        color: black;
        position: relative;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-md);
        overflow-y: scroll;
      }

      .wrapper:not(:focus-within) {
        color: var(--ddd-theme-default-potentialMidnight);
        transition: color 0.01s;
      }
    
      .info-panel {
        width: 100%;
        display: grid;
        gap: var(--ddd-spacing-5);
      }

      .closebtn {
        grid-column-start: 3;
        text-align: right;
      }
    
      .close {
        text-align: center;
        transform: scale(2);
        margin: var(--ddd-spacing-1);
      }
    
      .description {
        text-align: left;
        grid-column-start: 2;
        width: 80%;
        margin: auto;

      }

      .image-counter {
        grid-column-start: 1;
      }
    
      .slide-image {
        text-align: center;
        margin: var(--ddd-spacing-6);
        height: 80%;
        overflow: hidden;
      }     

      .image {
        min-width: 40vw;
        max-width: 80vw;
        margin: auto;
      }
    
      .image-control {
        margin: var(--ddd-spacing-4);
        display: grid;
        justify-content: space-between;  
        position: absolute;
        bottom: 0;
        width: 95%;
      }

      .left {
        grid-column-start: 1;
        transform: scale(2);
      }

      .right {
        grid-column-start: 3;
        transform: scale(2);
      }
    `;
  }

  ontransitioned = (e) => {
    document.querySelector('.close').focus();
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
      this.imagePrimary.push(image.getAttribute('primary'));
    })

    console.log(this.imagePrimary);
    this.totalImageNumber = this.imageUrl.length;

    window.addEventListener('image-clicked', (e) => {
      var url = e.target.attributes.imgSrc.nodeValue;
      this.imageNumber = this.imageUrl.indexOf(url) + 1;
      this.updateBG();
      this.opened = true;
    })
  }

  rightClick() {
    if (this.imageNumber < this.totalImageNumber)
      this.imageNumber = this.imageNumber + 1;
    else {
      this.imageNumber = 1;
    }
    this.updateBG();
    this.requestUpdate();
  }
  leftClick() {
    if (this.imageNumber > 1)
      this.imageNumber = this.imageNumber - 1;
    else {
      this.imageNumber = this.totalImageNumber;
    }
    this.updateBG();
    this.requestUpdate();
  }

  updateBG() {
    this.currPrimary = this.imagePrimary[this.imageNumber - 1];
    console.log(this.currPrimary);
  }

  render() {
    return (!this.opened) ? `` : html`
      <div class="background"></div>
      <div class="wrapper">
        <div class="info-panel">
          <div class="image-counter">
            ${this.imageNumber}/${this.totalImageNumber}
          </div>
          <div class="description">
            ${this.imageDescription[this.imageNumber - 1]}
          </div>
          <div class="closebtn">
            <button class="close" @click="${this.closeBtn}">
              X
            </button>
            </div>
        </div>
        <div class="slide-image">
          <img class="image" src= ${this.imageUrl[this.imageNumber - 1]} alt="${this.imageCaption[this.imageNumber - 1]}">
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
      totalImageNumber: { type: Number, reflect: true },
      imagePrimary: { type: Array, reflect: true },
      currPrimary: { type: String, reflect: true }
    };
  }
}

globalThis.customElements.define(imageDialog.tag, imageDialog);
