import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Firebase from "../db/Firebase";

const SignOut = props => {
  const signOut = async () => {
    await Firebase.shared.logOut();
    props.navigation.navigate("Auth");
  };
  return (
    <TouchableOpacity onPress={() => signOut()}>
      <AntDesign name="logout" size={25} />
    </TouchableOpacity>
  );
};

export default withNavigation(SignOut);
