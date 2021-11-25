<template>
  <div class="flex flex-col">
    <header class="sticky top-0 bg-white shadow p-2">
      <h1 class="text-3xl">Recently Played Tracks</h1>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Track
        v-for="item in recentlyPlayed"
        :key="item.track.id"
        :track="item.track"
      />
    </div>

    <button @click="fetchItems" class="block my-4 rounded bg-gray-100 py-2 mx-2">Load More</button>
  </div>
</template>
<script>
import { ref, reactive, inject } from 'vue';
import Track from './Track.vue';

export default {
  components: {
    Track,
  },
  setup() {
    const recentlyPlayed = reactive([]);
    const { fetchApi } = inject('spotifyApi');
    const fetchUrl = ref('https://api.spotify.com/v1/me/player/recently-played')

    async function fetchItems() {
      if (!fetchUrl.value) return;

      const { items, next } = await fetchApi(fetchUrl.value);
      fetchUrl.value = next;
      recentlyPlayed.push(...items);
    }

    fetchItems();

    return {
      recentlyPlayed,
      fetchItems,
    };
  },
}
</script>
