import React from 'react';
import {Redirect} from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import {getLoginAction} from '../reducers/LoginReducer'
import { connect } from 'react-redux'
class LoginView extends React.Component{

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
				<LoginForm/>
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
const ConnectedLoginView = connect(mapStateToProps,mapDispatchToProps)(LoginView)
export default ConnectedLoginView