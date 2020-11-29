<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg border-b-4 border-purple-600"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <span class="font-semibold text-base text-gray-800">
            {{ statTitle }}
          </span>
          <h5 class="text-gray-500 uppercase font-bold text-xs">
            {{ statSubtitle }}
          </h5>

          <div class >
            <button class="mt-2 text-purple-600 font-bold text-tiny" @click="$router.push(statRoute)"><v-icon style="color:#553c9a;">mdi mdi-check-circle</v-icon>ตรวจสอบ</button>
          </div>

        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-2xl"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card-stats",
  props: {
    statSubtitle: {
      type: String,
      default: "Traffic",
    },

    statArrow: {
      default: "up",
      validator: function (value) {
        // The value must match one of these strings
        return ["up", "down"].indexOf(value) !== -1;
      },
    },
    statPercent: {
      type: String,
      default: "3.48",
    },
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: {
      type: String,
      default: "text-green-500",
    },
    statTitle: {
      type: String,
      default: "350,897",
    },
    statDescripiron: {
      type: String,
      default: "Since last month",
    },
    statIconName: {
      type: String,
      default: "far fa-chart-bar",
    },
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: {
      type: String,
      default: "bg-red-500",
    },
    statRoute:{
      type: String,
      default:"#"
    }
  },
};
</script>
