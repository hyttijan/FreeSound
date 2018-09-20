import React from 'react';
import LoginForm from '../components/LoginForm'
import {getLoginAction} from '../reducers/LoginReducer'
import { connect } from 'react-redux'
class UserView extends React.Component{

	componentDidMount(){
		this.props.getLoginAction()
	}
	render(){ 
		return(
			<div>
				{this.props.login
				?
				<p>logged in</p>
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
const ConnectedUserView = connect(mapStateToProps,mapDispatchToProps)(UserView)
export default ConnectedUserView