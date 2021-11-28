<template>
  <div class="h-full flex flex-col justify-between max-h-screen">
    <p class="text-xl my-2 text-center">
      Recently Played Artists
    </p>
    <ul class="flex-1 overflow-auto py-2 px-4">
      <li
        v-for="item in recentlyPlayedArtists"
        :key="item.id"
      >
        <button
          class="py-1 px-4 my-1 rounded-full"
          :class="filterArtist?.id === item.id ? 'bg-green-100' : 'bg-gray-50'"
          @click="filterArtists(item)"
        >
          {{ item.name }}
        </button>
      </li>
    </ul>
    <div class="m-4 text-center">
      {{ user.display_name }}
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  setup() {
    const {
      user,
      recentlyPlayedArtists,
      filterArtists,
      filterArtist,
    } = inject('spotifyApi');

    return {
      user,
      recentlyPlayedArtists,
      filterArtists,
      filterArtist,
    }
  },
};
</script>
