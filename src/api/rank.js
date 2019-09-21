import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios';

export function getTopList() {
  return axios.get("/api/getRank").then((resp)=>{
      return Promise.resolve(resp.data);
  })
}

export function getMusicList(topId){

  const url = '/api/getRankList'
  const data = Object.assign({}, commonParams, {
      // data: detail:{
      //   module:"musicToplist.ToplistInfoServer",
      //   method:"GetDetail",
      //   param:{
      //     topId:topId,
      //     offset:0,
      //     num:20
      //   }
      // }
    data: `{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":${topId},"offset":0,"num":20}}}`
  });
  return axios.get(url,{
    params: data
  }).then((resp) => {
    return Promise.resolve(resp.data);
  })
}


export function getMvList() {
  const url = '/api/mv';
  const data = Object.assign({}, commonParams, {
    data: `{"request":{"method":"get_video_rank_list","param":{"rank_type":0,"area_type":0,"required":["vid","name","singers","cover_pic","pubdate"]},"module":"video.VideoRankServer"}}`
  })
  return axios.get(url,{
    params: data
  }).then((resp) => {
    return Promise.resolve(resp.data);
  });
}