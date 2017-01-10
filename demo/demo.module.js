const
	Vue = require('vue'),
  VuePopper = require('../dist/vue-popper');
	
new Vue({
  el: '#app',
  
  components: {
    'popper': VuePopper
  },
  
  data: {
    showSecondPopover: true
  },
  
  methods: {
    hideSecondPopover() {
      this.showSecondPopover = false;
    }
  }
});
