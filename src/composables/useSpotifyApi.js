import { ref, watch } from 'vue';
import useSpotifyAuth from './useSpotifyAuth';

export default () => {
  const { authenticate, accessToken } = useSpotifyAuth();

  async function fetchApi(url) {
    const resp = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });
    return resp.json();
  }

  const user = ref(null);

  watch(accessToken, async (_accessToken) => {
    if (_accessToken) {
      user.value = await fetchApi('https://api.spotify.com/v1/me');
    }
  }, { immediate: true });

  return {
    authenticate,
    fetchApi,
    user,
  }
}