<template>
  <div class="flex h-screen w-screen">
    <div class="md:w-64 bg-white shadow sticky top-0">
      <Sidebar />
    </div>
    <div class="flex-1 overflow-auto">
      <Content />
    </div>
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
  },
};

</script>