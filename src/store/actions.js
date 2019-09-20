import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite, deleteFavorite} from '../common/js/cache'
import { type } from 'os'
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
  // commit(types.SET_FULL_SCREEN, true);
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

export const deleteSong = function({commit,state}, song) {
  let playList = state.playList.slice();
  let currentIndex = state.currentIndex;
  let pIndex = findIndex(playList,song);
  playList.splice(pIndex, 1)
  if (currentIndex > pIndex || currentIndex === playList.length){
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false);
  } else {
    commit(types.SET_PLAYING_STATE, true);  
  }
}
// export function loadSearch() {
//   return Storage.length(SEARCH)
// }

export const deleteSongList = function({commit}){
  commit(types.SET_PLAYLIST,[]);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false);
}

export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song));
}

export const saveFavoriteList = function({commit},song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit},song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

function findIndex(list, song) {
  return list.findIndex(item=>{
    return item.id === song.id
  })
}
