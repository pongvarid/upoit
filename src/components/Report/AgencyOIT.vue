<template>
<div class="relative md:pt-32 pb-32 pt-12" style="z-index:1;" >
 
    <div class="flex" >
        <h2 class="text-xl font-bold m-2">
     
            <v-icon>mdi-calendar</v-icon> ปีงบประมาณ {{year.year}}
        </h2>
        <v-spacer></v-spacer>
        <ExportOIT :data="rates" />
    </div>

    <v-toolbar color="bg-purple-x"   dark>
        <h2 class="text-xl font-bold">ผลการประเมิน OIT ({{agency.name}})</h2>

        <v-spacer></v-spacer>
 
        <!-- <h2><span class="font-bold">ผลรวม</span> {{ ((oitA.score + oitB.score) / 2).toFixed(2)}} คะแนน | <v-btn x-small fab color="blue">40%</v-btn> {{all.oit}} คะแนน</h2> -->
        <h2><span class="font-bold">ผลรวม</span> {{ ((isScore43/43)*100).toFixed(2)}} คะแนน | <v-btn x-small fab color="blue">40%</v-btn> {{all.oit}} คะแนน</h2>

    </v-toolbar>

    <br>
    <v-expansion-panels multiple  v-model="panel">
        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-toolbar flat>
                    <h2 class="text-xl text-purple-600 font-bold"><i class="em em-card_index_dividers" aria-role="presentation" aria-label=""></i> การเปิดเผยข้อมูล </h2>
                    <v-spacer></v-spacer>
                    <!-- <h2 class="text-purple-600 font-bold"> {{oitA.score}} คะแนน</h2> -->
                </v-toolbar>

            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">ข้อมูลพื้นฐาน</h2>
                </v-toolbar>

                <h2 class="m-6 p-2 bg-gray-200">ข้อมูลพื้นฐาน</h2>

                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number <= 6">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <h2 class="m-6 p-2 bg-gray-200">ข่าวประชาสัมพันธ์</h2>

                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number > 6 && oit.number <= 9">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">การบริหารงาน</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">แผนการดำเนินงาน</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 10 && oit.number <= 12">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <h2 class="m-6 p-2 bg-gray-200">การปฏิบัติงาน</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 13 && oit.number < 14">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <h2 class="m-6 p-2 bg-gray-200">การให้บริการ</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 14 && oit.number <= 17">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold"> การบริหารเงินงบประมาณ</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">แผนการใช้จ่ายงบประมาณประจำปี</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 18 && oit.number <= 20">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <h2 class="m-6 p-2 bg-gray-200">การจัดซื้อจัดจ้างหรือการจัดหาพัสดุ</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 21 && oit.number <= 24">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">การบริหารและพัฒนาทรัพยากรบุคคล</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">การบริหารและพัฒนาทรัพยากรบุคคล</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 25 && oit.number <= 28">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">การส่งเสริมความโปร่งใส</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">การจัดการเรื่องร้องเรียนการทุจริต</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 29 && oit.number <= 31">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <h2 class="m-6 p-2 bg-gray-200">การเปิดโอกาสให้เกิดการมีส่วนร่วม</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 32 && oit.number <= 33">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header>
                <v-toolbar flat>
                    <h2 class="text-xl text-purple-600 font-bold"><i class="em em-card_index_dividers" aria-role="presentation" aria-label=""></i> การป้องกันการทุจริต </h2>
                    <v-spacer></v-spacer>
                    <!-- <h2 class="text-purple-600 font-bold">{{oitB.score}} คะแนน</h2> -->
                </v-toolbar>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">การดำเนินการเพื่อป้องกันการทุจริต</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">เจตจำนงสุจริตของผู้บริหาร</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 34 && oit.number <= 35">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <h2 class="m-6 p-2 bg-gray-200">การประเมินความเสี่ยงเพื่อการป้องกันการทุจริต</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 36 && oit.number <= 37">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <h2 class="m-6 p-2 bg-gray-200">การเสริมสร้างวัฒนธรรมองค์กร</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 38 && oit.number < 39">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

                <h2 class="m-6 p-2 bg-gray-200">การเสริมสร้างวัฒนธรรมองค์กร</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 39 && oit.number <= 41">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>
                <v-toolbar dense color="light-blue lighten-4" flat>
                    <h2 class="font-semibold">มาตรการภายในเพื่อป้องกันการทุจริต</h2>
                </v-toolbar>
                <h2 class="m-6 p-2 bg-gray-200">มาตรการส่งเสริมความโปร่งใสและป้องกันการทุจริตภายในหน่วยงาน</h2>
                <v-expansion-panel v-for="(oit,index) in rates" :key="index" v-if="oit.number >= 42 && oit.number <= 43">

                    <v-expansion-panel-header>
                        <v-toolbar flat>
                            <h2 class="text-xl"><span class="text-purple-600 font-bold">O-{{oit.number}} &nbsp;&nbsp;</span>&nbsp;&nbsp;{{oit.name}}</h2>
                            <v-spacer></v-spacer>
                            <h2 class="text-purple-600 font-bold">{{oit.score}}</h2>
                        </v-toolbar>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-3/5" v-if="appSetting.oit_link">
                                <v-timeline align-top dense>
                                    <v-timeline-item v-for="result,i in oit.detail" :key="i" color="purple" small>
                                        <h2 class="font-bold text-base">{{result.name}}</h2>
                                        <span class="text-sm text-purple-900 ">สถานะ : {{result.register_type}}</span>
                                        ` <p class="text-sm">{{result.ref}}</p>`
                                        <v-btn @click="openLink(result.urls)" dark color="purple" small>
                                            <v-icon>mdi-play</v-icon>เปิดลิ้ง
                                        </v-btn>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                            <div class="w-full md:w-2/5">
                                <v-timeline align-top dense>
                                    <v-timeline-item color="blue" small>
                                        <h2 class="font-bold text-xl text-blue-500">ผลประเมิน</h2>
                                        <hr>
                                        <h2><b>ผลการตรวจ :</b> {{oit.status}} </h2>
                                        <h2><b>คะแนน :</b> {{oit.score}} </h2>
                                        <p><b>ข้อเสนอเเนะผู้ตรวจ :</b> {{oit.comment}} </p>
                                    </v-timeline-item>
                                </v-timeline>
                            </div>
                        </div>
                    </v-expansion-panel-content>

                </v-expansion-panel>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>

