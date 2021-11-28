# Spotify App

App to display recently played Spotify tracks with artsist filter.

## Tech 
- Vite
- Vue 3
- Tailwind - JIT mode
- @vueuse/core

## Running loclly
```
npm i && npm run dev
```

## Follow up Work
- Add Unit Tests
  - Jest integration included, not tests.
    - It would be worth testing the computed properties in the `useSpotifyApi` composable.
    - This will require mocking the Spotify endpoints and ensuring edge cases with artists return the correct format.
- Better component Structure
  - Furher abstractions on components could be made