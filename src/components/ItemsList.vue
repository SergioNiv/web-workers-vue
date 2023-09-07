<template>
  <div class="container">
    <h1>Upload Video</h1>
    <section class="upload-container">
      <b-form-file type="file" ref="myfile" placeholder="No video chosen"/>
      <b-button variant="success mt-2" @click="upload">Upload</b-button>
    </section>
    <section class="cats-container">
      <div class="cat">
        <p>With web worker</p>
        <p>maximum of 5 GB, exceeding the amount can delete videos.</p>
        <b-button variant="primary" @click="getVideos">Get Videos</b-button>
        <div class="grid">
          <Item v-for="(item, idx) in list"
                :key="idx"
                :path="item._location.path_"
                @loading-delete-video="wwLoadingCat = true"
                @on-delete-video="onDeleteVideo"/>
        </div>
      </div>
    </section>
    <b-overlay no-wrap :show="wwLoadingCat"/>
  </div>
</template>

<script>
import { wwUpload } from '../workers/utils.worker'
import { getStorage, listAll , ref } from "firebase/storage"
import Item from './Item.vue'

export default {
  name: 'ItemsList',
  components: {
    Item
  },
  data() {
    const storageFirebase = getStorage()
    return {
      kittenImage: '',
      wwKittenImage: '',
      loadingCat: false,
      wwLoadingCat: false,
      storageFirebase,
      list: []
    };
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    async getVideos() {
      this.wwLoadingCat = true
      const listRef = ref(this.storageFirebase, 'folder/')

      listAll(listRef)
        .then((res) => {
          console.log(res, 'res');
          this.list = res.items
        }).catch((error) => {
          console.log(error, 'error')
        }).finally(() => this.wwLoadingCat = false)
    },
    upload() {
      this.wwLoadingCat = true
      wwUpload(this.$refs.myfile.files[0]).then((snap)=> {
        console.log(snap, 'snap');
        this.$bvModal.msgBoxOk('Video uploaded successfully.', {
          title: 'Successfully',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(() => {
          this.getVideos()
          this.$refs.myfile.reset()
        })
      }).catch((e) => {
        console.log(e, 'error');
        const errorMessage = e.message ? e.message : 'Uh-oh, an error occurred!'
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
    onDeleteVideo() {
      this.getVideos()
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
.upload-container {
  width: 100%;
  max-width: 500px;
  margin: auto
}
.cats-container {
  display: flex;
  width: 100%;
}
.grid {
  display: flex;
  flex-wrap: wrap;
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

