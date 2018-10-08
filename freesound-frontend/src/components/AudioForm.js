import React from 'react';
import {addAudioAction} from '../reducers/AudioReducer'
import {initAllGenresAction} from '../reducers/GenreReducer'
import {initAllCollectionInGenreAndCreatorAction, emptyCollectionAction} from '../reducers/CollectionReducer'
import {getLoginAction} from '../reducers/LoginReducer'
import {Form,Segment,Select, Message,Button} from 'semantic-ui-react'
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
  					  descriptionError:null,
  					  genreError:null,
  					  collectionError:null,
  					  audio_fileError:null,
  					  isVisible:false
  					  }
  	}
  	componentDidMount(){
  		/** init genres and collections if not initialized**/
  		this.props.initAllGenresAction()	
  		this.props.emptyCollectionAction()
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
  		this.handleAudioFileError(event.target.files[0])
  		
  	}
  	handleAudioFileError=(file)=>{
  		
  		if(file===null||file===undefined){
  			this.setState({audio_fileError:{header:'Audio file error',content:'Audio file cannot be blank'}})
  		}
  		else if(file.type!=='audio/mp3'){
  			this.setState({audio_fileError:{header:'Audio file error',content:'Audio file has to be audio/mp3 format'}})
  		}
  		else{
  			this.setState({audio_fileError:null})
  		}
  	}
  	handleGenreChange=(event,data)=>{
  		const genre = data.value
  		this.setState({genre:genre,collection:null})
  		this.props.initAllCollectionInGenreAndCreatorAction(genre)
  		this.handleGenreError(genre)
  		this.handleCollectionError(this.state.collection)
  	}
  	handleGenreError=(genre)=>{
  		if(genre===null){
  			this.setState({genreError:{header:'Genre error',content:'Genre can not be null'}})
  		}
  		else{
  			this.setState({genreError:null})
  		}
  	}
  	handleCollectionChange=(event,data)=>{
  		const collection = data.value
  		this.setState({collection:collection})
  		this.handleCollectionError(collection)
  	}
  	handleCollectionError=(collection)=>{
  		if(collection===null){
  			this.setState({collectionError:{header:'Collection error',content:'Collection can not be null, if no collections are available in the genre you can create new collection in the collection form'}})
  		}
  		else{
  			this.setState({collectionError:null})
  		}
  	}
  	handleClick = (event)=>{
  		this.refs.audio_file_uploader.click()
  	}
  	handleSubmit = async(event)=>{
  		event.preventDefault()
  		const formData  = new FormData()
  		formData.append('creator',this.props.login.id)
  		formData.append('name',this.state.name)
  		formData.append('description',this.state.description)
  		formData.append('audio_file',this.state.audio_file)
  		formData.append('collection',this.state.collection)
  		formData.append('genre',this.state.genre)
  		this.props.addAudioAction(formData)
  	}
  	
  	render(){
  		const genres = this.props.genres.map((genre)=>{return {key:genre.id,value:genre.id,text:genre.name}})
  		const collections = this.props.filter==='GENRE'
  							?
  							this.props.collections.filter((collection)=>collection.genre===this.state.genre).map((collection)=>{return {key:collection.id,value:collection.id,text:collection.name}})
  							:
  							this.props.collections.map((collection)=>{return {key:collection.id,value:collection.id,text:collection.name}})				
  	return(
  		<div>
  		{this.state.isVisible
  		?
  		<div>	
  		<Segment inverted>
  			<Form error inverted encType="multipart/form-data" onSubmit={this.handleSubmit}>
  				<h3>Add new audio</h3>
  				<p>* required field</p>
  				{this.state.nameError
  				&&<Form.Group><Message error header={this.state.nameError.header} content={this.state.nameError.content}/>}</Form.Group>}
  				<Form.Group  widths='equal'>
  					<Form.Input fluid label="* Name" onChange={this.handleChange} name="name"/>
  				</Form.Group>
  				<Form.Group widths='equal'>
  					<Form.Input fluid label="Description" onChange={this.handleChange} name="description"/>
  				</Form.Group>
  				{this.state.genreError&&<Form.Group><Message error header={this.state.genreError.header} content={this.state.genreError.content}/></Form.Group>}
  				<Form.Group widths='equal'>
  					<Select onChange={this.handleGenreChange} placeholder='* Select genre' options={genres} name="genre"/>
  				</Form.Group>
  				{this.state.collectionError&&<Form.Group><Message error header={this.state.collectionError.header} content={this.state.collectionError.content}/></Form.Group>}
  				<Form.Group>
  					<Select onChange={this.handleCollectionChange} placeholder='* Select collection' options={collections} name="collection"/>
  				</Form.Group>
  				{this.state.audio_fileError&&<Form.Group><Message error header={this.state.audio_fileError.header} content={this.state.audio_fileError.content}/></Form.Group>}
  				<Form.Group>
  					{this.state.audio_file?
  					<label onClick={this.handleClick} htmlFor="file" className="ui icon button">
        				<i className="file icon"></i>
        				{this.state.audio_file.name}
        			</label>
  					:
  					<label onClick={this.handleClick} htmlFor="file" className="ui icon button">
        				<i className="file icon"></i>
        				* Upload audio file
        			</label>
        			}
  					<input type="file" ref="audio_file_uploader" onChange={this.handleFileChange} name="audio_file" style={{display:'none'}}/>	 
 				</Form.Group>
  				<Form.Button disabled={!this.state.name
  					||!this.state.genre
  					||!this.state.collection
  					||!this.state.audio_file
  					||this.state.audio_file.type!=='audio/mp3'} type="submit">submit</Form.Button>
  			</Form>
  		</Segment>
  		<Button onClick={()=>{this.setState({isVisible:false})}} type="button">Hide audioform</Button>
  		</div>
  		:<Button onClick={()=>{this.setState({isVisible:true})}} type="button">Show audioform</Button>}
  		</div>
  		)
  }

}
const mapStateToProps =(state)=>{
	return{
		genres: state.genres,
		collections:state.collections,
		filter: state.filter,
		login: state.login
	}
}
const mapdDispatchToProps = {
	addAudioAction,
	initAllGenresAction,
	initAllCollectionInGenreAndCreatorAction,
	emptyCollectionAction,
	getLoginAction
}
const ConnectedAudioForm = connect(mapStateToProps,mapdDispatchToProps)(AudioForm)
export default ConnectedAudioForm