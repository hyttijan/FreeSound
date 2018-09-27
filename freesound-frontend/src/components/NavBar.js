import React from 'react'
import {Menu,Dropdown,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
import {getLoginAction} from '../reducers/LoginReducer'
import { connect } from 'react-redux'
import {initAllGenresAction} from '../reducers/GenreReducer'

class NavBar extends React.Component{
	componentDidMount(){
		this.props.getLoginAction()
		this.props.initAllGenresAction()
	}	
	render(){
		const genres = this.props.genres.map((genre)=><Dropdown.Item key={genre.id} as={Link} to={`/genre/${genre.id}`}>{genre.name}</Dropdown.Item>)
		return(
			<Menu inverted>
				<Menu.Item name='home' as={Link} to="/"/>
				<Dropdown text='genres' className='link item'>
					<Dropdown.Menu>
						{genres}
					</Dropdown.Menu>
				</Dropdown>
				{this.props.login
				?
				<Menu.Item><LogoutButton/></Menu.Item>
				:
				<Menu.Item><Button as={Link} to="/signup">sign up</Button></Menu.Item>
				}
			</Menu>
			)
		}

}

const mapStateToProps = (state)=>{
	return{
		login:state.login,
		genres:state.genres
	}
}
const dispatchToProps = {
	initAllGenresAction,getLoginAction
}
const ConnectedNavBar= connect(mapStateToProps,dispatchToProps)(NavBar)
export default ConnectedNavBar