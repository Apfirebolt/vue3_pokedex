<template>
  <div class="min-h-full">
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Profile</h1>
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <h2 class="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
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
                <div
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                >
                  <div
                    v-for="(item, index) in pokemon"
                    :key="index"
                    class="px-3 py-2 text-sm font-medium text-center"
                  >
                    <p class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded">{{ capitalize(item.name) }}</p>
                    {{ " " }}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <h2 class="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>

                <div
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                >
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, omnis?
                  </div>
                  {{ isLoading }}
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
import { usePokemon } from "../store/pokemon";
import Loader from "../components/Loader.vue";
import Logo from '../assets/vue.svg';
import { capitalize } from "../utils/filters.js";

export default {
  components: {
    Loader,
  },
  setup() {
    const store = usePokemon();

    onMounted(() => {
      store.getPokemonList();
    });

    const pokemon = computed(() => store.getPokemonData);
    const isLoading = computed(() => store.isLoading);

    return {
      isLoading,
      pokemon,
      capitalize,
    };
  },
};
</script>
