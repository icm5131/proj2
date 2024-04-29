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

      .mask {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        opacity: 0.9;
        user-select: none;
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .wrapper {
        margin: auto;
        z-index: 1000;
        padding: var(--ddd-spacing-4);
        width: 90vw;
        height: 96vh;
        background-color: var(--bord-wrap-color);
        color: black;
        position: relative;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-md);
        overflow-y: scroll;
        text-align: center;
      }

      .wrapper:not(:focus-within) {
        color: var(--ddd-theme-default-potentialMidnight);
        transition: color 0.01s;
      }

      .background {
        width: 5vw;
        z-index: 1000;
        display: grid;
        gap: var(--ddd-spacing-4);
      }
    
      .info-panel {
        width: 100%;
        display: grid;
        gap: var(--ddd-spacing-5);
        text-align: left;
      }

      .closebtn {
        grid-column-start: 3;
        text-align: right;
      }
    
      .close {
        text-align: center;
        transform: scale(2);
        margin: var(--ddd-spacing-1);
        background-color: transparent;
        border: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-radius: var(--ddd-radius-xs);
      }

      .close:focus,
      .close:hover {
        background-color: var(--ddd-theme-default-limestoneLight);
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
        height: 70%;
        overflow-y: scroll;
      }     

      .image {
        min-height: 50vh;
        max-width: 40vw;
        max-height: 60vh;
        margin: auto;
      }

      .img-preview {
        overflow-x: scroll;
        margin: auto;
        opacity: .9;
      }

      .pre-img {
        width: 5vw;
      }
    
      .img-select {
        margin: auto;
        transform: scale(2);
        background-color: transparent;
        color: white;
        border: none;
      }

      .img-select:hover,
      .img-select:focus {
        background-color: var(--ddd-theme-default-coalyGray);
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
  }

  render() {
    return (!this.opened) ? `` : html`
      <div class="mask"></div>
      <div class="background">
        <button class="left img-select" @click="${this.leftClick}">
          ←
        </button>
      </div>
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
        <div class="img-preview">
          ${this.imageUrl.map((url) => html`
            <img class="pre-img" src="${url}">
          `)}
        </div>
      </div>       
      <div class="background">
        <button class="right img-select" @click="${this.rightClick}">
          →
        </button>
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
