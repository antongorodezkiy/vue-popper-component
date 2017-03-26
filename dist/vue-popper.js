(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VuePopper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function(){
'use strict';

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
        this.$nextTick(function () {
          _this2.initPopper();
        });
      }
    }
  },

  destroyed: function destroyed() {
    this.destroyPopper();
  },


  methods: {
    initPopper: function initPopper() {
      this.popperId = this.uuid4();
      this.popper = new Popper(this.$el, this.$el.querySelector('.vue-popper-component'), {
        placement: this.placement || 'bottom',
        removeOnDestroy: true
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
})()
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div><slot></slot><div v-if=showPopper :id=\"'vue-popper-'+popperId\" class=vue-popper-component><button v-if=closeButton @click=\"showPopper = false\" :id=\"'vue-popper-'+popperId+'-close'\" type=button class=\"js-popper-close popper-close\"><slot name=close-button>{{ closeButton }}</slot></button><slot name=content>{{ content }}</slot><div class=popper__arrow x-arrow=\"\"></div></div></div>"

},{"popper.js":"popper.js"}]},{},[1])(1)
});