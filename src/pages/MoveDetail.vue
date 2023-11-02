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
                            Move
                          </h2>
                          <p class="text-sm font-medium text-gray-600">
                            Get Details of a move
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="move"
                    class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                  >
                    {{ move }}                                 
                  </div>
                  <div v-else>
                      <p
                        class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded"
                      >
                          No move found
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
  import { computed, onMounted } from "vue";
  import { useMove } from "../store/move";
  import { useRoute } from 'vue-router'
  import Loader from "../components/Loader.vue";
  
  export default {
    components: {
      Loader,
    },
    setup() {
      const store = useMove();
      const route = useRoute();
  
      onMounted(() => {
        store.getSingleMove(route.params.name);
      });
  
      const move = computed(() => store.move);
      const isLoading = computed(() => store.isLoading);
  
      return {
        isLoading,
        move,
      };
    },
  };
  </script>
  