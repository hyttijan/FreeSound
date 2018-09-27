import React from 'react';
import UserDetails from '../components/UserDetails'
import AudioForm from '../components/AudioForm'
import CollectionForm from '../components/CollectionForm'
import {getLoginAction} from '../reducers/LoginReducer'
import {getUserAction} from '../reducers/UserReducer'
import { connect } from 'react-redux'
import {Segment} from 'semantic-ui-react'
class UserView extends React.Component{

	componentDidMount(){
		this.props.getUserAction(Number(this.props.userId))
		this.props.getLoginAction()

	}
	render(){
		if(this.props.user===null||this.props.user===undefined){
			return null
		}
		const loginId = this.props.login?this.props.login.id:null
		const usersHomePage = loginId===this.props.user.id 
		return(
			<div>
				
				<div>
					<UserDetails user={this.props.user.id}/>
					{usersHomePage&&
					<Segment>
						<h3>User actions</h3>
						<Segment>
							<AudioForm/>
						</Segment>
						<Segment>
							<CollectionForm/>
						</Segment>
					</Segment>
					}
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state)=>{
	return{
		login:state.login,
		user: state.user
	}
}
const mapDispatchToProps = {
	getLoginAction,
	getUserAction
}
const ConnectedUserView = connect(mapStateToProps,mapDispatchToProps)(UserView)
export default ConnectedUserView