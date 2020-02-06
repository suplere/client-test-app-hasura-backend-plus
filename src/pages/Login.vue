<template>
  <q-page class="flex flex-center">
    <q-card style="min-width:300px">
      <q-form
        @submit="login"
        @reset="onReset"
      >
        <q-card-section>
          <div class="text-h6 text-center">Login User</div>
          <q-input
            v-model="username"
            label="Username"
            :rules="[val => !!val || 'Field is required']"
          ></q-input>
          <q-input
            v-model="password"
            type="Password"
            label="Input password"
            :rules="[val => !!val || 'Field is required']"
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            type="submit"
          >Login User</q-btn>
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
      password: ''
    }
  },
  methods: {
    login () {
      this.$auth.login({
        username: this.username,
        password: this.password
      })
        .then(() => {
          if (this.$auth.isAuthenticated) {
            this.$q.notify({
              color: 'positive',
              message: 'User was logged in!'
            })
            this.$router.replace('/posts')
          }
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Login failed'
          })
        })
    },
    onReset () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
