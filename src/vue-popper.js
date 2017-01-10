/**
 * Vue.js component for Popper.js
 * By antongorodezkiy
 */

const
  Popper = require('popper.js');

module.exports = {
  
  props: {
    showPopper: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'top'
    },
    content: {
      type: String,
      required: false,
      default: ''
    },
    closeButton: {
      type: String,
      required: false,
      default: null
    }
  },
  
  data() {
    return {
      popperId: null,
      popper: null
    }
  },
  
  ready() {
    this.$nextTick(() => {
      if (this.showPopper) {
        this.initPopper();
      }
    });
  },
  
  watch: {
    showPopper(val, oldVal) {
      if (!!this.showPopper) {
        this.destroyPopper();
        this.$nextTick(() => {
          this.initPopper();
        });
      }
      else if (this.popper) {
        this.destroyPopper();
      }
    }
  },
  
  destroyed() {
    this.destroyPopper();
  },
  
  methods: {
    initPopper() {
      this.popperId = this.uuid4();
      
      let popperElement = document.createElement('div');
      popperElement.className = 'vue-popper-component';
      popperElement.innerHTML = this.content + (this.closeButton
        ? `<button
            id="${this.popperId}-close"
            type="button"
            class="js-popper-close popper-close">
              ${this.closeButton}
          </button>`
        : ''
      ) + `<div class="popper__arrow" x-arrow></div>`;
      
      document.getElementsByTagName('body')[0].appendChild(popperElement);
      
      this.popper = new Popper(
        this.$el,
        popperElement,
        {
          placement: this.placement || 'bottom',
          removeOnDestroy: true
        }
      );
      
      if (document.getElementById(this.popperId+'-close')) {
        document.getElementById(this.popperId+'-close').onclick = () => {
          this.showPopper = false;
        };
      }
    },
    
    destroyPopper() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    },
  
    uuid4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
};
