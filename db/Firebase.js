import * as firebase from "firebase";

class Firebase {
  constructor() {
    this.init();
    this.ChatID = "";
  }

  init = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyAS6FC0L0rZjUE73X33M0hL2O2jtFNNEhA",
      authDomain: "mixchat-1fb7a.firebaseapp.com",
      databaseURL: "https://mixchat-1fb7a.firebaseio.com",
      projectId: "mixchat-1fb7a",
      storageBucket: "",
      messagingSenderId: "827744663280",
      appId: "1:827744663280:web:f6ce0de4d456715e"
    });
  };

  observeAuth = callback => {
    try {
      firebase.auth().onAuthStateChanged(callback);
    } catch (e) {
      alert(e)
    }
  };

  createUser = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      alert(e)
    }
  };

  logOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      alert(e);
    }
  };

  get ref() {
    return firebase.database().ref(`chats/${this.ChatID}`);
  }

  get uid() {
    return firebase.auth().currentUser.uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  assignChatID(ChatID) {
    this.ChatID = ChatID;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp
      };

      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  on = callback => {
    this.ref.limitToLast(20).on("child_added", snapshot => {
      callback(this.parse(snapshot));
    });
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    return {
      _id,
      timestamp,
      text,
      user
    };
  };

  off = () => {
    this.ref.off();
  };
}

Firebase.shared = new Firebase();
export default Firebase;
