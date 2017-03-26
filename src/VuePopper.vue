<script>
const Popper = require('popper.js')

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
  data () {
    return {
      popperId: null,
      popper: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.showPopper) {
        this.initPopper();
      }
    })
  },
  watch: {
    showPopper (val, oldVal) {
      if (!!this.showPopper) {
        this.$nextTick(() => {
          this.initPopper()
        })
      }
    }
  },
  destroyed() {
    this.destroyPopper()
  },
  methods: {
    initPopper () {
      this.popperId = this.uuid4()
      this.popper = new Popper(
        this.$el,
        this.$el.querySelector('.vue-popper-component'),
        {
          placement: this.placement || 'bottom',
          removeOnDestroy: true
        }
      )
    },
    closePopper () {
      this.$emit('close-popper')
    },
    destroyPopper() {
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
    },
    uuid4 () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
}
</script>

<template>
  <div>
    <slot></slot>
    <div v-if="showPopper" :id="'vue-popper-'+popperId" class="vue-popper-component">
      <button
        v-if="closeButton"
        @click="closePopper()"
        :id="'vue-popper-'+popperId+'-close'"
        type="button"
        class="js-popper-close popper-close">
          <slot name="close-button">{{ closeButton }}</slot>
      </button>

      <slot name="content">{{ content }}</slot>

      <div class="popper__arrow" x-arrow></div>
    </div>
  </div>
</template>
