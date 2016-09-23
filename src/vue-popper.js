/**
 * Vue.js directive for Popper.js
 * By antongorodezkiy
 */

const
  Popper = require('popper.js');

let VuePopper = {
  
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
      type: Boolean,
      required: false,
      default: false
    }
  },
  
  data() {
    return {
      popperId: null,
      popper: null
    }
  },
  
  ready() {
    Vue.nextTick(() => {
      if (this.showPopper) {
        this.initPopper();
      }
    });
  },
  
  watch: {
    showPopper(val, oldVal) {
      if (!!this.showPopper) {
        this.destroyPopper();
        Vue.nextTick(() => {
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
      this.popper = new Popper(
        this.$el,
        {
          content: (
            this.content + (this.closeButton
              ? `<button
                  data-uuid="${this.popperId}"
                  type="button"
                  class="js-popper-close popper-close">
                    <i class="fa fa-times"></i>
                </button>`
              : ''
            )
          ) || '',
          contentType: 'html',
          classNames: ['vue-popper-component']
        },
        {
          placement: this.placement || 'bottom',
          removeOnDestroy: true
        }
      );
      
      $('body').on('click', '.js-popper-close', (e) => {
        if (this.popperId == $(e.currentTarget).data('uuid')) {
          this.showPopper = false;
        }
      });
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


/*
 * Install Vue Directive if Vue is available
 */

if (typeof Vue !== "undefined") {
  Vue.component('popper', VuePopper);
}
