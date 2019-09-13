import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios';

export function getTopList() {
  return axios.get("/api/getRank").then((resp)=>{
      return Promise.resolve(resp.data);
  })
}