
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import 'dotenv';

export default {
  data() {
    return {
      searchClient: instantMeiliSearch(
        process.env.MEILISEARCH_HOST,
        process.env.MEILISEARCH_SEARCH_API_KEY,
      ).searchClient,
    };
  },
};
