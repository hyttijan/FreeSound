import React from 'react';
import {initAllGenresAction} from '../reducers/GenreReducer'
import {addCollectionAction} from '../reducers/CollectionReducer'
import {Form,Segment,Select, Message,Button,TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
class CollectionForm extends React.Component{
 	constructor(props){
  		super(props)
  		this.state = {name:null,
  					  description:null,
  					  genre:null,
  					  nameError:null,
  					  descriptionError:null,
  					  isVisible:false
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
  	handleGenreChange=async(event,data)=>{
  		const genre = data.value
  		this.setState({genre:genre})
  	}
  	handleClick = (event)=>{
  		this.refs.audio_file_uploader.click()
  	}
  	handleSubmit = async(event)=>{
  		event.preventDefault()
  		const data = {name:this.state.name,
                    description:this.state.description,
                    genre:this.state.genre,
                    creator:String(this.props.login.id)}
  		this.props.addCollectionAction(data)
  	}
  	componentDidMount(){
  		/** init genres if not initialized**/
  		this.props.initAllGenresAction()	
  		
  	}
  	render(){
  		const genres = this.props.genres.map((genre)=>{return {key:genre.id,value:genre.id,text:genre.name}})					
  	return(
  		<div>
  		{this.state.isVisible
  		?
  		<div>	
  		<Segment inverted>
  			<Form error inverted onSubmit={this.handleSubmit}>
  				<h3>Add new collection</h3>
          {this.state.nameError&&<Form.Group><Message error header={this.state.nameError.header} content={this.state.nameError.content}/></Form.Group>} 
  				<Form.Group  widths='equal'>
  					<Form.Input fluid label="Name" onChange={this.handleChange} name="name"/>
  				</Form.Group>
          {this.state.descriptionError&&<Form.Group><Message error header={this.state.descriptionError.header} content={this.state.descriptionError.content}/></Form.Group>}
          <Form.Group widths='equal'>
  					<TextArea placeholder="Description" onChange={this.handleChange} name="description"/>
  				</Form.Group>
  				<Form.Group widths='equal'>
  					<Select onChange={this.handleGenreChange} placeholder='Select genre' options={genres} name="genre"/>
 				  </Form.Group>
  				<Form.Button disabled={this.state.nameError
  					||!this.state.genre
            ||this.state.descriptionError}type="submit">submit</Form.Button>
  			</Form>
  		</Segment>
  		<Button onClick={()=>{this.setState({isVisible:false})}} type="button">Hide collection form</Button>
  		</div>
  		:<Button onClick={()=>{this.setState({isVisible:true})}} type="button">Show collection form</Button>}
  		</div>
  		)
  }

}
const mapStateToProps =(state)=>{
	return{
    login: state.login,
		genres: state.genres
	}
}
const mapdDispatchToProps = {
	initAllGenresAction,
  addCollectionAction
}
const ConnectedCollectionForm = connect(mapStateToProps,mapdDispatchToProps)(CollectionForm)
export default ConnectedCollectionForm