import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { getInstance } from './nhost'

const wsurl = 'ws://localhost:8080/v1/graphql'
const httpurl = 'http://localhost:8080/v1/graphql'

// create the web socket link
const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
    timeout: 60000,
    connectionParams: () => {
      const auth = getInstance()
      const jwtToken = auth.nHostAuthClient.getJWTToken()
      return {
        headers: {
          authorization: jwtToken ? `Bearer ${jwtToken}` : ''
        }
      }
    }
  }
})

const httpLink = new HttpLink({
  uri: httpurl
})

const authLink = setContext((a, { headers }) => {
  const auth = getInstance()
  const jwtToken = auth.nHostAuthClient.getJWTToken()
  // console.log('AUTH LINK: ', jwtToken)
  return {
    headers: {
      ...headers,
      authorization: jwtToken ? `Bearer ${jwtToken}` : ''
    }
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

export { client }

export default async ({
  app,
  Vue
}) => {
  Vue.use(VueApollo)
  const apolloProvider = new VueApollo({
    defaultClient: client
  })
  app.apolloProvider = apolloProvider
}
