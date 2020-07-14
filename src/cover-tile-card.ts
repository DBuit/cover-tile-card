import { LitElement, html, css, svg } from 'lit-element';

class CoverTileCard extends LitElement {
  config: any;
  hass: any;
  shadowRoot: any;

  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var entity = this.config.entity;
    var configName = this.config.name;
    var configIcon = "icon" in this.config ? this.config.ico : 'mdi:window-shutter-alert';
    var configStates = this.config.states;
    var states: any[] = [];
    for(let configState of configStates) {
      if("name" in configState && "icon" in configState && "position" in configState) {
        states[configState.position] = {
          icon: configState.icon,
          name: configState.name
        };
      }
    }
    var position = this.hass.states[entity].attributes.current_position;

    if(states[position]) {
      return html`
        <span class="icon on">
          <ha-icon icon="${states[position].icon}" />
        </span>
        <span class="name on">${configName}</span>
        <span class="state on">${states[position].name}</span>
      `;
    } else {
      return html`
        <span class="icon on">
          <ha-icon icon="${configIcon}" />
        </span>
        <span class="name on">${configName}</span>
        <span class="state on">Bezig</span>
      `;
    }
  }
  
  updated() { }

  setConfig(config) {
    if (!config.name) {
      throw new Error("You need to define a name");
    }
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 1;
  }
  
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .name {
        display:block;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.4);
        width: 100%;
        margin-top: auto;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap:break-word;
        overflow: hidden;
        white-space: normal;
      }
      
      .name.on {
        color: rgba(0, 0, 0, 1);
      }
      
      .state {
        position: relative;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.4);
        text-transform: capitalize;
        float: left;
      }
      .state .previous {
        position: relative;
        margin-left: 5px;
        font-size: 9px;
        color: rgb(134, 134, 134);
        text-transform: lowercase;
      }
      
      .value {
        visibility: hidden;
      }
      
      .value.on {
        visibility: visible;
        position: relative;
        margin-left: 5px;
        font-size: 11px;
        color: rgba(255, 0, 0, 1);
        text-transform: lowercase;
      }
      
      .state.on {
        color: rgba(0, 0, 0, 1);
      }
      .state.unavailable {
        color: rgba(255, 0, 0, 1);
      }
      
      .icon {
        display:block;
        height: 40px;
        width: 40px;
        color: rgba(0, 0, 0, 0.3);
        font-size: 30px;
        padding-top:5px;
      }
      .icon ha-icon {
        width:30px;
        height:30px;
      }
                
      .icon.on {
        color: #f7d959;
      }
    `;
  }
}

customElements.define('cover-tile-card', CoverTileCard);