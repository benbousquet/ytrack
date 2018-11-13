<template>
  <div>
    <!-- 
    STATE 1
    First game state (form)
    DESKTOP 
    -->
    <v-container v-if="state == 1" class="cardStyle" hidden-sm-only hidden-xs-only hidden-md-only>
      <h1 style="text-align: center; margin-bottom: 20px;">yTrack</h1>
      <v-card class="center">
        <v-container>
          <h2 style="padding-bottom: 5%;">Join a game</h2>
          <v-text-field 
           class="gamekeyInput" 
           label="Game Pin" 
           outline 
           v-model="gameID">
          </v-text-field>
          <v-btn v-on:click="joinGame()" color="success">
            join
          </v-btn>
        </v-container>
      </v-card>
      <h1 style="text-align: center; margin: 30px;">
        or
      </h1>
      <v-card class="center">
        <v-container>
          <v-btn v-on:click="makeGame()" color="success">
            create
          </v-btn>  
        </v-container>
      </v-card>
    </v-container>
    <!-- LAPTOP -->
    <v-container v-if="state == 1" class="cardStyle" hidden-lg-only hidden-xl-only hidden-xs-only>
      <h1 style="text-align: center; margin-bottom: 20px;">yTrack</h1>
      <v-card class="centerLaptop">
        <v-container>
          <h2 style="padding-bottom: 5%;">Join a game</h2>
          <v-text-field 
           class="gamekeyInput" 
           label="Game Pin" 
           outline 
           v-model="gameID">
          </v-text-field>
          <v-btn v-on:click="joinGame()" color="success">
            join
          </v-btn>
        </v-container>
      </v-card>
      <h1 style="text-align: center; margin: 30px;">
        or
      </h1>
      <v-card class="centerLaptop">
        <v-container>
          <v-btn v-on:click="makeGame()" color="success">
            create
          </v-btn>  
        </v-container>
      </v-card>
    </v-container>
    <!-- MOBILE -->
    <v-container v-if="state == 1" class="cardStyle" hidden-lg-only hidden-xl-only hidden-md-only hidden-sm-only>
      <h1 style="text-align: center; margin-bottom: 20px;">yTrack</h1>
      <v-card>
        <v-container>
          <h2 style="padding-bottom: 5%;">Join a game</h2>
          <v-text-field 
           class="gamekeyInput" 
           label="Game Pin" 
           outline 
           v-model="gameID">
          </v-text-field>
          <v-btn v-on:click="joinGame()" color="success">
            join
          </v-btn>
        </v-container>
      </v-card>
      <h1 style="text-align: center; margin: 30px;">
        or
      </h1>
      <v-card>
        <v-container>
          <v-btn v-on:click="makeGame()" color="success">
            create
          </v-btn>  
        </v-container>
      </v-card>
    </v-container>

    <!-- STATE 2
    This section is for specifically the player that creates the game 
    DESKTOP
    -->
    <v-container v-if="state == 2" class="cardStyle" hidden-sm-only hidden-xs-only hidden-md-only>
      <v-card class="center">
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             outline
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="createGame()">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- Laptop -->
    <v-container v-if="state == 2" class="cardStyle" hidden-lg-only hidden-xl-only hidden-xs-only>
      <v-card class="centerLaptop">
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             outline
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="createGame()">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- Mobile -->
    <v-container v-if="state == 2" class="cardStyle" hidden-lg-only hidden-xl-only hidden-md-only hidden-sm-only>
      <v-card>
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             outline
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="createGame()">submit</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>

    <!-- STATE 3
    This section should be for people who join the game
    DESKTOP -->
    <v-container v-if="state == 3" class="cardStyle" hidden-sm-only hidden-xs-only hidden-md-only>
      <v-card class="center">
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="addPlayer()">join</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- LAPTOP -->
    <v-container v-if="state == 3" class="cardStyle" hidden-lg-only hidden-xl-only hidden-xs-only>
      <v-card class="centerLaptop">
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="addPlayer()">join</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- Mobile -->
    <v-container v-if="state == 3" class="cardStyle" hidden-lg-only hidden-xl-only hidden-md-only hidden-sm-only>
      <v-card>
        <v-container>
          <v-card-text>
            <h2 style="padding-bottom: 5%;">Choose a name!</h2>
            <v-text-field
             label="Name"
             v-model="name">
            </v-text-field>
            <v-btn color="success" v-on:click="addPlayer()">join</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>

    <!-- STAGE 4
    The lobby. In this lobby you can add points as well 
    DESKTOP -->
    <v-container v-if="state == 4" class="cardStyle" hidden-sm-only hidden-xs-only hidden-md-only>
      <v-card class="center">
        <v-container>
          <v-card-text>
            <h2>Share this key with your friends: </h2><p class="gameKey">{{gameID}}</p>
            <div class="scoreboard">
              <!-- <ul>
                <li v-for="player in players" v-bind:key="player">
                  {{ player }}, {{points[players.indexOf(player)]}}
                </li>
              </ul> -->
              <v-list>
                <v-list-tile
                  v-for="player in players"
                  :key="player"
                  @click=""
                >
                  <v-list-tile-content>
                    <b><v-list-tile-title v-text="player"></v-list-tile-title></b>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <p>{{points[players.indexOf(player)]}} <i>points</i></p>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
            <!-- <div v-if="players.length = 1" class="scoreboard">
              <h3>Invite some friends to start!</h3>
            </div> -->
          </v-card-text>
          <v-card-text>
            <h2>Add Points</h2>
            <v-text-field
             label="amount"
             v-model.number="increments">
            </v-text-field>
            <v-btn color="success" v-on:click="addPoints()">add</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- LAPTOP -->
    <v-container v-if="state == 4" class="cardStyle" hidden-lg-only hidden-xl-only hidden-xs-only hidden-sm-only>
      <v-card class="centerLaptop">
        <v-container>
          <v-card-text>
            <h2>Share this key with your friends: </h2><p class="gameKey">{{gameID}}</p>
            <div class="scoreboard">
              <!-- <ul>
                <li v-for="player in players" v-bind:key="player">
                  {{ player }}, {{points[players.indexOf(player)]}}
                </li>
              </ul> -->
              <v-list>
                <v-list-tile
                  v-for="player in players"
                  :key="player"
                  @click=""
                >
                  <v-list-tile-content>
                    <b><v-list-tile-title v-text="player"></v-list-tile-title></b>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <p>{{points[players.indexOf(player)]}} <i>points</i></p>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
            <!-- <div v-if="players.length = 1" class="scoreboard">
              <h3>Invite some friends to start!</h3>
            </div> -->
          </v-card-text>
          <v-card-text>
            <h2>Add Points</h2>
            <v-text-field
             label="add points"
             v-model.number="increments">
            </v-text-field>
            <v-btn color="success" v-on:click="addPoints()">add</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- Mobile -->
    <v-container v-if="state == 4" class="cardStyle" hidden-lg-only hidden-xl-only hidden-md-only>
      <v-card>
        <v-container>
          <v-card-text>
            <h2>Share this key: </h2><p class="gameKey">{{gameID}}</p>
            <div class="scoreboard">
              <v-list>
                <v-list-tile
                  v-for="player in players"
                  :key="player"
                  @click=""
                >
                  <v-list-tile-content>
                    <b><v-list-tile-title v-text="player"></v-list-tile-title></b>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <p>{{points[players.indexOf(player)]}} <i>points</i></p>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <!-- <ul>
                <li v-for="player in players" v-bind:key="player">
                  {{ player }}, {{points[players.indexOf(player)]}}
                </li>
              </ul> -->
            </div>
            <!-- <div v-if="players.length = 1" class="scoreboard">
              <h3>Invite some friends to start!</h3>
            </div> -->
          </v-card-text>
          <v-card-text>
            <h2>Add Points</h2>
            <v-text-field
             label="add points"
             v-model.number="increments">
            </v-text-field>
            <v-btn color="success" v-on:click="addPoints()">add</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-container>
    <!-- Alert -->
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
      headers: [
        {
          text: 'Scores',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Points', value: 'points' },
      ],
      playersRef: null,
      players: null,
      increments: 0, //number to add
      points: null,
      state: 1, 
      name: null,
      gameID: null,
      snackbarColor: 'success',
      playerNumber: null,
      snackbar: false,
      snackbarText: null,
      timeout: 2000,
      snackbarPos: true,
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
    alert (text, purpose) {
      this.snackbarText = text;
      this.snackbar = true;
      this.snackbarColor = purpose
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
      this.alert("Game created!", "success");
      this.state = 4;
      this.playerNumber = 0;
    },

    //The players who join the game that has been created
    joinGame () {
      if(this.gameID == null || this.gameID == "") {
        this.alert("You need to enter a Game Key!", "error");
        return;
      }
      console.log(this);
      this.playersRef = gamesRef.child(this.gameID);
      console.log('after')
      this.playersRef.on("value", (snap) => { //make it real time referencing the players 
        Object.assign(this, snap.val()); //assigns the object to the number designated: 1, 2, 3, 4, 5...
        console.log(this)
      }) 
      this.alert("Joined Game!", "success")
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
.centerLaptop {
  margin: auto;
  width: 60%;
}
.cardStyle {
  margin-top: 7%;
}
h1 {
  font-size: 55px;
  color: white;
  text-shadow: 0px 1px 1px black;
}
.scoreboard {
  margin-top: 5%;
}
.gameKey{
  color: teal;
  font-size: 25px;
}
</style>
