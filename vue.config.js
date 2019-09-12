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
        console.log(req.query.disstid);
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
    }
  }
}