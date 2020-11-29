<template>
  <footer
    class="pb-6"
    :class="[absolute ? 'absolute w-full bottom-0 ' : 'relative']"
  >
    <div class="container mx-auto px-4">
      <hr class="mb-6 border-b-1 border-gray-400" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4">
          <div
            class="text-sm text-gray-400 font-semibold py-1 text-center md:text-left"
          >
            ลิขสิทธิ์ © 2563
            <a
              href="https://plan.up.ac.th/"
              class="text-white hover:text-gray-400 text-sm font-semibold py-1"
            > กองแผนงาน มหาวิทยาลัยพะเยา
            </a>
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="https://plan.up.ac.th/"
                class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
              >
                ติดต่อผู้ดูแลระบบ
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
