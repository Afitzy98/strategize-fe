<template>
  <q-dialog v-model="open" persistent>
    <q-card dark>
      <q-card-section class="row items-center">
        <q-avatar
          icon="circle_notifications"
          color="accent"
          text-color="dark"
        />
        <span class="q-ml-sm q-mt-md"
          >Would you like to receive notifications when your favourite coins get
          a new buy or sell signal?</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="No thanks"
          color="accent"
          v-close-popup
          @click="setHasSeenDialog"
        />
        <q-btn
          flat
          label="Yes please!"
          color="accent"
          v-close-popup
          @click="subscribeUserToPush"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { PUSH_PUBLIC_KEY } from '../../config'
import { urlB64ToUint8Array } from 'src/utils/push'

export default {
  name: 'NotificationDialog',

  props: {
    open: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    setHasSeenDialog() {
      this.$store.commit('global/updateHasSeenNotificationDialog', true)
    },

    subscribeUserToPush() {
      const applicationServerKey = urlB64ToUint8Array(PUSH_PUBLIC_KEY)

      this.$store.state.global.swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(subscription => {
          console.log('User is subscribed.')
          console.log(subscription)
          this.$store.dispatch('global/updatePushSubscription', subscription)
        })
        .catch(err => {
          console.log('Failed to subscribe the user: ', err)
        })

      this.setHasSeenDialog()
    }
  }
}
</script>
