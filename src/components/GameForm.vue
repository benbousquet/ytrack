<template>
  <div>
    <!-- First game state (form) -->
    <v-container v-if="state == 1">
      <v-card>
        <v-card-title>
          <h1>enter game key</h1>
        </v-card-title>
        <v-container>
          <v-text-field label="Game ID" v-model="gameID">
          </v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn v-on:click="click()" color="success">
            join
          </v-btn>
          <v-btn v-on:click="makeGame()" color="success">
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Second game state (waiting for players) -->
    <v-container v-if="state == 2">
      <v-card>
        <v-container>
          <v-card-text>
            <h1>Waiting for players!</h1>
            <h2>Share game code with friends: {{gameID}}</h2>
            <v-text-field
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import db from './firebaseInit';
import firebase from 'firebase';
var database = firebase.database()
var randomstring = require("randomstring");
var gamesRef = database.ref('games');
export default {
  data () {
    return {
      state: 1,
      name: null,
      gameID: null,
    }
  },
  methods: {
    ...mapActions(["changeGame"]),
    ...mapGetters(["getName"]),
    makeGame () {
      var gameName = randomstring.generate(5);
      gamesRef.push({name: gameName, players: [], scores: []});
      this.changeGame(gameName);
      this.gameID = gameName;
      this.state = 2;
    },
    joinGame () {

    }
  },
  created () {
    gamesRef.on()
  }
}
</script>
