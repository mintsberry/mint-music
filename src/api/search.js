import Axios from "axios";
import jsonp from '../common/js/jsonp'
import {options, commonParams} from './config'
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  return jsonp(url,{},options);
}

export function search(query, page, zhida) {
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  const url = "/api/search"
  const data = Object.assign({}, commonParams, {
    _: 1568455618078,
    g_tk: 5381,
    format: "json",
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    platform: "h5",
    needNewCode: 1,
    w: query ,
    zhidaqu: 1,
    catZhida: zhida,
    t: 0,
    flag: 1,
    ie: "utf-8",
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: "txt.mqq.all"
  })
  return Axios.get(url,{
    params: data
  }).then((resp)=>{
    return Promise.resolve(resp.data);
  })
}