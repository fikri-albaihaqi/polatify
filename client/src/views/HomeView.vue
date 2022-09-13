<script>
import Button from "../components/Button.vue";
import TopItems from "../components/TopItems.vue";
import Footer from "../components/Footer.vue";

import {
  logout,
  getUserProfile,
  getUserPlaylists,
  getUserFollowedArtists,
} from "../spotify/index.js";

export default {
  name: "Home",
  methods: {
    signout() {
      logout();
    },
    async getProfile() {
      return (await getUserProfile()).data;
    },
    async getPlaylists() {
      return (await getUserPlaylists()).data;
    },
    async getFollowedArtists() {
      return (await getUserFollowedArtists()).data;
    },
  },
  components: {
    Button,
    TopItems,
    Footer,
  },
  async created() {
    (this.userProfile = await this.getProfile()),
      (this.userPlaylists = await this.getPlaylists()),
      (this.userFollowedArtists = await this.getFollowedArtists());
  },
  data() {
    return {
      userProfile: [],
      userPlaylists: [],
      userFollowedArtists: [],
    };
  },
};
</script>

<template>
  <div>
    <header class="flex flex-col items-center mt-4">
      <img class="w-[50%] md:w-[35%] lg:w-[20%]" src="../assets/logo.svg" alt="" />
    </header>
    <div class="container flex flex-col items-center py-16 m-auto">
      <img class="rounded-full w-36" :src="userProfile.images[0].url" alt="" />
      <h1 class="text-3xl font-bold font-poppins mt-8">
        {{ userProfile.display_name }}
      </h1>
      <div class="flex justify-center lg:w-1/3 font-poppins text-center">
        <div class="flex flex-col items-center w-1/3 m-4">
          <h2>Playlist</h2>
          <h2 class="font-bold text-primary">{{ userPlaylists.total }}</h2>
        </div>
        <div class="flex flex-col items-center w-1/3 m-4">
          <h2>Followers</h2>
          <h2 class="font-bold text-primary">
            {{ userProfile.followers.total }}
          </h2>
        </div>
        <div class="flex flex-col items-center w-1/3 m-4">
          <h2>Followed Artists</h2>
          <h2 class="font-bold text-primary">
            {{ userFollowedArtists.artists.total }}
          </h2>
        </div>
      </div>

      <TopItems/>

      <a href="">
        <Button
          @click="signout"
          :text="'Logout'"
          :class="[
            'rounded-full',
            'bg-primary',
            'px-8',
            'py-2',
            'font-medium',
            'hover:bg-secondary-shade',
            'text-white',
            'mt-16',
          ]"
        />
      </a>
    </div>
    <Footer/>
  </div>
</template>
