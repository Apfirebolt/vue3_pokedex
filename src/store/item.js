import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useItem = defineStore('item', {
    state: () => ({
      itemData: ref([]),
      loading: ref(false),
    }),

    getters: {
        getItemData() {
            return this.itemData;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getItemList() {
        try {
          this.loading = true;  
          let responseData = await httpClient.get('/api/v2/item')
          this.itemData = responseData.data.results;
          this.loading = false;
        } catch (error) {
          console.log(error)
          return error
        }
      },
    },
  })