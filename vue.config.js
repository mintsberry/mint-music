// var express = require('express');
var axios = require('axios');
// var app = express();
// var apiRoutes = express.Router();
// app.use('/api', apiRoutes)
module.exports = {
  devServer: {
    before(app){
      app.get('/api/getDiscList', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/getMusic', function(req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data);
        }).catch((e) => {
          console.log(e);
        })
      });
      app.get('/api/lyric', function(req, res){
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response)=> {
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get('/api/getSongList', function(req, res) {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
        axios.get(url, {
          headers: {
            referer: `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`,
            host: 'u.y.qq.com',
            origin: 'https://y.qq.com'
          },
          params: req.query
        }).then((response)=> {
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get("/api/getRank", function(req,res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?_=1568362317751'
        axios.post(url, {
          "req_0": {
            "module": "musicToplist.ToplistInfoServer",
            "method": "GetAll",
            "param": {}
          },
          "comm": {
            "g_tk": 5381,
            "uin": 0,
            "format": "json",
            "ct": 23,
            "cv": 0
          }
        },{
          headers: {
            referer: 'https://y.qq.com/m/index.html',
            host: 'u.y.qq.com'
          }
        }).then((response)=> {
          res.json(response.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get('/api/getRankList',function(req,res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        return axios.get(url,{
          headers: {
            referer: 'https://u.y.qq.com',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((resp)=>{
          res.json(resp.data)
        }).catch((e)=>{
          console.log(e);
        })
      });
      app.get('/api/search',function(req,res) {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
        return axios.get(url,{
          headers: {
            referer: 'https://u.y.qq.com',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((resp)=>{
          res.json(resp.data)
        }).catch((e)=>{
          console.log(e);
        })
      })
    }
  }
}