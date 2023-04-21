<template>
  <div  >
    <div class="container px-auto">
      <h2 class="text-xl mt-2 leading-tight font-semibold font-heading"> ผลการประเมิน
        <v-btn class="m-1" @click="$router.push(`/export/up?year=${year}`)"><i class="em em-printer" aria-role="presentation" aria-label=""></i>Export</v-btn>
      </h2><br>
      <div class="flex ">
        <v-select class="m-1" @change="loadData()" filled label="ปีงบประมาณ" v-model="year" :items="years" item-text="year" item-value="year"></v-select>
       </div>
    </div>
    <div class="container px-auto w-full">
      <div class="flex flex-col" v-if="response == true">
        <All :year="year" />
        <Agency :year="year"  />
      </div>

      <div class="flex flex-wrap flex-col md:flex-row justify-center" v-else>
        <center>
          <div>
            <v-icon  style="font-size:79px; color:#3182ce;">mdi-information</v-icon><br><br>
            <h2  class="text-2xl text-blue-600">ยังไม่เปิดให้เข้าถึงข้อมูล</h2>
          </div>
        </center>
      </div >
    </div>

     <!-- <div class="flex flex-col justify-center items-center"> 
        <h2 class="text-2xl font-semibold">ผลคะแนนและระดับผลการประเมินของคณะ/วิทยาลัย/ระดับกองหรือเทียบเท่า และหน่วยงาน </h2>
        <table class="mt-4" style="border: none;width:100%;border-collapse:collapse;">
    <thead>
        <tr>
            <td style="width: 48pt;border: 1pt solid windowtext;background: rgb(197, 217, 241);padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:   "TH Niramit AS";color:black;'>ลำดับ</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;background: rgb(197, 217, 241);padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:   "TH Niramit AS";color:black;'>คณะ/วิทยาลัย</span></strong><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>/ส่วนงานอื่น</span></strong></p>
            </td>
            <td style="width: 77.95pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;background: rgb(197, 217, 241);padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:   "TH Niramit AS";color:black;'>ผลคะแนน</span></strong></p>
            </td>
            <td style="width: 106.3pt;border-top: 1pt solid windowtext;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-image: initial;border-left: none;background: rgb(197, 217, 241);padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>rate</span></strong></p>
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>1</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะเกษตรศาสตร์และทรัพยากรธรรมชาติ</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>78.92</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>2</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะทันตแพทยศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>79.52</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>3</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะเทคโนโลยีสารสนเทศและการสื่อสาร</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>83.52</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>4</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะนิติศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>69.19</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>5</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะบริหารธุรกิจและนิเทศศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>67.33</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>6</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะพยาบาลศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>73.30</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>7</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะพลังงานและสิ่งแวดล้อม</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>80.12</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>8</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะแพทยศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>68.94</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>9</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะเภสัชศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>73.75</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>10</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะรัฐศาสตร์และสังคมศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>68.41</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>11</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะวิทยาศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>75.11</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>12</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะวิทยาศาสตร์การแพทย์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>87.21</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>A</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>13</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะวิศวกรรมศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>83.63</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>14</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะศิลปศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>77.81</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>15</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะสถาปัตยกรรมศาสตร์และศิลปกรรมศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>84.21</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>16</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะสหเวชศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>73.94</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>17</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>คณะสาธารณสุขศาสตร์</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>72.66</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>C</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>18</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>วิทยาลัยการจัดการ</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>75.05</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>B</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 48pt;border-right: 1pt solid windowtext;border-bottom: 1pt solid windowtext;border-left: 1pt solid windowtext;border-image: initial;border-top: none;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><strong><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>19</span></strong></p>
            </td>
            <td style="width: 256.55pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>วิทยาลัยการศึกษา</span></p>
            </td>
            <td style="width: 77.95pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:right;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>88.61</span></p>
            </td>
            <td style="width: 106.3pt;border-top: none;border-left: none;border-bottom: 1pt solid windowtext;border-right: 1pt solid windowtext;padding: 0cm 5.4pt;height: 25.2pt;vertical-align: bottom;">
                <p style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;line-height:normal;font-size:15px;font-family:"Calibri",sans-serif;text-align:center;'><span style='font-size:21px;font-family:"TH Niramit AS";color:black;'>A</span></p>
            </td>
        </tr>
    </tbody>
</table><br><br>
    </div>  -->
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,Prop
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
import {
  Web
} from '@/store/web'
import All from '@/components/ReportUp/All.vue'
import Agency from '@/components/ReportUp/Agency.vue'
import _ from 'lodash'
// import UpIIT from './UpIIT.vue'
// import UpEIT from './UpEIT.vue'
// import UpOIT from './UpOIT.vue'
import XLSX from 'xlsx'
@Component({
  components: {
    All,Agency //UpIIT,UpEIT,UpOIT,
  },
})
export default class Home extends Vue {

  @Prop({default:false})
  private debug:any;

  appSetting:any = {}
  year: any = '2566'
  response:boolean = false
  private years:any = []
 private xyeard = {"year":"2565","iit":false,"oit":true,"eit":false,"oit_link":false,"year_result":[{"year":"2563","open":true},{"year":"2564","open":true},{"year":"2565","open":true},{"year":"2566","open":true}]}
  async created() {
    this.debug = true
   
    this.appSetting = this.xyeard //await Core.getHttp(`/setting/app/`)
    console.log('setting',this.appSetting);
    if(!this.debug){
      this.years =  await _.filter(this.appSetting.year_result,{open:true})
    }else{
      this.years = this.appSetting.year_result
    }

    if(this.years[0]){
      this.year = this.years[this.years.length-1].year
    }
    await this.loadData();

  }


  async loadData(){
    this.response = false
    await Web.switchLoad(true)
    this.response = true;
    await Web.switchLoad(false)
  }





  prePrint(){
    window.print();
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
</style>
