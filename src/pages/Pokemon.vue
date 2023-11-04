<template>
  <div class="min-h-full bg-gradient-to-r from-emerald-500 to-emerald-900 p-1">
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="bg-white p-6">
                  <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                      <div class="flex-shrink-0">
                        <img
                          class="mx-auto h-20 w-20 rounded-full"
                          src="../assets/pokemon.png"
                          alt="Image not available"
                        />
                      </div>
                      <div
                        class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left"
                      >
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
                          Pokemon
                        </h2>
                        <p class="text-sm font-medium text-gray-600">
                          List of all pokemon coming from the API
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="pokemon.length"
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                >
                  <div
                    v-for="(item, index) in pokemon"
                    :key="index"
                    class="px-3 py-2 text-sm font-medium text-center"
                  >
                    <p
                      @click="goToDetailPage(item.name)"
                      class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded hover:cursor-pointer"
                    >
                      {{ capitalize(item.name) }}
                    </p>
                    {{ " " }}
                  </div>  
                                
                </div>
                <div v-else>
                    <p
                      class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded"
                    >
                        No pokemon found
                    </p>
                </div>
              </div>
            </section>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div
                  class="border-t p-4 border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:divide-y-0 sm:divide-x"
                >
                  <p>
                    Pokémon is a Japanese media franchise consisting of video
                    games, animated series and films, a trading card game, and
                    other related media. The franchise takes place in a shared
                    universe in which humans co-exist with creatures known as
                    Pokémon, a large variety of species endowed with special
                    powers. The franchise's target audience is children aged 5
                    to 12,[1] but it is known to attract people of all ages.
                  </p>

                  <Pagination :goToNextPage="goToNextPage" :goToPreviousPage="goToPreviousPage" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect, onUnmounted } from "vue";
import { useMouse } from "../composables/useMouse";
import { usePokemon } from "../store/pokemon";
import { useRoute, useRouter } from 'vue-router'
import Loader from "../components/Loader.vue";
import ErrorToast from "../components/ErrorToast.vue";
import Pagination from "../components/Pagination.vue";
import { capitalize } from "../utils/filters.js";
import useEmitter from "../composables/useEmitter";


export default {
  components: {
    Loader,
    Pagination,
    ErrorToast
  },
  setup() {
    const startIndex = ref(0);
    const endIndex = ref(40);
    const store = usePokemon();
    const emitter = useEmitter();
    const route = useRoute();
    const router = useRouter();
    const { x, y } = useMouse()
    const currentRoute = computed(() => route.path)

    console.log('Mouse positions ', x, y)

    onMounted(() => {
      if (currentRoute.value === "/pokemon") {
        emitter.on("searchItem", (name) => {
          const lowercaseName = name.toLowerCase();
          store.getPokemonList(lowercaseName, 40, 0);
        });
      }
      store.getPokemonList(null, 40, 0);
    });

    onUnmounted(() => {
      emitter.off("searchItem");
    });

    const pokemon = computed(() => store.getPokemonData);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.errorMessage);

    const goToDetailPage = (name) => {
      router.push({ name: "PokemonDetail", params: { name } });
    };

    const goToNextPage = () =>  {
      if (endIndex.value < 1292) {
        startIndex.value += 40;
        endIndex.value += 40;
        store.getPokemonList(null, endIndex.value, startIndex.value);
      }
    }

    const goToPreviousPage = () => {
      if (startIndex.value > 0) {
        startIndex.value -= 40;
        endIndex.value -= 40;
        store.getPokemonList(null, endIndex.value, startIndex.value);
      }
    }

    watchEffect(() => {
      if (hasError.value) {
        emitter.emit("showError", hasError.value);
        setTimeout(() => {
          store.resetErrorMessage('');
        }, 3000);
      }
    });

    return {
      isLoading,
      goToDetailPage,
      pokemon,
      capitalize,
      goToNextPage,
      goToPreviousPage,
      hasError
    };
  },
};
</script>
