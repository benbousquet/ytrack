<template>
  <div>
    <!-- First game state (form) -->
    <v-container v-if="state == 1" class="firstStage">
      <h1 style="text-align: center; margin-bottom: 20px;">yTrack</h1>
      <v-card class="center">
        <v-card-title>
          <h2 style="center">Join a game</h2>
        </v-card-title>
        <v-container>
          <v-text-field outline label="Game Pin" solo v-model="gameID">
          </v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn v-on:click="joinGame()" color="success">
            join
          </v-btn>
        </v-card-actions>
      </v-card>
      <h1 style="text-align: center; margin: 30px;">
        or
      </h1>
      <v-card class="center">
        <v-card-actions>
          <v-flex>
            <v-btn class="align-center" style="margins: 0 auto; float: left;" v-on:click="makeGame()" color="success">
              create
            </v-btn>  
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- This section is for specifically the player that creates the game -->
    <v-container v-if="state == 2">
      <v-card>
        <v-container>
          <v-card-text>
            <h1>What is your name, game creator?</h1>
            <v-text-field
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="createGame()">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>

    <!-- This section should be for people who join the game -->
    <v-container v-if="state == 3">
      <v-card>
        <v-container>
          <v-card-text>
            <h1>What is your name?</h1>
            <v-text-field
             label="name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="addPlayer()">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>

    <!-- The lobby. In this lobby you can add points as well -->
    <v-container v-if="state == 4">
      <v-card>
        <v-container>
          <v-card-text>
            <h1>Share this key with your friends: {{gameID}}</h1>
              <ul id="example-1">
              <li v-for="player in players" v-bind:key="player">
                {{ player }}, {{points[players.indexOf(player)]}}
              </li>
            </ul>
          </v-card-text>
          <v-card-text>
            <h1>Add Points</h1>
            <v-text-field
             label="add points"
             v-model.number="increments">
            </v-text-field>
            <v-btn color="success" v-on:click="addPoints()">add</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      :top="snackbarPos"
    >
      {{ snackbarText }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
        
<script>
// initializations
import { mapActions, mapGetters } from 'vuex';
import db from './firebaseInit';
import firebase from 'firebase';
import randomstring from 'randomstring';
var database = firebase.database()
var gamesRef = database.ref('games');
export default {
  data () {
    return {
      playersRef: null,
      players: null,
      increments: 0, //number to add
      points: null,
      state: 1, 
      name: null,
      gameID: null,
      color: 'success',
      playerNumber: null,
      snackbar: false,
      snackbarText: null,
      timeout: 2000,
      snackbarPos: "true",
    }
  },
  methods: {
    ...mapActions(["addPlayer"]),
    ...mapActions(["changeGame"]),
    ...mapActions(["changePlayers"]),
    ...mapActions(["getGame"]),
    ...mapActions(["getPlayers"]),
    ...mapGetters(["getName"]),

    //first person who creates the game
    makeGame () {
      var game = gamesRef.push({players: [], scores: []});
      this.changeGame(game.key);
      this.gameID = game.key;
      this.state = 2;
    },
    //after making a name, the lobby is created, along with his name
    alert (text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
    createGame () {
      var gamekey = randomstring.generate(5);
      this.gameID = gamekey;
        gamesRef.child(gamekey).set({
          points: [0],
          players: [this.name]
        });
      this.playersRef = gamesRef.child(this.gameID);
      this.playersRef.on("value", (snap) => {
        Object.assign(this, snap.val());
      }) 
      alert("Game created!");
      this.state = 4;
      this.playerNumber = 0;
    },

    //The players who join the game that has been created
    joinGame () {
      if(this.gameID == null || this.gameID == "") {
        this.alert("You need to enter a Game Key!");
        return;
      }
      console.log(this);
      this.playersRef = gamesRef.child(this.gameID);
      console.log('after')
      this.playersRef.on("value", (snap) => { //make it real time referencing the players 
        Object.assign(this, snap.val()); //assigns the object to the number designated: 1, 2, 3, 4, 5...
        console.log(this)
      }) 
      this.alert("Joined Game!")
      this.state = 3;
    },
    //after making their name, they are inputted into the list of players and moved to the lobby
    addPlayer () {
      this.playerNumber = this.players.length;
      gamesRef.child(this.gameID).set({
        points: [...this.points, 0],
        players: [...this.players, this.name]
      });
      this.state = 4;
    },

    //add points that have been inputted by the players
    addPoints () {
      var points = this.points;
      points[this.playerNumber] += this.increments;
      gamesRef.child(this.gameID).set({
          points,
          players: this.players
      });
    },
  },

}
</script>

<style>
.center {
  margin: auto;
  width: 30%;
}
.firstStage {
  margin-top: 80px;
}
h1 {
  font-size: 55px;
  color: white;
  text-shadow: 0px 1px 1px black;
}
</style>
