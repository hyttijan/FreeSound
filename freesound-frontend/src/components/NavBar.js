import React from 'react'
import {Menu,Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {initAllGenresAction} from '../reducers/GenreReducer'
class NavBar extends React.Component{
	componentDidMount(){
		this.props.initAllGenresAction()
	}	
	render(){
		const genres = this.props.genres.map((genre)=><Dropdown.Item key={genre.id}>{genre.name}</Dropdown.Item>)
		return(
			<Menu inverted>
				<Menu.Item name='home'/>
				<Dropdown text='genres' className='link item'>
					<Dropdown.Menu>
						{genres}
					</Dropdown.Menu>
				</Dropdown>
				</Menu>
			)
		}

}
const mapStateToProps = (state)=>{
	return{
		genres:state.genres
	}
}
const dispatchToProps = {
	initAllGenresAction
}
const ConnectedNavBar= connect(mapStateToProps,dispatchToProps)(NavBar)
export default ConnectedNavBar