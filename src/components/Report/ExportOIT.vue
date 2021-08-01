<template>
  <div>
      <v-btn @click="onExport()" outlined small color="success">Export </v-btn> 
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    props: {
        data:{
            default:[]
        }
    },
    data(){
        return ({
          
        })
    },
    async created(){
        await this.generateData();
    },
    methods:{
        async generateData(){
            let data = []
            for (let index = 0; index < this.data.length; index++) { 
                 data.push({
                     "ลำดับ":`O${this.data[index].number}`,
                     "ชื่อ":this.data[index].name,
                     "คะแนน":this.data[index].score_raw,
                     "สถานะ":this.data[index].status,
                     "หมายเหตุ":this.data[index].comment,
                 }); 
            }
            return data

        },
async onExport() {
    let data = await this.generateData();
    const dataWS = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,'OIT.xlsx')
  }
    }
}
</script>

<style>

</style>