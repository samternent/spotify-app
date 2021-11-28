// This logic is mostly taken from Spotify Docs
import { ref } from 'vue';

const client_id = '34bc1dd5df3042d4aaec71f15c9eb6c3';
const redirect_uri = 'http://localhost:3000';
const scope = 'user-read-currently-playing user-read-recently-played'

export default () => {
  let state = localStorage.getItem('stateKey');
  const accessToken = ref(sessionStorage.getItem('accessToken'));

  if (!state) {
    state = crypto.randomUUID();
    localStorage.setItem('stateKey', state);
  }

  async function checkAuthentication() {
    const urlSearchParams = new URLSearchParams(window.location.hash.replace("#","?"));
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.access_token && state === params.state) {
      state = localStorage.getItem('stateKey');
      sessionStorage.setItem('accessToken', params.access_token);
      accessToken.value = params.access_token;
      history.pushState("", document.title, `${window.location.pathname}${window.location.search}`);
    }
  }

  function authenticate() {
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.replace(url);
  }

  checkAuthentication();

  return {
    authenticate,
    accessToken,
  }
}