import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
//import NotificationImportant from "@material-ui/core/NotificationImportant";
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './styles';

class ChatListComponent extends React.Component {
    constructor()
    {
        super()
        this.state={
            selectedChat:null,
            newChatFormVisible:false,
            email:null,
            chats:[]
        }
    }
    render()
    {

        const {classes}=this.props;
       if(this.props.chats?this.props.chats.length>0:""){
        return (
            <main className={classes.root}>
                <Button variant='container'
                fullwidth
                color='primary'
                className={classes.newChatBtn}
                onClick={this.newChat}></Button>
                <List>
                    {
                        this.props.chats.map((_chat,_index)=>{
                            return(
                                <div key={_index}>
                                <ListItem onClick={()=>this.selectChat(_index)}
                                className={classes.listItem}
                                selected={this.props.selectedChatIndex === _index}
                                alignItems='flex-start'>
                                    <ListItemAvatar>
                                        <Avatar alt='avatar'>{_chat.users.filter(_user=> _user !==this.props.userEmail)[0].split('')[0]}</Avatar>
                                    </ListItemAvatar>
                              
                                <ListItemText primary={_chat.users.filter(_user=>_user !== this.props.userEmail)[0]}
                                secondary={
                                    <React.Fragment>
                                        <Typography component='span' color='textPrimary'>
                                            {
                                                _chat.messages[_chat.messages.length-1].message.substring(0,30)
                                            }
                                        </Typography>
                                    </React.Fragment>
                                }>
    
                                </ListItemText>
                                </ListItem>
                                <Divider></Divider>
                                </div>
    
                            )
                        })
                    }
            
            </List>
            </main>
          
           )
           

       }
       else{
         return(
            <main className={classes.root}>
            <Button variant='contained'
            fullwidth
            color='primary'
            onClick={this.newChat}
            className={classes.newChatBtn}>New Message</Button>
            <List></List>
          </main>

         )
          
       }
      
    }

    newChat=()=>
    {
        console.log('new chat')
    }
    selectChat = (index) =>{
        this.props.selectChatFn(index);
    }

   
}
export default withStyles(styles)(ChatListComponent)

