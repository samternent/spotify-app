<template>
  <div class="flex h-screen w-screen" v-if="user">
    <div class="md:w-64 bg-white sticky top-0">
      <Sidebar />
    </div>
    <div class="flex-1 overflow-auto">
      <Content />
    </div>
  </div>
  <div class="flex h-screen w-screen justify-center items-center" v-else>
    <button
      v-if="!user"
      @click="authenticate"
      class="text-white bg-green-600 px-4 py-4 rounded m-4"
    >
      Connect with Spotify
    </button>
  </div>
</template>

<script>
import { provide } from 'vue';

import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';

import useSpotifyApi from './composables/useSpotifyApi';

export default {
  name: 'App',
  components: {
    Sidebar,
    Content,
  },
  setup() {
    const spotifyApi = useSpotifyApi();

    provide('spotifyApi', spotifyApi);

    return {
      ...spotifyApi,
    }
  },
};

</script>