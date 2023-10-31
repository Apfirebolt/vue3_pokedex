<template>
    <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <!-- Search section -->

                <div class="flex lg:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton
                        class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <MenuAlt1Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <!-- Links section -->
                <div class="hidden lg:block lg:w-80">
                    <div class="flex items-center justify-end">
                        <div class="flex">
                            <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
                                class="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">{{
                                    item.name }}
                            </router-link>
                        </div>
                        <!-- Profile dropdown -->
                        <Menu as="div" class="ml-4 relative flex-shrink-0">
                            <div>
                                <MenuButton
                                    class="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                        alt="" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                    <a :href="item.href" :class="[
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                    ]">{{ item.name }}</a>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="lg:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[
                    item.current
                        ? 'text-white bg-indigo-800'
                        : 'text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600',
                    'block px-3 py-2 rounded-md text-base font-medium',
                ]" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
            <div class="pt-4 pb-3 border-t border-indigo-800">
                <div class="px-2 space-y-1">
                    <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href"
                        class="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">
                        {{ item.name }}</DisclosureButton>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>
  
<script>

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";
import {
    BadgeCheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CollectionIcon,
    SearchIcon,
    SortAscendingIcon,
    StarIcon,
} from "@heroicons/vue/solid";
import { MenuAlt1Icon, XIcon } from "@heroicons/vue/outline";

const navigation = [
    { name: "Home", href: "#", current: true },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

export default {
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        BadgeCheckIcon,
        ChevronDownIcon,
        ChevronRightIcon,
        CollectionIcon,
        MenuAlt1Icon,
        SearchIcon,
        SortAscendingIcon,
        StarIcon,
        XIcon,
    },
    setup() {
        return {
            navigation,
            userNavigation,
        };
    },
};
</script>
  