'use strict';

/**
 * Vue.js component for Popper.js
 * By antongorodezkiy
 */

var Popper = require('popper.js');

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

  data: function data() {
    return {
      popperId: null,
      popper: null
    };
  },
  ready: function ready() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.showPopper) {
        _this.initPopper();
      }
    });
  },


  watch: {
    showPopper: function showPopper(val, oldVal) {
      var _this2 = this;

      if (!!this.showPopper) {
        this.destroyPopper();
        this.$nextTick(function () {
          _this2.initPopper();
        });
      } else if (this.popper) {
        this.destroyPopper();
      }
    }
  },

  destroyed: function destroyed() {
    this.destroyPopper();
  },


  methods: {
    initPopper: function initPopper() {
      var _this3 = this;

      this.popperId = this.uuid4();

      var popperElement = document.createElement('div');
      popperElement.className = 'vue-popper-component';
      popperElement.innerHTML = this.content + (this.closeButton ? '<button\n            id="' + this.popperId + '-close"\n            type="button"\n            class="js-popper-close popper-close">\n              ' + this.closeButton + '\n          </button>' : '') + '<div class="popper__arrow" x-arrow></div>';

      document.getElementsByTagName('body')[0].appendChild(popperElement);

      this.popper = new Popper(this.$el, popperElement, {
        placement: this.placement || 'bottom',
        removeOnDestroy: true
      });

      if (document.getElementById(this.popperId + '-close')) {
        document.getElementById(this.popperId + '-close').onclick = function () {
          _this3.showPopper = false;
        };
      }
    },
    destroyPopper: function destroyPopper() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    },
    uuid4: function uuid4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }
};