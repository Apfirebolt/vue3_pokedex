<template>
    <div>
        <p>
            Moves Page
        </p>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
    setup() {
        const state = reactive({
            title: 'My List',
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' },
            ],
        });

        const itemCount = computed(() => state.items.length);

        return {
            title: state.title,
            items: state.items,
            itemCount,
        };
    },
};
</script>
