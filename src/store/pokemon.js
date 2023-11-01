import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const usePokemon = defineStore('pokemon', {
    state: () => ({
      pokemonData: ref([]),
      loading: ref(false),
    }),

    getters: {
        getPokemonData() {
            return this.pokemonData;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getPokemonList() {
        try {
          this.loading = true;  
          let responseData = await httpClient.get('/api/v2/pokemon')
          this.pokemonData = responseData.data.results;
          this.loading = false;
          console.log(this.pokemonData);
        } catch (error) {
          console.log(error)
          return error
        }
      },
    },
  })