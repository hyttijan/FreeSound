import React from 'react';
import {addAudioAction} from '../reducers/AudioReducer'
import {initAllGenresAction} from '../reducers/GenreReducer'
import {initAllCollectionsAction} from '../reducers/CollectionReducer'
import {filterCollectionsAction} from '../reducers/FilterReducer'
import {Form,Segment,Select, Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
class AudioForm extends React.Component{
 	constructor(props){
  		super(props)
  		this.state = {name:null,
  					  description:null,
  					  audio_file:null,
  					  collection:null,
  					  genre:null,
  					  nameError:null,
  					  descriptionError:null
  					  }
  	}
  	handleChange=(event)=>{
  		this.setState({[event.target.name]:event.target.value})
  		if(event.target.name==='name'){
  			this.handleNameError(event.target.value)
  		}
  		else{
  			this.handleDescriptionError(event.target.value)
  		}
  	}	
  	handleNameError=(name)=>{
  		if(name.length===0){
  			this.setState({nameError:{header:'Too short name',content:'Name has to be at least 1 character long'}})
  		}
  		else if(name.length>30){
  			this.setState({nameError:{header:'Too long name',content:'Name has to be less than 30 characters'}})
  		}
  		else{
  			this.setState({nameError:null})
  		}
  	}
  	handleDescriptionError=(description)=>{
  		if(description.length>800)(
  			this.setState({descriptionError:{header:'Too long description',content:'Description has to be less than 800 characters'}})
  		)
  		else{
  			this.setState({descriptionError:null})
  		}
  	}
  	handleFileChange=(event)=>{
  		this.setState({audio_file:event.target.files[0]})	
  	}
  	handleGenreChange=(event,data)=>{
  		const genre = data.value
  		this.setState({genre:genre})
  		this.props.filterCollectionsAction()

  	}
  	handleCollectionChange=(event,data)=>{
  		const collection = data.value
  		this.setState({collection:collection})
  	}
  	handleClick = (event)=>{
  		this.refs.audio_file_uploader.click()
  	}
  	handleSubmit = async(event)=>{
  		event.preventDefault()
  		const formData  = new FormData()
  		formData.append('name',this.state.name)
  		formData.append('description',this.state.description)
  		formData.append('audio_file',this.state.audio_file)
  		formData.append('collection',this.state.collection)
  		formData.append('genre',this.state.genre)
  		this.props.addAudioAction(formData)
  	}
  	componentDidMount(){
  		/** init genres and collections if not initialized**/
  		if(this.props.genres.length===0){
  			this.props.initAllGenresAction()	
  		}
  		if(this.props.collections.length===0){
  			this.props.initAllCollectionsAction()	
  		}
  	}
  	render(){
  		const genres = this.props.genres.map((genre)=>{return {key:genre.id,value:genre.id,text:genre.name}})
  		const collections = this.props.filter==='GENRE'
  							?
  							this.props.collections.filter((collection)=>collection.genre===this.state.genre).map((collection)=>{return {key:collection.id,value:collection.id,text:collection.name}})
  							:
  							this.props.collections.map((collection)=>{return {key:collection.id,value:collection.id,text:collection.name}})					
  	return(
  		<Segment inverted>
  			<Form error inverted encType="multipart/form-data" onSubmit={this.handleSubmit}>
  				<Form.Group  widths='equal'>
  					<Form.Input fluid label="Name" onChange={this.handleChange} name="name"/>
  					{this.state.nameError&&<Message error header={this.state.nameError.header} content={this.state.nameError.content}/>} 
  					<Form.Input fluid label="Description" onChange={this.handleChange} name="description"/>
  				</Form.Group>
  				<Form.Group widths='equal'>
  					<Select onChange={this.handleGenreChange} placeholder='Select genre' options={genres} name="genre"/>
  					<Select onChange={this.handleCollectionChange} placeholder='Select collection' options={collections} name="collection"/>
  					{this.state.audio_file?
  					<label onClick={this.handleClick} htmlFor="file" className="ui icon button">
        				<i className="file icon"></i>
        				{this.state.audio_file.name}
        			</label>
  					:
  					<label onClick={this.handleClick} htmlFor="file" className="ui icon button">
        				<i className="file icon"></i>
        				Upload audio file
        			</label>
        			}
  					<input type="file" ref="audio_file_uploader" onChange={this.handleFileChange} name="audio_file" style={{display:'none'}}/>

 				</Form.Group>
  				<Form.Button disabled={!this.state.name
  					||!this.state.audio_file}type="submit">submit</Form.Button>
  			</Form>
  		</Segment>)
  }

}
const mapStateToProps =(state)=>{
	return{
		genres: state.genres,
		collections:state.collections,
		filter: state.filter
	}
}
const mapdDispatchToProps = {
	addAudioAction,
	initAllGenresAction,
	initAllCollectionsAction,
	filterCollectionsAction
}
const ConnectedAudioForm = connect(mapStateToProps,mapdDispatchToProps)(AudioForm)
export default ConnectedAudioForm