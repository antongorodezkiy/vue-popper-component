vue-popper-component
==============

Simple Vue.js component for [Popper.js](https://popper.js.org/) plugin.

### Dependencies:

- Vue 1.*
- Popper.js 1.*

### Usage:

```javascript
const
	Vue = require('vue'),
  VuePopper = require('vue-popper-component');
	
new Vue({
  el: '#app',
  
  components: {
    'popper': VuePopper
  }
});
```

```html
<popper
	inline-template="true"
	:show-popper="true"
	content='<h4>Header</h4>
		<p>Lorem ipsum</p>
		<a target="_blank" href="/">Go to page</a>'
	placement="right"
	close-button="fa fa-times">
	<span @click.prevent="showPopper = !showPopper">
		?
	</span>
</popper>
```

For other demos please check `demo` folder.
