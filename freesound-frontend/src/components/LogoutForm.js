import React from 'react'
import {logoutAction} from '../reducers/LoginReducer'
import {Form,Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
class LogoutForm extends React.Component{
		handleSubmit = ()=>{
			this.props.logoutAction()
		}
		render(){
			return(
				<Segment inverted>
					<Form error inverted onSubmit={this.handleSubmit}>
						<Form.Button type="submit">logout</Form.Button>
					</Form>
				</Segment>
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
const ConnectedLogoutForm = connect(mapStateToProps,dispatchProps)(LogoutForm)
export default ConnectedLogoutForm