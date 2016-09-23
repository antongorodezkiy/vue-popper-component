vue-popper-component
==============

Simple Vue.js component for [Popper.js](https://popper.js.org/) plugin.


### Usage:

```javascript
require('vue-popper-component');
```

```html
<popper
	inline-template="true"
	:show-popper="true"
	content='<h4>Header</h4>
		<p>Lorem ipsum</p>
		<a target="_blank" href="/">Go to page</a>'
	placement="right"
	:close-button="true">
	<a
		@click.prevent="showPopper = !showPopper"
		href="#"
		class="color-orange d-ib">
		<span class="fa fa-question-circle"></span>
	</a>
</popper>
```
