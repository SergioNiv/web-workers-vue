<template>
  <div class="container">
    <video :src="url" alt="" controls/>
    <b-button variant="danger" class="button" @click="onDelete">Delete</b-button>
  </div>
</template>
<script>
import { storage } from '../firebase';
import { wwOnDelete } from '../workers/utils.worker'
import { ref, getDownloadURL, getStorage } from 'firebase/storage';

export default {
  props: {
    path: String,
  },
  data: () => {
    const storage = getStorage()
    return {
      url: 'https://via.placeholder.com/140x100',
      storage
    };
  },
  mounted() {
    this.getUrl()
  },
  methods: {
    onDelete() {
      this.$emit('loading-delete-video')
      wwOnDelete(this.path).then(() => {
        this.$bvModal.msgBoxOk('Video deleted successfully.', {
          title: 'Successfully',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(() => this.$emit('on-delete-video'))
      }).catch((e) => {
        const errorMessage = e.message ? e.message : 'Uh-oh, an error occurred!'
        this.$bvModal.msgBoxOk(`${errorMessage} Please try again.`, {
          title: 'Error',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0 mx-auto',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(() => this.$emit('on-delete-video'))
      })
    },
    getUrl() {
      getDownloadURL(ref(storage, this.path)).then((download_url) => {
        this.url = download_url
        }
      )
    }
  },
  watch: {
    path() {
      this.getUrl()
    }
  }
};
</script>
<style scoped>
.container {
  width: 350px;
}
video {
  width: 350px;
  height: 300px;
  object-fit: cover;
  padding: 10px
}
.button {
  position: relative;
  bottom: 10px;
  left: 20px
}
</style>