<template>
<!--    <div class="flex items-center p-2  bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4  elevation-6" :style="`border-color:${c}; `">-->
<!--                <v-btn style="margin-right: 10px" :color="c" small fab dark>-->
<!--                    <v-icon>{{i}}</v-icon>-->
<!--                </v-btn>-->
<!--                <div clas="w-full">-->
<!--                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">-->
<!--                        {{ t }}-->
<!--                    </p>-->
<!--                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">-->
<!--                       {{ h }}-->
<!--                    </p>-->
<!--                  <v-progress-linear striped height="10" :color="color"  :value="100" :buffer-value="100"></v-progress-linear>-->
<!--                </div>-->
<!--      -->
<!--      -->
<!--   </div>-->

  <v-card class="m-2 p-4 elevation-5"  >
    <b>{{i}}. {{ t }} </b> ({{ h }} %)
    <v-progress-linear striped height="10"   :value="h" :buffer-value="100"></v-progress-linear>
  </v-card>

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