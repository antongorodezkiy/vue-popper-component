const
  Vue = require('vue'),
  VuePopper = require('../dist/vue-popper')

new Vue({
  el: '#app',

  components: {
    'popper': VuePopper
  },

  data: {
    showPopper1: true,
    showPopper2: false,
    showPopper3: false,
    showPopper4: false
  },

  methods: {
    hideSecondPopover() {
      this.showSecondPopover = false;
    }
  }
})