</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from 'vue-property-decorator';

import { Web } from "@/store/web";
import {
    Auth
} from '@/store/auth'
import {
    Core
} from '@/store/core'
import {
    User
} from '@/store/user'
import _ from 'lodash'
import ExportOIT from './ExportOIT.vue'
@Component({
    components: {
        ExportOIT
    },
    props: {
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    }
})
export default class Home extends Vue {
    @Prop({ default: 7 })
    agencyData: any;

    @Prop({ default: { oit: 0 } })
    all: any;

    @Prop({ default: '2565' })
    yearData: any;

    @Prop({ default: '2563' })
    lists: any;

    private year: any = []
    private rates: any = []
    private response: boolean = false
    private panel: any = [1, 0]
    private agency: any = {};
    private oitA: any = ''
    private oitB: any = ''
    isScore43:any = 0

    private data: any = [];

    private status: any = []

    public async created() {

        await this.run()

    }
    result: any = []
    appSetting: any = { oit_link: false }
    private async run() {
        await Web.switchLoad(true)
        this.appSetting = await Core.getHttp(`/setting/app/`)
        this.agency = await Core.getHttp(`/api/ita/v1/agency/${this.agencyData}/`)
        this.year = await Core.getHttp(`/api/ita/v1/year/`)
        this.year = await _.find(this.year, { year: this.yearData })
        if (this.year) {
            this.rates = await Core.getHttp(`/api/ita/v2/rate/${this.year.id}/`)
            this.result = await Core.getHttp(`/api/oit/v1/evaluateoit/?agency=${this.agencyData}&rate__year=${this.year.id}`)
            let data  = _.sumBy(this.result,(r:any)=>{return r.score}) 
            this.isScore43 = data
            this.data = await Core.getHttp(`/api/ita/v1/rateresult/?rate__year=${this.year.id}&agency=${this.agencyData}`)
            this.status = await Core.getHttp(`/api/ita/v1/ratestatus/`)
        
           
            this.oitA = await _.find(this.lists, { name: 'การเปิดเผยข้อมูล' })
            this.oitB = await _.find(this.lists, { name: 'การป้องกันการทุจริต' })
            await this.generateTable()
            await Web.switchLoad(false)
            this.response = true;
        }
        await Web.switchLoad(false)

    }

    private async generateTable() {
        for (let i = 0; i < this.rates.length; i++) {
            // console.log(this.rates[i].id);
            let result: any = _.filter(this.result, {
                'rate': this.rates[i].id
            })
            //this.rates[i].evaluate  = await this.getEvaluate(this.rates[i].id)

            let score = ((await _.sumBy(result, 'score')) / 1) * 100
            this.rates[i].score = score + "%"
            this.rates[i].score_raw = score
            this.rates[i].detail = _.filter(this.data, { rate: this.rates[i].id })

            this.rates[i].comment = (result[0]) ? result[0].comment : ''
            this.rates[i].status = (await _.find(this.status, { id: result[0].rate_status })).name
        }
    }

    private genScore() {

    }
    private openLink(url: string) {
        window.open(url, '_blank');
    }

}
</script>

<style>
.f-white {
    color: white !important;
}
</style>
