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
                          List of all Pokemon Moves found in Pokemon games
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x"
                >
                  <div
                    v-for="(oneItem, index) in move"
                    :key="index"
                    class="px-3 py-2 text-sm font-medium text-center"
                  >
                    <p
                      @click="goToDetailPage(oneItem.name)"
                      class="text-gray-900 bg-indigo-100 px-2 py-3 shadow rounded hover:cursor-pointer"
                    >
                      {{ capitalize(oneItem.name) }}
                    </p>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMove } from "../store/move";
import Loader from "../components/Loader.vue";
import Pagination from "../components/Pagination.vue";
import { capitalize } from "../utils/filters.js";
import { useRoute, useRouter } from "vue-router";
import useEmitter from "../composables/useEmitter";

export default {
  components: {
    Loader,
    Pagination,
  },
  setup() {
    const startIndex = ref(0);
    const endIndex = ref(40);
    const store = useMove();
    const emitter = useEmitter();
    const route = useRoute();
    const router = useRouter();
    const currentRoute = computed(() => route.path);

    onMounted(() => {
      if (currentRoute.value === "/move") {
        emitter.on("searchItem", (name) => {
          let smallCaps = name.toLowerCase();
          store.getMoveList(smallCaps, 40, 0);
        });
      }
      store.getMoveList(null, 40, 0);
    });

    onUnmounted(() => {
      emitter.off("searchItem");
    });

    const move = computed(() => store.getMoveData);
    const isLoading = computed(() => store.isLoading);

    const goToDetailPage = (name) => {
      router.push({ name: "MoveDetail", params: { name } });
    };

    const goToNextPage = () => {
      // Number of moves hardcoded to 844
      if (endIndex.value < 844) {
        startIndex.value += 40;
        endIndex.value += 40;
        store.getMoveList(null, endIndex.value, startIndex.value);
      }
    };

    const goToPreviousPage = () => {
      if (startIndex.value > 0) {
        startIndex.value -= 40;
        endIndex.value -= 40;
        store.getMoveList(null, endIndex.value, startIndex.value);
      }
    };

    return {
      isLoading,
      move,
      capitalize,
      goToDetailPage,
      goToNextPage,
      goToPreviousPage
    };
  },
};
</script>
