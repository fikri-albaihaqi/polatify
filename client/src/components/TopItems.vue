<script setup>
import { onMounted, reactive, watch } from "vue";
import {
  getUserTopTracks,
  getUserTopArtists,
  downloadImage,
} from "../spotify/index.js";
import Polaroid from "./Polaroid.vue";
import Loader from './Loader.vue'

const data = reactive({
  userTopItems: [],
  type: 'track',
  range: 'short_term',
})

async function getTopTracks(range) {
  return (await getUserTopTracks(range)).data.items;
}

async function getTopArtists(range) {
  return (await getUserTopArtists(range)).data.items;
}

function exportAsImage(imageName) {
  downloadImage(imageName);
}

watch(
  () => [data.type, data.range],
  async ([newType, newRange]) => {
    if (newType === 'track') {
      data.userTopItems = [];
      data.userTopItems = await getTopTracks(newRange);
    } else if (newType === 'artist') {
      data.userTopItems = [];
      data.userTopItems = await getTopArtists(newRange);
    }
  }
);

onMounted(async () => {
  data.userTopItems = await getTopTracks();
});
</script>

<template>
  <div class="font-poppins">
    <div class="w-[95vw] md:w-[70vw] m-auto mt-16">
      <h2 class="text-center font-bold">Top Tracks</h2>
      <div class="grid grid-cols-3 my-2 text-sm">
        <button @click="(data.type = 'track', data.range = 'short_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'short_term' && data.type === 'track'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">
          Last Month
        </button>

        <button @click="(data.type = 'track', data.range = 'medium_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'medium_term' && data.type === 'track'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">Last 6 Months</button>

        <button @click="(data.type = 'track', data.range = 'long_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'long_term' && data.type === 'track'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">All Time</button>
      </div>

      <h2 class="text-center mt-6 mb-2 font-bold">Top Artists</h2>
      <div class="grid grid-cols-3 text-sm mb-8">
        <button @click="(data.type = 'artist', data.range = 'short_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'short_term' && data.type === 'artist'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">Last Month</button>

        <button @click="(data.type = 'artist', data.range = 'medium_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'medium_term' && data.type === 'artist'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">Last 6 Months</button>

        <button @click="(data.type = 'artist', data.range = 'long_term')" :class="[
          'rounded-full',
          'px-2',
          'py-2',
          'font-medium',
          'hover:bg-secondary-shade',
          'mx-2',
          data.range === 'long_term' && data.type === 'artist'
            ? ['bg-primary', 'text-white', 'hover:bg-primary-shade']
            : 'bg-secondary',
        ]">All Time</button>
      </div>
    </div>

    <div class="polaroid mb-8 mt-16">
      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'short_term' && data.type === 'track'">
        Last Month Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'medium_term' && data.type === 'track'">
        Last 6 Month Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'long_term' && data.type === 'track'">
        All Time Top Tracks
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'short_term' && data.type === 'artist'">
        Last Month Top Artists
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'medium_term' && data.type === 'artist'">
        Last 6 Month Top Artists
      </h1>

      <h1 class="
          text-center text-primary
          font-righteous font-bold
          text-2xl
          lg:text-4xl
          mb-8
        " v-if="data.range === 'long_term' && data.type === 'artist'">
        All Time Top Artists
      </h1>

      <Loader v-if="data.userTopItems.length === 0" />

      <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
        <Polaroid v-for="item in data.userTopItems" :item="item" :type="data.type" />
      </div>
    </div>

    <div class="flex justify-center">
      <button @click="exportAsImage('polaroid')" :class="[
        'rounded-full',
        'bg-secondary',
        'px-8',
        'py-2',
        'font-medium',
        'hover:bg-secondary-shade',
        'text-white',
        'mt-16',
      ]">Download Image</button>
    </div>
  </div>
</template>