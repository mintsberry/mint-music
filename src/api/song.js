import {commonParams, options} from './config'
import axios from 'axios'
import jsonp from '../common/js/jsonp'

export function getSong(songmid) {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const url ='/api/getMusic'
  const data = Object.assign({}, commonParams, {
    // loginUin: 0,
    // format: 'json',
    // platform: 'yqq.json',
    // data: `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"4274103134","songmid":["${songmid}"],"uin":"0","platform":"20"}}}`
    g_tk: 5381,
    loginUin: 972117204,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"4274103134","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"4274103134","songmid":["${songmid}"],"songtype":[0],"uin":"972117204","loginflag":1,"platform":"20"}},"comm":{"uin":972117204,"format":"json","ct":24,"cv":0}}`
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
  // const url = '/api/getMusic';
  // const oData = {
  //   req_0: {
  //     module: 'vkey.GetVkeyServer',
  //     method: 'CgiGetVkey',
  //     param: {
  //       guid: '4404667995',
  //       songmid: [songmid],
  //       songtype: [0],
  //       uin: '1666707506',
  //       loginflag: 1,
  //       platform: '20',
  //     },
  //   },
  //   comm: {
  //     uin: 1666707506,
  //     format: 'json',
  //     ct: '20',
  //     cv: 0,
  //   },
  // };
  // const data = {
  //   g_tk: 1294813765,
  //   loginUin: 1666707506,
  //   hostUin: 0,
  //   format: 'jsonp',
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   platform: 'yqq',
  //   notice: 0,
  //   needNewCode: 0,
  //   data: JSON.stringify(oData),
  // };

  // return axios.get(url, {
  //   params: data,
  // }).then(res => Promise.resolve(res.data));
}

export function getLyric(songmid) {
  const url = '/api/lyric';
  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    pcachetime: +new Date(),
    g_tk:67232076,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
