import React from 'react';
import { connect } from 'react-redux'
class Notification extends React.Component{
	render(){
  		console.log(this.props.notifications)
 		return (this.props.notifications.map(notification=><p>{notification}</p>))		
  	}
}
const mapStateToProps =(state)=>{
	return{
		notifications: state.notifications
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification