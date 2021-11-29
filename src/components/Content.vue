<template>
  <div class="flex flex-col">
    <header class="sticky top-0 bg-white p-2 flex items-center">
      <h1 class="text-3xl">Recently Played Tracks</h1>
      <span
        v-if="filterArtist"
        class="bg-gray-100 rounded-full mx-2 pl-4 pr-2 py-1 flex items-center"
      >
        {{ filterArtist.name }}
        <button v-if="filterArtist" @click="filterArtists(null)">
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </span>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Track
        v-for="(item, i) in recentlyPlayedItems"
        :key="`${i}_${item.track.id}`"
        :track="item.track"
      />
    </div>

    <div ref="loadMoreEl" class="h-2" />
  </div>
</template>
<script>
import { ref, inject } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'
import Track from './Track.vue';

export default {
  components: {
    Track,
  },
  setup() {
    const {
      fetchRecentlyPlayedItems,
      recentlyPlayedItems,
      filterArtist,
      filterArtists,
    } = inject('spotifyApi');
    
    const loadMoreEl = ref(null);

    useIntersectionObserver(
      loadMoreEl,
      ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          fetchRecentlyPlayedItems();
        }
      },
    )

    return {
      recentlyPlayedItems,
      loadMoreEl,
      filterArtist,
      filterArtists,
    };
  },
}
</script>
