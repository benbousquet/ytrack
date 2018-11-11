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
          <v-btn v-on:click="joinGame()" color="success">
            join
          </v-btn>
          <v-btn v-on:click="makeGame()" color="success">
            create
          </v-btn>
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
      playerNumber: null,
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

      this.state = 4;
      this.playerNumber = 0;
    },

    //The players who join the game that has been created
     joinGame () {
      this.playersRef = gamesRef.child(this.gameID);
      this.playersRef.on("value", (snap) => { //make it real time referencing the players 
        Object.assign(this, snap.val()); //assigns the object to the number designated: 1, 2, 3, 4, 5...
      }) 
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

  //template code I have no idea is the use for but Ben had this code here so it's probably important lol
  created () {
    gamesRef.on('child_changed', snapshot => {
      // if(this.)
      const updatedGame = this.messages.find(message => message.id === snapshot.key)
      updatedMessage.text = snapshot.val().text
      if (snapshot.val(). nickname!== this.nickname) {
        nativeToast({
          message: `Message edited by ${snapshot.val().nickname}`,
          type: 'info'
        })
      }
    })
  }
}
</script>
