<template>
  <q-page>
    <div class="terms">
      <h3>{{ header }}</h3>

      <text-section
        v-for="section in sections"
        :key="section.title"
        :title="section.title"
        :lines="section.lines"
      />
    </div>
  </q-page>
</template>

<script lang="js">
import TextSection from 'src/components/TextSection.vue'
import { terms } from 'src/text.json'

export default {
  name: 'PageTerms',
  components: { TextSection },
  data() {
    return {
      header: terms.header,
      sections: terms.sections
    }
  }
}
</script>
<style lang="scss">
.terms {
  padding: 1rem;
  margin: 1rem auto;
  color: #d3d3d3;
  max-width: 960px;
}
</style>
