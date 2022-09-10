<script>
export default {
  name: "Polaroid",
  props: {
    track: Object,
    artist: Object,
  },
};
</script>
  
  <template>
  <div v-if="track != null" class="bg-white w-[170px] h-[217px] md:w-[140px] md:h-[178px] xl:w-[220px] xl:h-[281px] m-2 p-2">
    <div
      class="h-[154px] md:h-[127px] xl:h-[200px]"
      :style="{
        backgroundImage: 'url(' + track.album.images[0].url + ')',
        backgroundSize: 'cover',
      }"
    ></div>
    <div class="h-[55px] md:h-[45px] xl:h-[64px] flex flex-col justify-center font-shadow font-bold text-center text-xs md:text-[10px] xl:text-base">
      <h1>
        {{ track.name }} - {{ track.artists[0].name }}
      </h1>
    </div>
  </div>

  <div v-else-if="artist != null" class="bg-white w-[170px] h-[217px] md:w-[140px] md:h-[178px] xl:w-[220px] xl:h-[281px] m-2 p-2">
    <div
      class="h-[154px] md:h-[127px] xl:h-[200px]"
      :style="{
        backgroundImage: 'url(' + artist.images[0].url + ')',
        backgroundSize: 'cover',
      }"
    ></div>
    <div class="h-[55px] md:h-[45px] xl:h-[64px] flex flex-col justify-center font-shadow font-bold text-center text-xs md:text-[10px] xl:text-base">
      <h1>{{ artist.name }}</h1>
    </div>
  </div>
</template>

  <style>
@import url("https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap");
</style>