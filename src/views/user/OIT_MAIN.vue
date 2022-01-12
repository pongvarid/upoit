<template>
  <div class="pt-20" v-if="user.ext_link.oit">
    <div
      class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2"
      v-if="user.ext_link.oit"
    >
      <h3 class="text-2xl text-gray-800">
        <i
          class="em em-lower_left_ballpoint_pen"
          aria-role="presentation"
          aria-label=""
        ></i
        >ข้อมูล OIT ของหน่วยงาน
      </h3>
    </div>
    <div
      class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2"
      v-if="response && user.ext_link.oit"
    >
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <div class="w-full" v-for="(year, i) in years" :key="i">
          <div
            @click="$router.push(`/user/paper?year=${year.id}`)"
            class="
              flex
              cursor-pointer
              items-center
              p-4
              bg-white
              rounded-lg
              shadow-xl
              dark:bg-gray-800
              border-b-4
              elevation-6
            "
            style="border-color: #ffc300"
          >
            <v-btn style="margin-right: 10px" color="#FFC300" large fab dark>
              <v-icon>OIT</v-icon>
            </v-btn>
            <div>
              <h2 class="text-xl">{{ year.year }}</h2>
              <h2 class="text-sm text-gray-700">
                ประเด็นที่บันทึก {{ year.result }} / {{ year.rate }}
              </h2>
              <v-chip v-if="year.result >= year.rate" small color="green" dark
                ><v-icon left>mdi-check</v-icon>บันทึกข้อมูลครบแล้ว</v-chip
              >
              <v-chip v-else small color="red" dark
                ><v-icon left>mdi-close</v-icon>ยังบันทึกข้อมูลไม่ครบ</v-chip
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div
      class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2"
      v-if="user.ext_link.oit_up"
    >
      <h3 class="text-2xl text-gray-800">
        <i
          class="em em-lower_left_ballpoint_pen"
          aria-role="presentation"
          aria-label=""
        ></i>
        ข้อมูล OIT ของ มหาวิทยาลัย
      </h3>
    </div>
    <div
      class="relative w-full mt-4 mb-4 max-w-full flex-grow flex-1 px-2 py-2"
      v-if="response && user.ext_link.oit_up"
    >
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <div class="w-full" v-for="(year, is) in upAll" :key="is">
          <div
            @click="$router.push(`/user/paperup?year=${year.id}`)"
            class="
              flex
              cursor-pointer
              items-center
              p-4
              bg-white
              rounded-lg
              shadow-xl
              dark:bg-gray-800
              border-b-4
              elevation-6
            "
            style="border-color: #5e3c9d"
          >
            <v-btn style="margin-right: 10px" color="#5e3c9d" large fab dark>
              <v-icon>OIT</v-icon>
            </v-btn>
            <div>
              <h2 class="text-xl">{{ year.year }}</h2>
              <h2 class="text-sm text-gray-700">
                ประเด็นที่บันทึก {{ year.result }} / {{ year.rate }}
              </h2>
              <v-chip v-if="year.result >= year.rate" small color="green" dark
                ><v-icon left>mdi-check</v-icon>บันทึกข้อมูลครบแล้ว</v-chip
              >
              <v-chip v-else small color="red" dark
                ><v-icon left>mdi-close</v-icon>ยังบันทึกข้อมูลไม่ครบ</v-chip
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
  <div class="pt-20" v-else>
    <v-alert type="error" :value="true">
      คุณไม่สามารถใช้งานข้อมูลส่วนนี้ได้ เนื่องจากสิทธิ์ในการเข้า
      ถึงไม่ได้ถูกกำหนดไว้ กรุณาติดต่อผุู้ดูแลระบบ
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Core } from "@/store/core";
import { User } from "@/store/user";
import _ from "lodash";
@Component({
  components: {},
})
export default class OitMain extends Vue {
  private years: any = null;
  private user: any = {};
  private response: boolean = false;
  up: any = 21;
  uptxt: any = "";
  upAll: any = [];
  public async created() {
    this.user = await User.getUser();
    this.years = await Core.getHttp(`/api/ita/v2/year/`);

    for (let i = 0; i < this.years.length; i++) {
      let res = await Core.getHttp(
        `/api/ita/v1/rateresult/?rate__year=${this.years[i].id}&agency=${this.user.ext_link.agency}`
      );
      let rate = await Core.getHttp(`/api/ita/v2/rate/${this.years[i].id}/`);
      this.years[i].result = await this.getOITResult(res);
      this.years[i].rate = rate.length;
    }
    await this.getUP();
    this.response = true;
  }

  public async getUP() {
    let yesrs = await Core.getHttp(`/api/ita/v2/year/`);
    for (let i = 0; i < yesrs.length; i++) {
      let res = await Core.getHttp(
        `/api/ita/v1/rateresult/?rate__year=${this.years[i].id}&agency=${this.up}`
      );
      let rate = await Core.getHttp(`/api/ita/v2/rate/${this.years[i].id}/`);
      this.upAll[i] = yesrs[i];
      this.upAll[i].result = await this.getOITResult(res);
      this.upAll[i].rate = rate.length;
    }
  }

  private async getOITResult(raw: any) {
    let result = await _(raw)
      .groupBy("rate")
      .map(function (items, data) {
        return {
          data: data,
        };
      })
      .value();
    return result.length;
  }
}
</script>

<style>
</style>
