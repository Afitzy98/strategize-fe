<template>
  <q-page class="searchPage">
    <q-toolbar-title class="header q-ma-sm"
      ><q-icon name="search" /> Search</q-toolbar-title
    >
    <search-bar
      :optionData="options"
      @updateModel="this.handleCoinIdChange"
      :loading="loading"
    />

    <div class="chartContainer">
      <chart-card
        :coinId="coinId"
        v-show="this.coinId !== ''"
        :key="this.coinId"
      />
    </div>
  </q-page>
</template>

<script>
import ChartCard from 'src/components/ChartCard.vue'
import SearchBar from 'src/components/SearchBar.vue'

export default {
  name: 'PageSearch',
  components: { SearchBar, ChartCard },
  data() {
    return {
      coinId: '',
      options: [],
      data: [],
      loading: true
    }
  },
  methods: {
    loadData() {
      this.$axios.get('/coins').then(({ data }) => {
        this.data = data
        this.options = data.map(({ name, symbol, id }) => ({
          label: `${name} (${symbol})`,
          value: id
        }))
        this.loading = false
      })
    },
    handleCoinIdChange(value) {
      this.coinId = value
    }
  },
  created() {
    this.loadData()
  }
}
</script>
<style lang="scss">
.chartContainer {
  max-width: 960px;
  margin: auto;
  margin-bottom: 2rem;
}
.header {
  font-size: 3rem;
}
.searchPage {
  color: #fff;
  background-color: $secondary;
}
</style>
