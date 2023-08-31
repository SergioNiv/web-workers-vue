<template>
  <div>
    <h1>Cats List</h1>
    <section class="cats-container">
      <div class="cat">
        <p>With web worker</p>
        <b-button variant="primary" @click="wwGetKitten">Show Cats</b-button>
        <div>
          <img v-for="images in wwKittenImage" 
               :key="images.id" 
               :src="images.url" 
               :alt="images.id"/>
        </div>
        <b-overlay no-wrap :show="wwLoadingCat"/>
      </div>
    </section>
  </div>
</template>

<script>
import { wwFetchKitten } from '../workers/utils.worker'

export default {
  name: 'CatsList',
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
      this.wwKittenImage = await wwFetchKitten(true)
      this.wwLoadingCat = false
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
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: relative;
}
.cat button {
  margin-bottom: 10px;
}
.cat img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  padding: 10px
}
</style>

