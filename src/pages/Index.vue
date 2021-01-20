<template>
  <q-page class="indexPage text-gray">
    <div :class="headerContainerClass">
      <div class="inner-img-container q-pa-md">
        <div :class="headerClasses + ' q-mt-lg q-py-lg'">
          Welcome to Strategize
        </div>
        <h4>The easiest way to invest.</h4>

        <search-bar
          :optionData="options"
          @updateModel="this.handleCoinIdChange"
          :loading="loading"
          :onSelect="this.handleSelect"
        />
      </div>
    </div>
    <div class="contentContainer q-pa-lg q-my-xl">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 q-py-xl">
          <div class="svgContainer">
            <img src="../assets/strategy-svgrepo-com.svg" class="svgIcon" />
          </div>
        </div>
        <div :class="footerClasses + ' col-xs-12 col-sm-12 col-md-6 q-py-xl'">
          <div>
            Follow the same strategy as a trading bot to take the human error
            out of your trading. We provide users with trading charts
            accompanied by the trading signals provided by our bots strategy to
            help them bring their strategy to the next level. Click
            <a href="#/about">here</a> to learn more.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import SearchBar from 'src/components/SearchBar.vue'

export default {
  name: 'PageSearch',
  components: { SearchBar },
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
    },
    handleSelect() {
      document.location.href += 'coin/' + this.coinId
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    headerClasses() {
      return this.$q.platform.is.mobile
        ? 'centreMobile text-h2'
        : 'text-h1 q-mt-xl'
    },
    headerContainerClass() {
      return this.$q.platform.is.mobile
        ? 'mobile-image img-container centreMobile'
        : 'desktop-image img-container'
    },
    footerClasses() {
      return this.$q.platform.is.desktop ? 'text-h5' : 'text-h6 centreMobile'
    }
  }
}
</script>
<style lang="scss">
.desktop-image {
  background-image: url('../assets/landingPhoto.jpeg');
}
.mobile-image {
  background-image: url('../assets/mobileLanding.jpeg');
  background-size: contain;
}
.img-container {
  width: 100%;
  min-height: 95vh;
}
.inner-img-container {
  max-width: 960px;
  margin: auto;
}

.contentContainer {
  max-width: 960px;
  margin: auto;
}

.text-h4 {
  font-size: 4rem;
}

.svgIcon {
  filter: invert(90%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%)
    contrast(90%);
}

.svgContainer {
  max-width: 50%;
  margin: auto;
}

.textContainer {
  background-color: $secondary;
  border-radius: 0.25rem;
  opacity: 0.8;
  margin-bottom: 0;
}

.centreMobile {
  text-align: center;
}

.indexPage {
  background-color: $secondary;
}
</style>
