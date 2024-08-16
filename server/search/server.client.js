import { Client } from '@elastic/elasticsearch'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const client = new Client({
    node: config.ELASTICSEARCH_NODE,
    auth: {
      username: config.ELASTICSEARCH_USERNAME,
      password: config.ELASTICSEARCH_PASSWORD
    }
  })

  return {
    provide: {
      elasticsearch: client
    }
  }
})
