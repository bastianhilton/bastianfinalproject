<template>
    <div>
      <h1>Search Results</h1>
      
      <!-- Sorting and Filtering Controls -->
      <div>
        <label>Sort By:</label>
        <select v-model="sortBy" @change="fetchResults">
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
  
        <label>Order:</label>
        <select v-model="sortOrder" @change="fetchResults">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
  
        <label>Filter by Category:</label>
        <input v-model="filters.category" @input="fetchResults" placeholder="Category" />
  
        <label>Filter by Published:</label>
        <select v-model="filters.published" @change="fetchResults">
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
      </div>
  
      <!-- Display Results -->
      <ul>
        <li v-for="post in results" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </li>
      </ul>
  
      <!-- Pagination Controls -->
      <div v-if="totalPages > 1">
        <button @click="changePage(page - 1)" :disabled="page <= 1">Previous</button>
        <button @click="changePage(page + 1)" :disabled="page >= totalPages">Next</button>
      </div>
  
      <p>Total Results: {{ totalResults }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter, useFetch } from '#app'
  
  const route = useRoute()
  const router = useRouter()
  
  const searchQuery = ref(route.query.q || '')
  const page = ref(parseInt(route.query.page) || 1)
  const pageSize = ref(10)
  const sortBy = ref(route.query.sortBy || 'createdAt')
  const sortOrder = ref(route.query.sortOrder || 'desc')
  const filters = ref({
    category: route.query.filters?.category || '',
    published: route.query.filters?.published || ''
  })
  
  const results = ref([])
  const totalPages = ref(1)
  const totalResults = ref(0)
  
  const fetchResults = async () => {
    const { data } = await useFetch('/api/search', {
      params: {
        search: searchQuery.value,
        page: page.value,
        pageSize: pageSize.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
        filters: JSON.stringify(filters.value),
      },
    })
  
    results.value = data.value.results
    totalPages.value = data.value.totalPages
    totalResults.value = data.value.totalResults
  }
  
  const changePage = (newPage) => {
    page.value = newPage
    fetchResults()
    router.push({
      path: '/search',
      query: {
        q: searchQuery.value,
        page: page.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
        filters: JSON.stringify(filters.value),
      },
    })
  }
  
  onMounted(fetchResults)

/*import config from '~/composables/search/elasticsearchConnect'

    const searchkitClient = new Searchkit(config)
    const searchClient = Client(searchkitClient);*/
</script>

<style>
    .search-panel {
        display: flex;
    }

    .search-panel__filters {
        flex: 1;
    }

    .search-panel__results {
        flex: 3;
    }

    .searchbox {
        margin-bottom: 2rem;
    }

    .pagination {
        margin: 2rem auto;
        text-align: center;
    }
</style>