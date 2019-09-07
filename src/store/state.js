import {playMoode} from '../common/js/config'
const state = {
  singer: {
  },
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMoode.sequence,
  currentIndex: -1,
}

export default state