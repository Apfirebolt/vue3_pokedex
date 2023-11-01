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
                  <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
                  <div class="bg-white p-6">
                    <div class="sm:flex sm:items-center sm:justify-between">
                      <div class="sm:flex sm:space-x-5">
                        <div class="flex-shrink-0">
                          <img class="mx-auto h-20 w-20 rounded-full" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p class="text-xl font-bold text-gray-900 sm:text-2xl">Pokemon</p>
                          <p class="text-sm font-medium text-gray-600">
                            List of all pokemon coming from the API
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    <div v-for="stat in stats" :key="stat.label" class="px-6 py-5 text-sm font-medium text-center">
                      <span class="text-gray-900">{{ stat.value }}</span>
                      {{ ' ' }}
                      <span class="text-gray-600">{{ stat.label }}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <!-- Welcome panel -->
              <section aria-labelledby="profile-overview-title">
                <div class="rounded-lg bg-white overflow-hidden shadow">
                  <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
                  
                  <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    <div v-for="stat in stats" :key="stat.label" class="px-6 py-5 text-sm font-medium text-center">
                        <span class="text-gray-900">{{ stat.value }}</span>
                        {{ ' ' }}
                        <span class="text-gray-600">{{ stat.label }}</span>
                    </div>
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
  
  const user = {
    name: 'Chelsea Hagon',
    email: 'chelseahagon@example.com',
    role: 'Human Resources Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Profile', href: '#', current: false },
    { name: 'Resources', href: '#', current: false },
    { name: 'Company Directory', href: '#', current: false },
    { name: 'Openings', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
  ]

  
  export default {
    setup() {
      return {
        user,
        navigation,
        userNavigation,
        stats,
      }
    },
  }
  </script>