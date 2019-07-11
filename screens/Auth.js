import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Firebase from "../db/Firebase";

const Auth = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    signInUser();
  }, []);

  const signInUser = () => {
    Firebase.shared.observeAuth(user => {
      try {
        if (user) {
          props.navigation.navigate("Chat", { name, email });
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  const onPress = async () => {
    try {
      if (email && password) {
        await Firebase.shared.createUser(email, password);
        props.navigation.navigate("Chat", { name, email });
      } else {
        alert("You must provide email and password");
      }
    } catch (e) {
      alert(e);
    }
  };

  const onRegister = () => {
    props.navigation.navigate("Register");
  };

  return (
    <View>
      <Text style={{ marginTop: 24, marginLeft: 24, fontSize: 24 }}>
        Enter name:
      </Text>
      <TextInput
        style={{
          height: 24 * 2,
          margin: 24,
          paddingHorizontal: 24,
          borderColor: "#111",
          borderWidth: 1
        }}
        placeholder="Full name"
        value={name}
        onChangeText={name => setName(name)}
      />

      <TextInput
        style={{
          height: 24 * 2,
          margin: 24,
          paddingHorizontal: 24,
          borderColor: "#111",
          borderWidth: 1
        }}
        placeholder="email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={{
          height: 24 * 2,
          margin: 24,
          paddingHorizontal: 24,
          borderColor: "#111",
          borderWidth: 1
        }}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />

      <TouchableOpacity onPress={() => onPress()}>
        <Text style={{ marginLeft: 24, fontSize: 24 }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onRegister()}>
        <Text style={{ marginTop: 24, marginLeft: 24, fontSize: 24 }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
