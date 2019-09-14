import Axios from "_axios@0.19.0@axios";
import jsonp from '../common/js/jsonp'
import {options} from './config'
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  return jsonp(url,{},options);
}