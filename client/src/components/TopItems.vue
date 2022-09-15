<script>
import {
  getUserTopTracksShort,
  getUserTopTracksMedium,
  getUserTopTracksLong,
  getUserTopArtistsShort,
  getUserTopArtistsMedium,
  getUserTopArtistsLong,
} from "../spotify/index.js";
import Button from "./Button.vue";
import Polaroid from "./Polaroid.vue";

export default {
  name: "TopItems",
  components: { Button, Polaroid },
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
  <div class="font-poppins">
    <h2 class="lg:hidden text-center font-medium">Top Tracks</h2>
    <div class="lg:hidden grid grid-cols-3 my-2 text-sm">
      <Button
        @click="category = 'Last Month Top Tracks'"
        :text="'Last Month'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'Last Month Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />

      <Button
        @click="category = 'Last 6 Month Top Tracks'"
        :text="'Last 6 Month'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'Last 6 Month Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />

      <Button
        @click="category = 'All Time Top Tracks'"
        :text="'All Time'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'All Time Top Tracks'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />
    </div>

    <h2 class="lg:hidden text-center mt-6 mb-2 font-medium">Top Artists</h2>
    <div class="lg:hidden grid grid-cols-3 text-sm mb-8">
      <Button
        @click="category = 'Last Month Top Artists'"
        :text="'Last Month'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'Last Month Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />

      <Button
        @click="category = 'Last 6 Month Top Artists'"
        :text="'Last 6 Month'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'Last 6 Month Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />

      <Button
        @click="category = 'All Time Top Artists'"
        :text="'All Time'"
        :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          category == 'All Time Top Artists'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]"
      />
    </div>

    <!-- Large screen -->
    <div class="hidden lg:grid grid-cols-3 my-8">
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
      />

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
      />

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
      />

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
      />

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
      />

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
      />
    </div>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'Last Month Top Tracks'"
    >
      Last Month Top Tracks
    </h1>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'Last 6 Month Top Tracks'"
    >
      Last 6 Month Top Tracks
    </h1>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'All Time Top Tracks'"
    >
      All Time Top Tracks
    </h1>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'Last Month Top Artists'"
    >
      Last Month Top Artists
    </h1>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'Last 6 Month Top Artists'"
    >
      Last 6 Month Top Artists
    </h1>

    <h1
      class="
        text-center text-primary
        font-righteous font-bold
        text-2xl
        lg:text-4xl
        mb-8
        mt-16
      "
      v-if="category == 'All Time Top Artists'"
    >
      All Time Top Artists
    </h1>

    <h1
      class="
        text-center text-primary
        font-poppins font-bold
        text-xl
        mb-8
        mt-16
      "
      v-if="userTopItems.length === 0"
    >
      Not enough data to process
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
      <Polaroid
        v-if="category == 'Last Month Top Tracks'"
        v-for="item in userTopItems"
        :track="item"
      />

      <Polaroid
        v-else-if="category == 'Last 6 Month Top Tracks'"
        v-for="item in userTopItems"
        :track="item"
      />

      <Polaroid
        v-else-if="category == 'All Time Top Tracks'"
        v-for="item in userTopItems"
        :track="item"
      />

      <Polaroid
        v-else-if="category == 'Last Month Top Artists'"
        v-for="item in userTopItems"
        :artist="item"
      />

      <Polaroid
        v-else-if="category == 'Last 6 Month Top Artists'"
        v-for="item in userTopItems"
        :artist="item"
      />

      <Polaroid
        v-else-if="category == 'All Time Top Artists'"
        v-for="item in userTopItems"
        :artist="item"
      />
    </div>
  </div>
</template>