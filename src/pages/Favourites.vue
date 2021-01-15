<template>
  <q-page :class="pageClasses">
    <div class="row">
      <div v-for="coinId in coins" :class="cardClasses" :key="coinId">
        <chart-card :coin-id="coinId"></chart-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="js">
import ChartCard from '../components/ChartCard'

export default {
  name: 'PageFavourites',
  components: { ChartCard },
  data() {
    const cardClasses = `q-py-md col-xs-12${
        !this.$q.platform.is.desktop ? '' : ' q-px-sm'
      }`
    const pageClasses = `indexPage${!this.$q.platform.is.desktop ? '' : ' q-px-sm'}`

    return {
      cardClasses,
      pageClasses
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
  color: #d3d3d3;
  background-color: $secondary;
}
</style>
