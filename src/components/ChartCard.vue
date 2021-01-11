<template>
  <q-card flat bordered class="card bg-dark" :width="this.cardWidth">
    <q-card-section>
      <div class="text-h6">
        {{ name }} - <span :class="this.signalClass">{{ signal }}</span>
        <q-btn
          :class="'float-right' + this.classes"
          flat
          round
          dense
          :icon="icon"
          @click="this.togglePinned"
        >
          <q-tooltip content-class="bg-accent text-dark">{{
            tooltipText
          }}</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

    <q-separator inset class="bg-accent q-mb-sm" />

    <q-card-section class="q-pt-none chartSection" id="chart-container">
      <div>
        <trading-vue
          :data="chart"
          :height="this.height"
          :width="this.width"
          :color-back="this.colors.colorBack"
          :color-grid="this.colors.colorGrid"
          :color-text="this.colors.colorText"
          :color-vol-up="this.colors.colorVolUp"
          :color-vold-dw="this.colors.colorVolDw"
          :font="this.font"
        >
        </trading-vue>
        <q-resize-observer @resize="onResize" />
      </div>
    </q-card-section>

    <q-separator inset class="bg-accent" />

    <q-card-section>
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script>
import TradingVue from 'trading-vue-js'

export default {
  name: 'ChartCard',
  components: { TradingVue },
  data() {
    return {
      chart: {
        chart: { name: '-', type: 'Candles', data: [] }
      },
      colors: {
        colorBack: '#1d1d1d',
        colorGrid: '#222',
        colorText: '#fff',
        colorVolUp: '#23a776',
        colorVolDw: '#23a776'
      },
      description: '',
      cardWidth: 0,
      height: 0,
      width: 300,
      name: '-',
      signal: '',
      signalClass: '',
      font: '0.5rem Arial, Helvetica, sans-serif',
      initialSizeSet: false
    }
  },
  methods: {
    loadData() {
      if (this.coinId !== '') {
        this.$axios.get(`/coin/${this.coinId}`).then(({ data }) => {
          const { ohlcv, indicators, coin = {}, signal } = data
          this.signal = signal === 'True' ? 'BUY' : 'SELL'
          this.signalClass = signal === 'True' ? 'buyText' : 'sellText'
          this.chart = {
            chart: {
              name: (coin.symbol || '') + ' / USD',
              type: 'Candles',
              data: ohlcv
            },
            onchart: indicators
          }
          this.font = '0.5rem Arial, Helvetica, sans-serif'
          this.description = coin.description
          this.name = coin.name
        })
      }
    },
    onResize({ width }) {
      if (
        !this.$q.platform.is.mobile ||
        (this.$q.platform.is.mobile && !this.initialSizeSet)
      ) {
        this.width = width
        this.height = (this.$q.platform.is.mobile ? 3 / 4 : 9 / 16) * width
        this.initialSizeSet = true
      }
    },
    togglePinned() {
      let newPinnedCoinIds = [...this.pinnedCoinIds]

      if (this.isPinned) {
        newPinnedCoinIds = newPinnedCoinIds.filter(id => {
          return id !== this.coinId
        })
      } else {
        newPinnedCoinIds.push(this.coinId)
      }
      this.$store.commit('global/updatePinnedCoinIds', newPinnedCoinIds)
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    clearInterval(this.timer)
  },
  created() {
    this.loadData()
    this.timer = setInterval(this.loadData, 120000)
  },
  computed: {
    pinnedCoinIds() {
      return this.$store.state.global.pinnedCoinIds
    },
    isPinned() {
      return this.pinnedCoinIds.includes(this.coinId)
    },
    classes() {
      return this.isPinned ? ' pinned' : ''
    },
    icon() {
      return this.isPinned ? 'star' : 'star_outline'
    },
    tooltipText() {
      return `Click to ${this.isPinned ? 'unpin from' : 'pin to'} home page`
    }
  },
  props: {
    coinId: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
.buyText {
  color: green;
}

.sellText {
  color: red;
}

.card {
  background-color: #fafafa;
}

.chartSection {
  padding: 0 !important;
  margin-bottom: 0.5rem;
}

.example {
  border: 1px solid;
}

.pinned {
  color: gold;
}
</style>
