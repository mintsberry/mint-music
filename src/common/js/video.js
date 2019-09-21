export default class Video {
  constructor({cover_pic,name,pubdate,vid,singers},{pic_url},{week_play}){
    this.cover = cover_pic;
    this.name = name;
    this.pudate = pubdate;
    this.vid  = vid;
    this.singers = filterSinger(singers);
    this.play = week_play;
    this.pic = pic_url;
  }
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

