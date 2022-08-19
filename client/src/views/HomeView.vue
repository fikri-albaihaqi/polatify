<script>
import Button from '../components/Button.vue';
import { logout, getUserProfile, getUserPlaylists, getUserFollowedArtists } from '../spotify/index.js';

export default {
  name: 'Home',
  methods: {
    signout() {
      logout()
    },
    async getProfile() {
      this.userProfile = (await getUserProfile()).data
    },
    async getUserPlaylists() {
      this.userPlaylists = (await getUserPlaylists()).data
    },
    async getUserFollowedArtists() {
      this.userFollowedArtists = (await getUserFollowedArtists()).data
    }
  },
  components: {
    Button,
  },
  beforeMount() {
    this.getProfile(),
    this.getUserPlaylists(),
    this.getUserFollowedArtists()
  },
  data() {
    return {
      userProfile: [],
      userPlaylists: [],
      userFollowedArtists: []
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <img class="rounded-full w-36" :src="userProfile.images[0].url" alt="">
    <h1 class="text-3xl font-bold font-poppins mt-8">{{userProfile.display_name}}</h1>
    <div class="flex justify-center w-1/3 font-poppins text-center">
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Playlist</h2>
        <h2 class="font-bold text-primary">{{userPlaylists.total}}</h2>
      </div>
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Followers</h2>
        <h2 class="font-bold text-primary">{{ userProfile.followers.total }}</h2>
      </div>
      <div class="flex flex-col items-center w-1/3 m-4">
        <h2>Followed Artists</h2>
        <h2 class="font-bold text-primary">{{userFollowedArtists.artists.total}}</h2>
      </div>
    </div>
    <a href="http://127.0.0.1:5173/">
      <Button 
      @click="signout"
      :text="'LOGOUT'" 
      :class="['rounded-full', 'bg-secondary', 'px-8', 'py-2', 'font-medium', 'hover:bg-secondary-shade']">
    </Button>
    </a>
  </div>
</template>
