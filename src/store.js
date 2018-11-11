import Vue from 'vue'
import Vuex from 'vuex'
import db from './components/firebaseInit';
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameID: null,
    name: null,
    players: null,
    scores: null,
  },
  getters: {
    // get name
    getName(state) {
      return state.name;
    },
    // get gameID
    getGame(state) {
      return state.gameID;
    },
    // get players in game
    getPlayers(state) {
      return state.players
    },
    // get scores
    getScores(state) {
      return state.scores
    }
  },
  mutations: {
    // change player name
    changeName(state, newName) {
      state.name = newName;
    },
    // change game id
    changeGame(state, newGame) {
      state.gameID = newGame;
    },
    // add player
    addPlayer(state, player) {
      if(state.players == null) {
        state.players = [];
      }
      state.players.push(player);
    },
    // update player score
    updateScore(state, newScore) {
      state.newScore = newScore;
    }
  },
  actions: {
    changeName(context, name) {
      console.log('changed name to %s', name);
      context.commit('changeName', name);
    },
    changeGame(context, game) {
      console.log('changed game to %s', game);
      context.commit('changeGame', name)
    },
    addPlayer(context, player) {
      console.log('added %s to the game', player);
      context.commit('addPlayer', player);
    },
    updateScore(context, score) {
      console.log('changed game to %s', score);
      context.commit('changeGame', score)
    }
  }
})
