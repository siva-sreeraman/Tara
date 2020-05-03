import React from 'react';
import ChatListComponent from '../chatlist/chatlist';
import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import { Button, withStyles} from  '@material-ui/core';
import styles from './styles';

const firebase = require("firebase");


class MessagesComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        }
    }

    render() {
        return (
            <div>

                <ChatListComponent 
                   newChatBthFn={this.newChatBthClicked}
                    selectChatFn={this.selectChat}
                    chats={this.state.charts}
                    userEmail={this.state.email}
                    selectedChatIndex={this.state.selectedChat}
                   
            
                ></ChatListComponent>
                {
                    this.state.newChatFormVisible?
                    null: <ChatViewComponent

                    user={this.state.email}
                    chat={this.state.chats[this.state.selectedChat]}
                    
                    ></ChatViewComponent>
                }
                { 
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBoxComponent> : null 
          }
               
                
                
                
                </div>
        );
    }


  submitMessage = (msg) => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
      .users
      .filter(_usr => _usr !== this.state.email)[0])
    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  }

  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await 
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  }
    selectChat = (chatIndex) => {
        this.setState({
            selectedChat: chatIndex
        })

    }
    newChatBthClicked = () => {
        this.setState({
            newChatFormVisible: true,
            selectedChat: null
        })

    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            await firebase
                .firestore()
                .collection('charts')
                .where('users', 'array-contains', _usr? _usr.email:"")
                .onSnapshot(async res => {
                    const chats = res.docs.map(_doc => _doc.data());
                    await this.setState({
                        email: _usr?_usr.email:"",
                        chats: chats
                    })
                    console.log(this.state)
                })

        })
    }
}

export default withStyles(styles)(MessagesComponent);