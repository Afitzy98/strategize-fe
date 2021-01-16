<template>
  <q-item
    clickable
    tag="a"
    :target="target"
    :href="prefix + link"
    dark
    @click="onClick"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" class="text-accent" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-gray3">{{ title }}</q-item-label>
      <q-item-label caption class="text-gray3">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  data() {
    return {
      target: this.isLocal ? null : '__blank',
      prefix: this.isLocal ? '/#' : ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    isLocal: {
      type: Boolean,
      default: false
    },

    onClick: {
      type: Function,
      required: false,
      default: null
    }
  }
}
</script>
