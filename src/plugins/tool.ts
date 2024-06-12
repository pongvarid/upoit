import Vue from 'vue';
const inRange = (x: number, min: number, max: number) => {
    return ((x - min) * (x - max) <= 0);
  } 
  Vue.prototype.$inRange = inRange;
 Vue.prototype.$calculate = (i: any,o: any,e: any, rate: any) => {
    if((rate >= 95.00) && (i >= 95.00 && o >= 95.00 && e >= 95.00)  ){
        return 'ผ่านดีเยี่ยม' 
    }else if((rate >= 85.00 && rate <= 100) && (i >= 85.00 && o >= 85.00 && e >= 85.00) ){
        return 'ผ่านดี'
    }else if (inRange(rate, 85.00, 100)) {
        return 'ผ่าน'
    }
    else if (inRange(rate, 70.00, 84.99)) {
        return 'ต้องปรับปรุง'
    }
    else if (inRange(rate, 0, 69.99)) {
        return 'ต้องปรับปรุงโดยด่วน'
    }  else {
        return 'ไม่ทราบค่า'
    }
  }