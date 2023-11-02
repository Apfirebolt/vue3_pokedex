import { defineStore } from "pinia";
import { ref } from "vue";
import httpClient from "../plugins/interceptor";

export const usePokemon = defineStore('pokemon', {
    state: () => ({
      pokemonData: ref([]),
      pokemon: ref({}),
      loading: ref(false),
    }),

    getters: {
        getPokemonData() {
            return this.pokemonData;
        },
        getPokemon() {
            return this.pokemon;
        },
        isLoading() {
            return this.loading;
        }
    },
  
    actions: {
      async getPokemonList(searchItem) {
        try {
          this.loading = true;
          if (searchItem) {
            let responseData = await httpClient.get(`/api/v2/pokemon/${searchItem}`)
            this.pokemonData = [responseData.data];
          } else {
            let responseData = await httpClient.get('/api/v2/pokemon')
            this.pokemonData = responseData.data.results;
          }
          this.loading = false;
        } catch (error) {
          console.log(error)
          return error
        }
      },

      async getSinglePokemon(searchItem) {
        try {
          this.loading = true;
          let responseData = await httpClient.get(`/api/v2/pokemon/${searchItem}`)
          this.pokemon = responseData.data;
          this.loading = false;
        } catch (error) {
          console.log(error)
          return error
        }
      },
    },
  })