<template>
  <div class="p-2 bg-gray-50 rounded shadow">
    <div class="truncate font-medium text-lg mb-2">
      {{ track.name }}
    </div>
    <div>
      <img class="rounded" :src="track.album.images[0].url" />
    </div>
    <div>{{ track.artists.map(({ name }) => name).join(', ') }}</div>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
};
</script>
