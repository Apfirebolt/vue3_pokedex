<template>
    <Popover as="header" class="pb-24 bg-gradient-to-r from-cyan-900 to-indigo-600" v-slot="{ open }">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div class="relative flex flex-wrap items-center justify-center lg:justify-between">
            <!-- Logo -->
            <div class="absolute left-0 py-5 flex-shrink-0 lg:static">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <!-- https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg -->
                <img class="h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png" alt="">
              </a>
            </div>
  
            <!-- Right section on desktop -->
            <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
  
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-4 relative flex-shrink-0">
                <div>
                  <MenuButton class="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="../assets/pokemon.png" alt="" />
                  </MenuButton>
                </div>
                <transition leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
  
            <div class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
              <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                <!-- Left nav -->
                <div class="hidden lg:block lg:col-span-2">
                  <nav class="flex space-x-4">
                    <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.link }" :class="[item.current ? 'text-white' : 'text-cyan-100', 'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10']" :aria-current="item.current ? 'page' : undefined">
                      {{ item.name }}
                    </router-link>
                  </nav>
                </div>
                <div class="px-12 lg:px-0">
                  <!-- Search -->
                  <div class="max-w-xs mx-auto w-full lg:max-w-md">
                    <label for="search" class="sr-only">Search {{ searchText }}</label>
                    <div class="relative text-white focus-within:text-gray-600">
                      <div @click="searchItem" class="cursor-pointer absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon class="cursor-pointer h-5 w-5" aria-hidden="true" />
                      </div>
                      <input id="search" v-model="searchText" class="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Search" type="search" name="search" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Menu button -->
            <div class="absolute right-0 flex-shrink-0 lg:hidden">
              <!-- Mobile menu button -->
              <PopoverButton class="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                <span class="sr-only">Open main menu</span>
                <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
          </div>
        </div>
  
        <TransitionRoot as="template" :show="open">
          <div class="lg:hidden">
            <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0">
              <PopoverOverlay class="z-20 fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
  
            <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-150 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
              <PopoverPanel focus class="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                  <div class="pt-3 pb-2">
                    <div class="flex items-center justify-between px-4">
                      <div>
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg" alt="Workflow" />
                      </div>
                      <div class="-mr-2">
                        <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                          <span class="sr-only">Close menu</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </PopoverButton>
                      </div>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                      <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.link }" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</router-link>
                    </div>
                  </div>
                  <div class="pt-4 pb-2">
                    <div class="flex items-center px-5">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" src="../assets/pokemon.png" alt="" />
                      </div>
                      <div class="ml-3 min-w-0 flex-1">
                        <div class="text-base font-medium text-gray-800 truncate">Pokemon API</div>
                        <div class="text-sm font-medium text-gray-500 truncate">{{ user.email }}</div>
                      </div>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                      <router-link v-for="item in userNavigation" :key="item.name" :to="{ name: item.link }" class="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                        {{ item.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </TransitionChild>
          </div>
        </TransitionRoot>
      </Popover>
  </template>
  
  <script>
  import { ref } from 'vue'
  import useEmitter from '../composables/useEmitter'
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    BellIcon,
    MenuIcon,
    XIcon,
  } from '@heroicons/vue/outline'
  import { SearchIcon } from '@heroicons/vue/solid'
  
  const navigation = [
    { name: 'Home', link: 'Home', href: '#', current: true },
    { name: 'Pokemon', link: 'PokemonList', href: '#', current: false },
    { name: 'Items', link: 'ItemList', href: '#', current: false },
    { name: 'Moves', link: 'MoveList', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  
  export default {
    components: {
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      Popover,
      PopoverButton,
      PopoverOverlay,
      PopoverPanel,
      TransitionChild,
      TransitionRoot,
      BellIcon,
      SearchIcon,
      MenuIcon,
      XIcon,
    },
    setup() {
      const searchText = ref('')
      const emitter = useEmitter()
      const searchItem = () => {
        emitter.emit("searchItem", searchText.value);
      }

      return {
        searchItem,
        searchText,
        navigation,
        userNavigation,
      }
    },
  }
  </script>