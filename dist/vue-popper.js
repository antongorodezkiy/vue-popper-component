(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VuePopper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function(){
'use strict';

var Popper = require('popper.js');

var extend = function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
};

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
    },
    popperOptions: {
      type: Object,
      required: false,
      default: {}
    }
  },
  data: function data() {
    return {
      popperId: null,
      popper: null
    };
  },
  mounted: function mounted() {
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
      this.popper = new Popper(this.$el, this.$el.querySelector('.vue-popper-component'), extend({
        placement: this.placement || 'bottom',
        removeOnDestroy: true
      }, this.popperOptions));
    },
    closePopper: function closePopper() {
      this.$emit('close-popper');
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
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default"),_vm._v(" "),(_vm.showPopper)?_c('div',{staticClass:"vue-popper-component",attrs:{"id":'vue-popper-'+_vm.popperId}},[(_vm.closeButton)?_c('button',{staticClass:"js-popper-close popper-close",attrs:{"id":'vue-popper-'+_vm.popperId+'-close',"type":"button"},on:{"click":function($event){_vm.closePopper()}}},[_vm._t("close-button",[_vm._v(_vm._s(_vm.closeButton))])],2):_vm._e(),_vm._v(" "),_vm._t("content",[_vm._v(_vm._s(_vm.content))]),_vm._v(" "),_c('div',{staticClass:"popper__arrow",attrs:{"x-arrow":""}})],2):_vm._e()],2)}
__vue__options__.staticRenderFns = []

},{"popper.js":"popper.js"}]},{},[1])(1)
});