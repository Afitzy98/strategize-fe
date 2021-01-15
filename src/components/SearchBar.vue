<template>
  <div class="q-gutter-md row">
    <q-select
      filled
      v-model="model"
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      :hint="hint"
      class="searchBar"
      emit-value
      map-options
      use-input
      hide-selected
      fill-input
      :loading="loading"
      :disable="loading"
      label="Search for a coin or token"
      color="accent"
      bg-color="primary"
      label-color="accent"
    >
      <template v-slot:no-option>
        <q-item class="bg-primary">
          <q-item-section class="text-gray">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      options: this.optionData,
      model: ''
    }
  },
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.optionData.filter(
          ({ label: v }) => v.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  },
  props: {
    hint: {
      type: String,
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    optionData: {
      type: Array,
      required: true
    },
    onSelect: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  watch: {
    model() {
      this.$emit('updateModel', this.model)
      this.onSelect()
    }
  }
}
</script>
<style lang="scss">
.searchBar {
  width: 100%;
}
.q-field__input {
  color: #d3d3d3 !important;
}
</style>
