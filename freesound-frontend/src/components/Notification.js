import React from 'react';
import { connect } from 'react-redux'
import {Message} from 'semantic-ui-react'
class Notification extends React.Component{
	render(){
 		return (this.props.notifications.map((notification,index)=><Message key={index} success={notification.level==='success'} error={notification.level==='error'} content={notification.content}/>))		
  	}
}
const mapStateToProps =(state)=>{
	return{
		notifications: state.notifications
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification