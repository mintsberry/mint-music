import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios';

export function getMv(vids) {
  const url = '/api/mv';
  let data = Object.assign({}, commonParams, {
    data: `{"getMvUrl":{"module":"gosrf.Stream.MvUrlProxy","method":"GetMvUrls","param":{"vids":["${vids}"],"request_typet":10001}}}`
  })
  return axios.get(url,{
    params: data
  }).then((resp)=>{
    return Promise.resolve(resp.data);
  })
}