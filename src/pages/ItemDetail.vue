<template>
    <div class="min-h-full bg-gradient-to-r from-emerald-500 to-emerald-900 p-1">
      <main class="-mt-24 pb-8">
      <div v-if="item" class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
                        <img v-if="item.sprites" class="mx-auto h-24 w-24 rounded-full" :src="item.sprites.default"
                          alt="Image not available" />
                      </div>
                      <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
                          {{ item.name ? capitalize(item.name) : '' }}
                        </h2>
                        <p 
                          class="text-sm font-medium text-gray-600">
                          {{ item.category ? capitalize(item.category.name) : '' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:divide-y-0 sm:divide-x">

                  <p class="bg-gradient-to-r from-cyan-900 to-indigo-600 text-white p-3 text-center">
                    ATTRIBUTES
                  </p>

                  <div>
                    <div class="grid grid-cols-3 gap-4 px-3 py-2 border-y-2 border-sky-500" v-for="(item, index) in item.attributes">
                      <p class="col-span-2">
                        {{ item.name ? capitalize(item.name) : '' }}
                      </p>

                      <p>
                        {{ item.url ? item.url : '' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div
                  class="border-t p-4 border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:divide-y-0 sm:divide-x">
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
      <div v-else>
        <p class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded">
          No item found
        </p>
      </div>
    </main>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, onBeforeUnmount } from "vue";
  import { useItem } from "../store/item";
  import { useRoute } from 'vue-router'
  import Loader from "../components/Loader.vue";
  import { capitalize } from "../utils/filters";
  
  export default {
    components: {
      Loader,
    },
    setup() {
      const store = useItem();
      const route = useRoute();
  
      onMounted(() => {
        store.getSingleItem(route.params.name);
      });

      onBeforeUnmount(() => {
        store.resetItem();
      });
  
      const item = computed(() => store.getItem);
      const isLoading = computed(() => store.isLoading);
  
      return {
        isLoading,
        item,
        capitalize
      };
    },
  };
  </script>
  