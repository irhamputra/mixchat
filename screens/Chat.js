import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../db/Firebase";

class Chat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount(): void {
    // Firebase.shared.assignChatID(this.props.navigation.getParam("chatRoom"));
    Firebase.shared.on(message => {
      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.messages, message)
      }));
    });
  }

  componentWillUnmount(): void {
    Firebase.shared.off();
  }

  get user() {
    return {
      name: this.props.navigation.getParam("name"),
      _id: Firebase.shared.uid
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
        initialText=""
        alignTop={false}
      />
    );
  }
}

export default Chat;
