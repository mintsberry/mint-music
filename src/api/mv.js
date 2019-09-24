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

export function getMvInfoAndOther(vides){
  const url = `/api/mv`;
  let data = Object.assign({}, commonParams, {
    data: `{"comm":{"ct":24,"cv":4747474},"mvinfo":{"module":"video.VideoDataServer","method":"get_video_info_batch","param":{"vidlist":["${vides}"],"required":["vid","type","sid","cover_pic","duration","singers","video_switch","msg","name","desc","playcnt","pubdate","isfav","gmid","uploader_nick"]}},"other":{"module":"video.VideoLogicServer","method":"rec_video_byvid","param":{"vid":"${vides}","required":["vid","type","sid","cover_pic","duration","singers","video_switch","msg","name","desc","playcnt","pubdate","isfav","gmid","uploader_headurl","uploader_nick","uploader_encuin","uploader_uin","uploader_hasfollow","uploader_follower_num"],"support":1}}}`
  }) 
  return axios.get(url, {
    params: data
  }).then((resp)=>{
    return Promise.resolve(resp.data);
  })
}