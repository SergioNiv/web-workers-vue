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
      wwFetchKitten().then((response) => {
        this.wwKittenImage = response
        this.$bvModal.msgBoxOk('Data was obtained correctly with web workers.', {
          title: 'Successfully',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }).catch((e) => {
        const errorMessage = e.message ? e.message : 'Error loading data.'
        this.$bvModal.msgBoxOk(`${errorMessage} Please try again.`, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }).finally(() => this.wwLoadingCat = false)
      
    },
    async getKitten() {
      this.loadingCat = true
      fetchKitten().then((response) => {
        this.kittenImage = response
        this.$bvModal.msgBoxOk('Data was successfully fetched.', {
          title: 'Successfully',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }).catch((e) => {
        const errorMessage = e.message ? e.message : 'Error loading data.'
        this.$bvModal.msgBoxOk(`${errorMessage} Please try again.`, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }).finally(() => this.loadingCat = false)
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

