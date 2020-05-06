import {Message} from "element-ui";
export function $mes(mes,type,func) {
  return  Message({
       showClose: true,
       message: mes,
       type: type
    })
}
