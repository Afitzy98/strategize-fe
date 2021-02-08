<template>
  <div>
    <h5 class="title">
      {{ title }}
    </h5>
    <p v-for="line in lines" :key="line">
      <span v-if="line.bullets">&nbsp;&nbsp;&#8226;&nbsp;</span>{{ line.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextSection',

  props: {
    title: {
      type: String
    },
    lines: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.title {
  font-weight: 500;
}
</style>
