<template>
<div>
    <div class="block relative " style="z-index:1;">
        <div class="container px-4 py-4 mx-auto">
            <h2 class="text-2xl mt-2 leading-tight font-semibold font-heading"> สำหรับกรอกข้อมูลผู้มีส่วนได้ส่วนเสียภายนอก</h2>
            <p>โปรดใส่ข้อมูลบุคคล นิติบุคคล บริษัทเอกชน หรือหน่วยงานของรัฐอื่นที่มารับบริการหรือมาติดต่อตามภารกิจของหน่วยงาน ตั้งแต่เริ่มปีงบประมาณจนถึงวันที่ส่งข้อมูล ทั้งงานหลักของหน่วยงาน งานจัดซื้อจัดจ้างหรือการจัดหาพัสดุ และงานสนับสนุนอื่น ๆ ทั้งนี้ ให้ใส่ข้อมูลทั้งหมดเท่าทีมีและที่หน่วยงานสามารถให้ข้อมูลได้ โดยข้อมูลนี้จะไม่มีการเปิดเผยต่อสาธารณะและใช้เพื่อการเก็บข้อมูลสำหรับการประเมิน ITA เท่านั้น</p>
            <br>
            <v-toolbar flat style="background:transparent;">

                <v-select @change="search()" filled label="เลือกปีงบประมาณ" v-model="chooseYear" :items="years" item-text="year" item-value="id"></v-select>
                <!-- <v-spacer></v-spacer>
                <v-btn color="success" @click="search()"><i class="em em-mag" aria-role="presentation" aria-label="LEFT-POINTING MAGNIFYING GLASS"></i> ค้นหา</v-btn> -->
            </v-toolbar>
            <div style="overflow-x:auto;">
                <table style="width:1000px; ">
                    <tr>
                        <th>ชื่อองค์กร/ชื่อ - นามสกุล * (ไม่ใส่คำนำหน้า)</th>
                        <th>เบอร์โทรศัพท์ </th>
                        <th>อีเมล์ </th>
                        <th>ช่องทางการติดต่ออื่นๆ</th>
                        <th>ประเภทการติดต่อ *</th>
                        <th>จัดการ</th>
                    </tr>
                    <tr>
                        <td>
                            <v-text-field filled dense label="ชื่อองค์กร/ชื่อ - นามสกุล	" v-model="form.name"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="เบอร์โทรศัพท์" v-model="form.tel"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="อีเมล์" v-model="form.email"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="การติดต่อ" v-model="form.other"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="ประเภทการติดต่อ" v-model="form.type"></v-text-field>
                        </td>
                        <td>
                            <v-btn color="primary" @click="addEit()">เพิ่ม</v-btn>
                        </td>
                    </tr>
                    <tr v-for="item,index in lists" :key="index">
                        <td>
                            <v-text-field filled dense label="ชื่อองค์กร/ชื่อ - นามสกุล	" v-model="item.name"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="เบอร์โทรศัพท์" v-model="item.tel"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="อีเมล์" v-model="item.email"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="การติดต่อ" v-model="item.other"></v-text-field>
                        </td>
                        <td>
                            <v-text-field filled dense label="ประเภทการติดต่อ" v-model="item.type"></v-text-field>
                        </td>
                        <td>
                            <v-btn small @click="editEit(item)" color="warning">แก้ไข</v-btn><br><br>
                            <v-btn small @click="deleteEit(item)" color="error">ลบ</v-btn>
                        </td>

                    </tr>
                </table>

            </div>

        </div>
    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import {
    Core
} from '@/store/core'
import {
    Auth
} from '@/store/auth'
import {
    User
} from '@/store/user'
import _ from 'lodash'
@Component({
    components: {

    },
})
export default class Home extends Vue {
    private form: any = {}
    chooseYear: any = 1
    chooseAgency: any = 1

    private agency: any = null
    private top: any = [];
    private down: any = []
    private years: any = []
    private lists: any = []
    private user: any = {}
    async created() {
        //  await Auth.reToken();
        this.user = await User.getUser();
        this.agency = await Core.getHttp(`/api/ita/v1/agency/`)
        this.years = await Core.getHttp(`/api/eit/v1/year`)
        this.top = _.orderBy(this.agency, ['count'], ['desc']);
        this.down = _.orderBy(this.agency, ['count'], ['asc']);

        this.chooseYear = this.years[0].id
        this.lists = await Core.getHttp(`/api/ita/v1/eituser/?year=${this.chooseYear}&agency=${this.user.ext_link.agency}`)

    }

    prePrint() {
        window.print();
    }

    async search() {
        this.lists = await Core.getHttp(`/api/ita/v1/eituser/?year=${this.chooseYear}&agency=${this.user.ext_link.agency}`)
    }

    async addEit() {
        this.form.year = this.chooseYear
        this.form.agency = this.user.ext_link.agency
        let save = await Core.postHttp(`/api/ita/v1/eituser/`, this.form)
        if (save.id) {
            alert('เพิ่มข้อมูลสำเร็จแล้ว')
            this.lists = await Core.getHttp(`/api/ita/v1/eituser/?year=${this.chooseYear}&agency=${this.user.ext_link.agency}`)
            this.form = {}
        }
    }

    async editEit(item: any) {
        let save = await Core.putHttp(`/api/ita/v1/eituser/${item.id}/`, item)
        if (save.id) {
            alert('แก้ไขข้อมูลสำเร็จแล้ว')
            this.lists = await Core.getHttp(`/api/ita/v1/eituser/?year=${this.chooseYear}&agency=${this.user.ext_link.agency}`)
        }
    }
    async deleteEit(item: any) {
        let confirms = confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูล')
        if (confirms) {
            let save = await Core.deleteHttp(`/api/ita/v1/eituser/${item.id}/`)
            alert('ลบข้อมูลสำเร็จแล้ว')
            this.lists = await Core.getHttp(`/api/ita/v1/eituser/?year=${this.chooseYear}&agency=${this.user.ext_link.agency}`)

        }

    }

}
</script>

<style>
.md\:w-74 {
    width: 26rem;
}

.f-white {
    color: white;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
