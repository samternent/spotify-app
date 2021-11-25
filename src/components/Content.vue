<template>
  <div>
    <h1 class="text-3xl">Recently Played</h1>
    <ul class="grid md:grid-cols-3">
      <li v-for="item in recentlyPlayed" :key="item.track.id" class="my-4">
        <div class="truncate">
          {{ item.track.name }}
        </div>
        <div>
          <img :src="item.track.album.images[0].url" />
        </div>
        <ul>
          <li
            v-for="artist in item.track.artists"
            :key="artist.id"
          >
            {{ artist.name }}
          </li>
        </ul>
      </li>
    </ul>

    <button @click="fetchItems">Load More</button>
  </div>
</template>
<script>
import { ref, reactive, inject } from 'vue';

export default {
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
