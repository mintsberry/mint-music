import {playMode} from '../common/js/config'
import {loadSearch,loadPlay,loadFavorite} from '../common/js/cache'
const state = {
  singer: {
  },
  playing: false,
  playerDisplay: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  video: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state