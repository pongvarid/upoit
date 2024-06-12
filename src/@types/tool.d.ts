import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $calculate(iit: number, eit: number, oit: number, base: number): number;
  }
}