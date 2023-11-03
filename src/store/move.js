import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const useMove = defineStore('move', {
    state: () => ({
      moveData: ref([]),
      move: ref({}),
      loading: ref(false),
    }),

    getters: {
        getMoveData() {
            return this.moveData;
        },
        getMove() {
            return this.move;
        }, 
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getMoveList(searchItem, limit, offset) {
        try {
          if (searchItem) {
            let responseData = await httpClient.get(`/api/v2/move/${searchItem}`)
            this.moveData = [responseData.data];
          } else {
            let responseData = await httpClient.get(`/api/v2/move?limit=${limit}&offset=${offset})`)
            this.moveData = responseData.data.results;
          }
        } catch (error) {
          console.log(error)
          return error
        }
      },

      async getSingleMove(searchItem) {
        try {
          let responseData = await httpClient.get(`/api/v2/move/${searchItem}`)
          this.move = responseData.data;
        } catch (error) {
          console.log(error)
          return error
        }
      },

      resetMove() {
        this.move = {};
      }
    },
  })