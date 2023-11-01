import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useMove = defineStore('move', {
    state: () => ({
      moveData: ref([]),
      loading: ref(false),
    }),

    getters: {
        getMoveData() {
            return this.moveData;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getMoveList() {
        try {
          this.loading = true;  
          let responseData = await httpClient.get('/api/v2/move')
          this.moveData = responseData.data.results;
          this.loading = false;
        } catch (error) {
          console.log(error)
          return error
        }
      },
    },
  })