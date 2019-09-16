import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch,deleteSearch,clearSearch} from '../common/js/cache'
export const selectPlay = function ({commit}, {list, index}){
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);  
}

export const randomPlay = function({commit, state},{list}){
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENT_INDEX, Math.random() * list.length | 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);  
}

export const insertSong = function({commit, state}, song) {
  let playList = state.playList.slice();
  console.log("TCL: insertSong -> playList", playList)
  let currentIndex = state.currentIndex;
  let fpIndex = findIndex(playList, song);
  currentIndex++;
  playList.splice(currentIndex, 0, song);
  if (fpIndex > -1){
    if(currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--
    } else { 
      playList.splice(fpIndex+1, 1);
    }
  }
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true); 
}

export const saveSearchHistory = function({commit},query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query){
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}){
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// export function loadSearch() {
//   return Storage.length(SEARCH)
// }

function findIndex(list, song) {
  return list.findIndex(item=>{
    return item.id === song.id
  })
}
