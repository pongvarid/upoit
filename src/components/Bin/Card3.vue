<template>
    <div class="flex items-center p-4  bg-white rounded-lg   " :style="`border-color:${c}; `">
                <v-btn style="margin-right: 10px" :color="c" large fab dark>
                    <v-icon>{{i}}</v-icon>
                </v-btn>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {{ t }}
                    </p>
                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {{ h }}
                    </p>
                </div>
   </div>

</template>

<script>
export default {
    props:{
        c:{
            default:'#1d8998',
        },
        i:{
            default:'mdi-page-previous-outline',
        },
        t:{
            default:'text',
        },
        h:{
             default:'head',
        }
    }
}
</script>

<style>

</style>