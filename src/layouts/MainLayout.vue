<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          class="text-gray"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-gray">
          <q-icon class="text-accent" name="insert_chart_outlined" />
          Strategize
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered dark>
      <q-list>
        <q-item-label header class="text-white">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :onClick="closeDrawer"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: '/',
    isLocal: true
  },
  {
    title: 'Favourites',
    caption: 'List of the coins you have saved',
    icon: 'star',
    link: '/favourites',
    isLocal: true
  },
  {
    title: 'About',
    caption: '',
    icon: 'help',
    link: '/about',
    isLocal: true
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    closeDrawer() {
      this.leftDrawerOpen = false
    }
  }
}
</script>
