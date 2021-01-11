<template>
  <q-page class="indexPage">
    <div class="row">
      <div v-for="coinId in coins" :class="classes" :key="coinId">
        <chart-card :coin-id="coinId"></chart-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import ChartCard from '../components/ChartCard'

export default {
  name: 'PageIndex',
  components: { ChartCard },
  data() {
    return {
      classes: `q-py-md col-xs-12 col-sm-12 col-md-6 col-lg-4${
        !this.$q.platform.is.desktop ? '' : ' q-px-md'
      }`
    }
  },
  computed: {
    coins() {
      return { ...this.$store.state.global.pinnedCoinIds }
    }
  }
}
</script>
<style lang="scss">
.indexPage {
  color: #fff;
  background-color: $secondary;
}
</style>
