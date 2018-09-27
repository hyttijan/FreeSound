import React from 'react';
import {Redirect} from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import {getLoginAction} from '../reducers/LoginReducer'
import { connect } from 'react-redux'
class SignUpView extends React.Component{

	componentDidMount(){
		this.props.getLoginAction()
	}
	render(){ 
		return(
			<div>
				{this.props.login
				?
				<Redirect to={`/user/${this.props.login.id}`} />
				:
			  	<SignUpForm/>
				}
			</div>
		)
	}

}

const mapStateToProps = (state)=>{
	return{
		login:state.login
	}
}
const mapDispatchToProps = {
	getLoginAction
}
const ConnectedSignUpView = connect(mapStateToProps,mapDispatchToProps)(SignUpView)
export default ConnectedSignUpView