<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Hasura Quasar App
        </q-toolbar-title>

        <q-btn
          v-if="!$auth.isAuthenticated"
          to="/login"
          flat
        >Login</q-btn>
        <q-btn
          v-if="!$auth.isAuthenticated"
          to="/register"
          flat
        >Register</q-btn>
        <q-btn
          v-if="$auth.isAuthenticated"
          flat
          @click="logout"
        >Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >Essential Links</q-item-label>
        <q-item
          v-for="(item, index) in items"
          :key="index"
          clickable
          :to="item.to"
        >
          <q-item-section
            v-if="item.icon"
            avatar
          >
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Posts',
          caption: 'All posts',
          icon: 'school',
          to: '/posts',
          show: () => this.$auth.isAuthenticated
        }
      ]
    }
  },
  computed: {
    items () {
      return this.essentialLinks.filter(i => i.show())
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$q.notify({
            color: 'positive',
            message: 'User was logout!'
          })
          this.$router.replace('/').catch(() => { })
        })
    }
  }
}
</script>
