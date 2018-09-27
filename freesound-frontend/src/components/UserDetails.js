import React from 'react'
import { connect } from 'react-redux'
import {getUserAction} from '../reducers/UserReducer'
import {Card, Icon,Segment} from 'semantic-ui-react'
class UserDetails extends React.Component{
		constructor(props){
			super(props)
		}
		render(){
			if(this.props.user===null||this.props.user===undefined){
				return null
			}
			const extra = <div><Icon name="envelope square"/>{this.props.user.email}</div>
			const fullName = this.props.user.first_name+" "+this.props.user.last_name
			return(
				<Segment>
					<h2>{this.props.user.username}</h2>
					<Card
						image={this.props.user.profile_picture}
						header={fullName}
						extra={extra}
					/>
				</Segment>
				)
		}

}
const mapStateToProps = (state)=>{
	return({
		user: state.user
	})
}
const mapDispatchToProps ={
	getUserAction
}
const ConnectedUserDetails = connect(mapStateToProps,mapDispatchToProps)(UserDetails)
export default ConnectedUserDetails