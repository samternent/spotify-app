import { ref, reactive, watch, computed } from 'vue';
import useSpotifyAuth from './useSpotifyAuth';

export default () => {
  const { authenticate, accessToken } = useSpotifyAuth();
  const filterArtist = ref(JSON.parse(localStorage.getItem('artistFilter')));

  async function fetchApi(url) {
    const resp = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });
    return resp.json();
  }

  const user = ref(null);
  const recentlyPlayedItemsRaw = reactive([]);

  watch(accessToken, async (_accessToken) => {
    if (_accessToken) {
      const resp = await fetchApi('https://api.spotify.com/v1/me');
      if (!resp.error) {
        user.value = resp;
      }
    }
  }, { immediate: true });

  const recentlyPlayedItemsUrl = ref('https://api.spotify.com/v1/me/player/recently-played');
  
  async function fetchRecentlyPlayedItems() {
    if (!recentlyPlayedItemsUrl.value) return;

      const { items, next } = await fetchApi(recentlyPlayedItemsUrl.value);
      recentlyPlayedItemsUrl.value = next;
      recentlyPlayedItemsRaw.push(...items);
  }

  function filterArtists(artist) {
    filterArtist.value = artist;
    localStorage.setItem('artistFilter', JSON.stringify(artist));
  }

  const recentlyPlayedItems = computed(() => 
    filterArtist.value
    ? recentlyPlayedItemsRaw.filter(({ track }) =>
      track.artists[0].id === filterArtist.value.id,
    )
    : recentlyPlayedItemsRaw,
  );

  const recentlyPlayedArtists = computed(() => {
    const artists = recentlyPlayedItemsRaw.reduce((acc, { track }) => ({
      ...acc,
      [track.artists[0].id]: track.artists[0]
    }), {});

    return Object.values(artists).map((artist) => artist);
  });

  return {
    authenticate,
    fetchRecentlyPlayedItems,
    recentlyPlayedArtists,
    recentlyPlayedItems,
    filterArtists,
    filterArtist,
    user,
  }
}