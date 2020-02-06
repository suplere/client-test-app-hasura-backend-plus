<template>
  <q-page class="flex flex-center">
    <q-card style="min-width:300px">
      <q-form
        @submit="register"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6 text-center">Register User</div>
          <q-input
            v-model="username"
            label="Username"
            :rules="[val => !!val || 'Field is required']"
          ></q-input>
          <q-input
            v-model="password"
            type="password"
            label="Password"
            :rules="[val => !!val || 'Field is required']"
          ></q-input>
          <q-input
            v-model="confirmPassword"
            type="password"
            label="Confirm password"
            :rules="[val => val === this.password || 'Password dont match']"
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            type="submit"
          >Register User</q-btn>
          <q-btn
            color="secondary"
            type="reset"
          >Reset</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register () {
      // console.log('Register user')
      this.$auth.register({
        username: this.username,
        password: this.password
      })
        .then(() => {
          if (this.$auth.isAuthenticated) {
            this.$q.notify({
              color: 'positive',
              message: 'User was register! Admin must confirm user.'
            })
            this.$router.replace('/')
          }
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Register method failed'
          })
        })
    },
    onReset () {
      this.password = ''
      this.confirmPassword = ''
      this.username = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
