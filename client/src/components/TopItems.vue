<script>
import Track from "./Track.vue";
import {
  getUserTopTracksShort,
  getUserTopTracksMedium,
  getUserTopTracksLong,
  getUserTopArtistsShort,
  getUserTopArtistsMedium,
  getUserTopArtistsLong,
} from "../spotify/index.js";
import Button from "./Button.vue";
import Artist from "./Artist.vue";

export default {
  name: "TopItems",
  components: { Track, Button, Artist },
  data() {
    return {
      userTopItems: [],
      category: "Last Month Top Tracks",
    };
  },
  watch: {
    async category(newCategory) {
      if (newCategory === "Last Month Top Tracks") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopTracksShort();
      } else if (newCategory === "Last 6 Month Top Tracks") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopTracksMedium();
      } else if (newCategory === "All Time Top Tracks") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopTracksLong();
      } else if (newCategory === "Last Month Top Artists") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopArtistsShort();
      } else if (newCategory === "Last 6 Month Top Artists") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopArtistsMedium();
      } else if (newCategory === "All Time Top Artists") {
        this.userTopItems = [];
        this.userTopItems = await this.getTopArtistsLong();
      }
    },
  },
  methods: {
    async getTopTracksShort() {
      return (await getUserTopTracksShort()).data.items;
    },
    async getTopTracksMedium() {
      return (await getUserTopTracksMedium()).data.items;
    },
    async getTopTracksLong() {
      return (await getUserTopTracksLong()).data.items;
    },
    async getTopArtistsShort() {
      return (await getUserTopArtistsShort()).data.items;
    },
    async getTopArtistsMedium() {
      return (await getUserTopArtistsMedium()).data.items;
    },
    async getTopArtistsLong() {
      return (await getUserTopArtistsLong()).data.items;
    },
  },
  async created() {
    this.userTopItems = await this.getTopTracksShort();
  },
};
</script>

<template>
  <div>
    <div class="grid grid-cols-3 my-8">
      <Button
        @click="category = 'Last Month Top Tracks'"
        :text="'Last Month Top Tracks'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          'my-4',
          category == 'Last Month Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>

      <Button
        @click="category = 'Last 6 Month Top Tracks'"
        :text="'Last 6 Month Top Tracks'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          'my-4',
          category == 'Last 6 Month Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>

      <Button
        @click="category = 'All Time Top Tracks'"
        :text="'All Time Top Tracks'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          'my-4',
          category == 'All Time Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>

      <Button
        @click="category = 'Last Month Top Artists'"
        :text="'Last Month Top Artists'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          category == 'Last Month Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>

      <Button
        @click="category = 'Last 6 Month Top Artists'"
        :text="'Last 6 Month Top Artists'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          category == 'Last 6 Month Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>

      <Button
        @click="category = 'All Time Top Artists'"
        :text="'All Time Top Artists'"
        :class="[
          'rounded-full',
          'px-8',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-4',
          category == 'All Time Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      >
      </Button>
    </div>

    <Track
      v-if="category == 'Last Month Top Tracks'"
      v-for="item in userTopItems"
      :track="item"
    ></Track>

    <Track
      v-else-if="category == 'Last 6 Month Top Tracks'"
      v-for="item in userTopItems"
      :track="item"
    ></Track>

    <Track
      v-else-if="category == 'All Time Top Tracks'"
      v-for="item in userTopItems"
      :track="item"
    ></Track>

    <Artist
      v-else-if="category == 'Last Month Top Artists'"
      v-for="item in userTopItems"
      :artist="item"
    ></Artist>

    <Artist
      v-else-if="category == 'Last 6 Month Top Artists'"
      v-for="item in userTopItems"
      :artist="item"
    ></Artist>

    <Artist
      v-else-if="category == 'All Time Top Artists'"
      v-for="item in userTopItems"
      :artist="item"
    ></Artist>
  </div>
</template>