<template>
  <q-page class="flex flex-center">
    <div class="text-h4">
      Starter app for Hasura and Hasura-beckend-plus
    </div>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'PageIndex',
  apollo: {
    test_posts: {
      query: gql`
        query MyQuery {
          test_posts{
            id
          }
        }
      `,
      skip () {
        return !this.$auth.isAuthenticated
      }
    }
  }
}
</script>
