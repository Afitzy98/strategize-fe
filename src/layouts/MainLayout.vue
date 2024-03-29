<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-show="this.isLoggedIn"
          class="text-gray"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-gray">
          <q-icon class="text-accent" name="insert_chart_outlined" />
          Strategize
        </q-toolbar-title>

        <q-btn
          outline
          size="small"
          color="accent"
          :label="buttonText"
          class="q-ma-sm"
          @click="handleClick"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered dark>
      <q-list>
        <q-item-label header />
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :onClick="closeDrawer"
        />
      </q-list>
    </q-drawer>

    <notification-dialog :open="displayNotificationDialog" />>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import sw from '../../src-pwa/register-service-worker'
import EssentialLink from 'components/EssentialLink.vue'
import NotificationDialog from 'components/NotificationDialog.vue'
import api from 'src/api'
import { SUBSCRIPTION_STATUS } from 'src/constants'

const linksData = [
  {
    title: 'Home',
    caption: "Find the coin you're looking for",
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
    caption: 'Find out about how it all works',
    icon: 'help',
    link: '/about',
    isLocal: true
  },
  {
    title: 'Terms & Conditions',
    icon: 'text_snippet',
    link: '/terms',
    isLocal: true
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, NotificationDialog },
  data() {
    return {
      leftDrawerOpen: false,
      stripeAccountLink: '',
      essentialLinks: linksData
    }
  },
  methods: {
    closeDrawer() {
      this.leftDrawerOpen = false
    },
    handleClick() {
      if (this.isLoggedIn) {
        this.$store.dispatch('global/logout')
      } else if (this.$router.history.current.fullPath !== '/login') {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.global.user
    },
    buttonText() {
      return this.isLoggedIn ? 'Sign out' : 'sign in'
    },
    displayNotificationDialog() {
      const hasSeenNotificationDialog = this.$store.state.global
        .hasSeenNotificationDialog
      const isPayingUser =
        this.$store.state.global.user?.subscription_status ===
        SUBSCRIPTION_STATUS.ACTIVE

      return !hasSeenNotificationDialog && isPayingUser
    }
  },
  async mounted() {
    if (this.$store.state.global.user) {
      const {
        data: { url }
      } = await api.createCustomerPortal(this.$store.state.global.token)
      console.log(url)
      this.essentialLinks = [
        ...this.essentialLinks,
        {
          title: 'Account',
          caption: 'Manage your account',
          icon: 'account_circle',
          link: url
        }
      ]
    }
    if (sw.registration) {
      this.$store.commit('global/updateSwRegistration', sw.registration)
      sw.registration.pushManager.getSubscription().then(subscription => {
        const isSubscribed = !(subscription === null)

        this.$store.commit('global/updateIsSubscribed', isSubscribed)
      })
    }
  }
}
</script>
