<template>
  <div>
      <v-btn @click="onExport()" outlined small color="success">Export </v-btn> 
      <!-- <pre>{{exportData}}</pre>
      <div v-for="issue,i in data" :key="i">
          <h2>{{issue.name}}</h2>
                <pre>{{issue}}</pre>
      </div> -->
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
          exportData:[]
        })
    },
    async created(){
        await this.generateData();
    },
    methods:{
        async generateData(){
            let data = []
            for (let index = 0; index < this.data.length; index++) { 
                if(this.data[index].name != "ข้อเสนอแนะ"){
                      data.push({
                     "ลำดับ":`I${this.data[index].order}`,
                      "ชื่อ":this.data[index].name,
                      "คะแนน":this.data[index].score,
                    //  "คะแนน":this.data[index].score_raw,
                    //  "สถานะ":this.data[index].status,
                    //  "หมายเหตุ":this.data[index].comment,
                 }); 
                }
               
            }
            this.exportData = data;
            return data

        },
async onExport() {
    let data = await this.generateData();
    const dataWS = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, dataWS)
    XLSX.writeFile(wb,'IIT.xlsx') 

  }
    }
}
</script>

<style>

</style>