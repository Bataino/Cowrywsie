<script setup>

import { Icon } from "@iconify/vue"

</script>

<template>
  <div>
    <div class="blg pt-5" style="max-height: 300px;">
      <div class="w-100 container">
        <div class="rounded-5 my-5 bg-white d-flex shadow-sm align-items-center">
          <icon icon="bi:search" class="fs-6 mx-3 ms-4 text-muted" />
          <input v-model="search" class="w-100 py-4 border-0 shadow-0 form-control bg-transparent text-dark"
            placeholder="Search for Photo" />
        </div>
      </div>
      <div class="container-lg px-5" v-if="isLoading">
        <div class="row justify-content-center justify-content-sm-start ">
          <div v-for="photogrid in formattedPhotos(Array(9))"
            class="col-12 col-sm-6 col-md-4 my-0 py-0">
            <div class="mx-3 mb-5 placeholder-glow" v-for="img in photogrid">
              <div class="position-relative rounded-10 placeholder blg shadow my-3 mx-auto w-100" style="min-width:220px;width: fit-content;min-height: 370px;" >
                <div class="position-absolute p-3 mb-2 fixed-bottom text-light">
                  <div class="w-100 me-3 placeholder rounded-0 bg-tertiary placeholder-lg" style="height: 25px;"></div>
                  <div class="w-50 me-3 placeholder rounded-0 bg-tertiary placeholder-lg mt-2" style="height: 15px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 pt-5" v-else-if="!isLoading && photos.length == 0">
        <div class="p-5 m-5 text-center">
            <icon icon="hugeicons:sad-02" width="100" class="fs-1 text-muted"/>
            <div class="pt-2 h3 fst-italic text-muted">Sorry, We could not find that</div>
        </div>
      </div>
      <div class="container-lg px-5" v-else>
        <div class="row justify-content-center justify-content-sm-start ">
          <div v-for="photogrid in formattedPhotos()" class="col-12 col-sm-6 col-md-4 my-0 py-0">
            <div class="mx-3 mb-5" v-for="img in photogrid">
              <div class="position-relative shadow my-3 mx-auto" style="max-width:100%; width: fit-content;">
                <img class="w-100 rounded-10" :src="img.urls.regular" />
                <div class="position-absolute p-3 fixed-bottom text-light">
                  <b class="fs-4">{{ `${img.user.name}` }}</b><br>
                  <small>{{ `${img.user.location ?? ''}` }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>

import { randomUrl, searchUrl, accessKey } from './services/unsplash'
import axios from 'axios'

export default {
  data() {
    return {
      photos: [],
      search: '',
      isLoading: true
    }
  },
  methods: {
    formattedPhotos(pics = this.photos) {
      let photos = [...pics]
      let photoSlide = 3
      if (window.screen.width > 567 && window.screen.width < 768) {
        photoSlide = 2
      }
      const delim = photos.length / photoSlide
      const arrangedPhotos = []

      for (let index = 0; index < photoSlide; index++) {
        arrangedPhotos.push(photos.splice(0, delim))
      }

      console.log("Arranged", arrangedPhotos)
      return arrangedPhotos.reverse()
    },
    async getImages() {
      this.isLoading = true
      const response = await axios.get(randomUrl);
      const photos = response.data;

      this.photos = photos
      console.log('My Photos:', photos);
      this.isLoading = false
    },
    async searchImages(search = this.search) {
      this.isLoading = true
      const response = await axios.get(searchUrl + search);
      const photos = response.data.results;

      this.photos = photos
      console.log('Searched Photos:', photos);
      console.log('Searched Photos:', response);

      this.isLoading = false
    }
  },
  watch: {
    search: {
      immediate: false,
      handler(search) {
        if (!search) {
          this.getImages()
        }
        this.searchImages(search)
      }
    }
  },
  created() {
    this.getImages()
  }
}
</script>

<style scoped>
.rounded-10 {
  border-radius: 10px;
}

.rounded-5 {
  border-radius: 5px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
input:focus {
  border: none;
  box-shadow: none;
}
</style>
