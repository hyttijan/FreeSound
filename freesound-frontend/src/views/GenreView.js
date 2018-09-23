import React from 'react';
import {initAllGenresAction} from '../reducers/GenreReducer'
import CollectionsList from '../components/CollectionsList'
import { connect } from 'react-redux'

class GenreView extends React.Component{
	constructor(props){
		super(props)
		this.genreId = Number(this.props.genreId)
	}
	componentDidMount(){
		if(this.props.genres===[]){
			this.props.initAllGenresAction()
		}
	}
	render(){ 
		const genre = this.props.genres.find((genre)=>{return genre.id===this.genreId})
		if(genre===null||genre===undefined){
			return null
		}
		return(
			<div>
				<h2>{genre.name}</h2>
				<p>{genre.description}</p>
				<CollectionsList genreId={this.genreId}/>
			</div>
		)
	}

}

const mapStateToProps = (state)=>{
	return {
		genres:state.genres	
	}	
}
const mapDispatchToProps = {
	initAllGenresAction
}

const ConnectedGenreView = connect(mapStateToProps,mapDispatchToProps)(GenreView)
export default ConnectedGenreView