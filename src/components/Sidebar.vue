<template>
  <div class="h-full flex flex-col justify-between">
    Sidebar
    <button
      v-if="!user"
      @click="authenticate"
      class="text-white bg-green-600 px-4 py-4 rounded m-4"
    >
      Connect with Spotify
    </button>
    <div v-else class="m-4 text-center">
      {{ user.display_name }}
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  setup() {
    const { user, authenticate } = inject('spotifyApi');

    return {
      user,
      authenticate,
    }
  },
};
</script>
