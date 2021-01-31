<template>
  <q-page class="bg-secondary text-gray">
    <div class="form-container q-pa-lg q-my-lg">
      <div class="text-h2 q-py-lg">
        {{ headerText }}
      </div>
      <div class="text-h5">
        or
        <a @click="handleStateChange" href="#/login"> {{ linkText }}</a>
      </div>
      <div v-if="errors.length">
        <q-card
          v-for="error in errors"
          :key="error"
          class="error q-pa-md q-my-md bg-dark"
        >
          {{ error }}
        </q-card>
      </div>

      <form id="login">
        <q-input
          v-model="email"
          filled
          dark
          id="email"
          type="email"
          hint="Email"
          class="q-my-lg fullwidth input"
          name="email"
          color="accent"
          bg-color="dark"
        />

        <q-input
          v-model="password"
          filled
          dark
          id="password"
          type="password"
          hint="Password"
          class="q-my-lg fullwidth input"
          name="password"
          color="accent"
          bg-color="primary"
        />

        <q-btn
          v-on:keyup.enter="handleClick"
          @click="handleClick"
          color="accent"
          :label="buttonText"
          class="fullwidth text-black q-pa-sm q-mb-lg"
        />
      </form>
    </div>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data() {
    return {
      email: null,
      password: null,
      isLogin: true
    }
  },
  methods: {
    async handleClick(e) {
      const loadingBar = this.$refs.bar
      loadingBar.start()

      if (this.isLogin) {
        this.login()
      } else {
        await this.register()
      }

      this.timer = setTimeout(() => {
        if (this.$refs.bar) {
          this.$refs.bar.stop()
        }
      }, Math.random() * 2000 + 1000)
    },
    login() {
      if (this.email && this.password) {
        this.$store.dispatch('global/login', {
          email: this.email.toLowerCase(),
          password: this.password
        })
        return
      }
      this.updateErrors()
    },
    async register() {
      if (
        this.email &&
        this.validateEmail(this.email) &&
        this.password &&
        this.validatePassword(this.password)
      ) {
        await this.$store.dispatch('global/register', {
          email: this.email.toLowerCase(),
          password: this.password
        })
        return
      }
      this.updateErrors()
    },
    updateErrors() {
      const errors = []

      if (!this.email || this.validateEmail(this.email) === false) {
        errors.push('You entered an invalid email address.')
      }
      if (!this.password || this.validatePassword(this.password) === false) {
        errors.push(
          'Passwords must be between 6 and 20 characters and contain at least one uppercase letter, one lowercase letter and one number.'
        )
      }
      this.$store.commit('global/updateLoginErrors', errors, true)
    },

    validateEmail(email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    },
    validatePassword(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)
    },
    handleStateChange() {
      this.isLogin = !this.isLogin
    }
  },
  computed: {
    buttonText() {
      return this.isLogin ? 'sign in' : 'register'
    },
    errors() {
      return this.$store.state.global.loginErrors
    },
    headerText() {
      return this.isLogin ? 'Login' : 'Register'
    },
    linkText() {
      return this.isLogin ? 'Register' : 'Login'
    }
  },
  mounted() {
    if (this.$store.state.global.user) {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.form-container {
  max-width: 600px;
  margin: auto;
}

.error {
  border: 2px solid gold;
  border-radius: 0.5rem;
  border-style: dotted;
}
</style>
