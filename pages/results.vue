<template>
    <div>
        <ais-instant-search :search-client="searchClient" index-name="meeovi">
            <ais-configure :hits-per-page.camel="8" />
            <div class="search-panel">
                <div class="search-panel__filters">
                    <ais-panel>
                        <template v-slot:header>type</template>
                        <ais-refinement-list attribute="type" />
                    </ais-panel>

                    <ais-panel>
                        <template v-slot:header>actors</template>
                        <ais-refinement-list searchable attribute="actors" />
                    </ais-panel>
                </div>

                <div class="search-panel__results">
                    <div class="searchbox">
                        <ais-search-box placeholder="" />
                    </div>
                    <ais-hits>
                        <template v-slot:item="{ item, index }">
                            <article>
                                <h1>
                                    <ais-highlight attribute="title" :hit="item" />
                                </h1>
                                <p>
                                    <ais-snippet :hit="item" attribute="plot" />
                                </p>
                            </article>
                        </template>
                    </ais-hits>

                    <div class="pagination">
                        <ais-pagination />
                    </div>
                </div>
            </div>
        </ais-instant-search>
    </div>
</template>

<script setup>
import config from '~/composables/search/elasticsearchConnect'

    const searchkitClient = new Searchkit(config)
    const searchClient = Client(searchkitClient);
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