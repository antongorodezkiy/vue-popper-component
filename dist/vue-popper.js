'use strict';

/**
 * Vue.js directive for Popper.js
 * By antongorodezkiy
 */

var Popper = require('popper.js');

var VuePopper = {

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

  data: function data() {
    return {
      popperId: null,
      popper: null
    };
  },
  ready: function ready() {
    var _this = this;

    Vue.nextTick(function () {
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
        Vue.nextTick(function () {
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
      this.popper = new Popper(this.$el, {
        content: this.content + (this.closeButton ? '<button\n                  data-uuid="' + this.popperId + '"\n                  type="button"\n                  class="js-popper-close popper-close">\n                    <i class="fa fa-times"></i>\n                </button>' : '') || '',
        contentType: 'html',
        classNames: ['vue-popper-component']
      }, {
        placement: this.placement || 'bottom',
        removeOnDestroy: true
      });

      $('body').on('click', '.js-popper-close', function (e) {
        if (_this3.popperId == $(e.currentTarget).data('uuid')) {
          _this3.showPopper = false;
        }
      });
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

/*
 * Install Vue Directive if Vue is available
 */

if (typeof Vue !== "undefined") {
  Vue.component('popper', VuePopper);
}