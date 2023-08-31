<template>
  <div>
    <h1>CATS</h1>
    <section class="cats-container">
      <div class="cat">
        <p>Without web worker</p>
        <b-button variant="primary" @click="getKitten">Show Cat</b-button>
        <img :src="kittenImage" alt="cat" v-if="kittenImage" />
        <b-overlay no-wrap :show="loadingCat"/>
      </div>
      <div class="cat">
        <p>With web worker</p>
        <b-button variant="primary" @click="wwGetKitten">Show Cat</b-button>
        <img :src="wwKittenImage" alt="cat" v-if="wwKittenImage" />
        <b-overlay no-wrap :show="wwLoadingCat"/>
      </div>
    </section>
  </div>
</template>

<script>
import { wwFetchKitten } from '@/workers/utils.worker.js'
import { fetchKitten } from '@/utils/utils'

export default {
  name: '',
  data() {
    return {
      kittenImage: '',
      wwKittenImage: '',
      loadingCat: false,
      wwLoadingCat: false,
    };
  },
  methods: {
    async wwGetKitten() {
      this.wwLoadingCat = true
      this.wwKittenImage = await wwFetchKitten()
      this.wwLoadingCat = false
    },
    async getKitten() {
      this.loadingCat = true
      console.log('Without web worker');
      this.kittenImage = await fetchKitten()
      console.log('resolved Without web worker');
      this.loadingCat = false
    }
  }
}
</script>

<style scoped>
.cats-container {
  display: flex;
  width: 100%;
}
.cat {
  width: 50%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: relative;
}
.cat button {
  max-width: 100px;
  margin-bottom: 10px;
}
.cat img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}
</style>

