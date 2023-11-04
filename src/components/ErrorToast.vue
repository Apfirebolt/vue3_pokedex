<template>
    <transition name="fade">
        <div v-if="errorMessage"
            class="fixed bottom-0 right-0 mb-4 mr-4 bg-red-500 w-1/2 mx-auto text-white px-4 py-3 rounded-md"
        >
            {{ errorMessage }} 
        </div>
    </transition>
</template>

<script>
import { ref, onMounted } from 'vue'
import useEmitter from "../composables/useEmitter";

export default {
    setup() {
        const errorMessage = ref('')
        const emitter = useEmitter()

        onMounted(() => {
            emitter.on('showError', (message) => {
                showError(message)
            })
        })

        const showError = (message) => {
            
            errorMessage.value = message
            setTimeout(() => {
                errorMessage.value = ''
            }, 2000)
        }

        showError();

        return {
            errorMessage,
            showError,
        }
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>