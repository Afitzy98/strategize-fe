<template>
  <q-page class="coinPage">
    <div class="chartContainer">
      <chart-card
        :coinId="this.$route.params.coinId"
        :key="this.$route.params.coinId"
      />
    </div>
  </q-page>
</template>

<script>
import ChartCard from 'src/components/ChartCard.vue'

export default {
  name: 'PageCoin',
  components: { ChartCard }
}
</script>
<style lang="scss">
.chartContainer {
  padding: 2rem 0;
}
.header {
  font-size: 3rem;
}
.coinPage {
  color: #d3d3d3;
  background-color: $secondary;
}
</style>
