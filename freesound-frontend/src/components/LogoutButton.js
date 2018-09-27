import React from 'react'
import {logoutAction} from '../reducers/LoginReducer'
import {Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
class LogoutButton extends React.Component{
		handleSubmit = ()=>{
			this.props.logoutAction()
		}
		render(){
			return(
					<Button onClick={this.handleSubmit}type="button">logout</Button>
			)
		}

}
const mapStateToProps = (state)=>{
	return{
		login:state.login
	}
}
const dispatchProps ={
	logoutAction
}
const ConnectedLogoutButton = connect(mapStateToProps,dispatchProps)(LogoutButton)
export default ConnectedLogoutButton