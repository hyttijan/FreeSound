import React from 'react';
import {Form,Segment,Message} from 'semantic-ui-react'
import {signUpAction} from '../reducers/UserReducer'
import { connect } from 'react-redux'
class SignUpForm extends React.Component{
 	constructor(props){
  		super(props)
  		this.state = {
              username:null,
  					  password1:null,
              passwor2:null,
              first_name:null,
              last_name:null,
              email:null,
              profile_picture:null,
              usernameError:null,
              passwordError:null,
              profilePictureError:null
  					  }
  	}
  	handleChange=(event)=>{
  		this.setState({[event.target.name]:event.target.value})
  	  
      if(event.target.name==='username'){
        this.handleUserNameError(event.target.value)  
      }
      else if(event.target.name==='email'){

      }
      else if(event.target.name==='password'||event.target.name==='password2'){
        this.handlePasswordError(event.target.name,event.target.value)  
      }
      
    }
    handleFileChange=(event)=>{
      this.setState({profile_picture:event.target.files[0]})
      this.handleProfilePictureError(event.target.files[0])
    }	
  	handleClick = (event)=>{
      this.refs.profile_picture_uploader.click()
    }
    handleUserNameError = (username)=>{
      if(username.length===0){
        this.setState({usernameError:{header:'Username error',content:'Username cannot be blank'}})  
      }
      else{
        this.setState({usernameError:null})
      }
      
    }
    handleEmailError = (email)=>{
      
      
    }
    handlePasswordError = (passwordKey,password)=>{
      if(password.length===0){
        this.setState({passwordError:{header:'Password error',content:'Password cannot be blank'}})  
      }
      else if((passwordKey==='password1'&&password!==this.state.password2)||(passwordKey==='password2'&&password!==this.state.password1)){
        this.setState({passwordError:{header:'Password error',content:'Passwords do not match'}}) 
      }
      else{
        this.setState({passwordError:null})
      }
      
    }
    handleProfilePictureError=(file)=>{

    }
  	handleSubmit = async(event)=>{
  		event.preventDefault()
      const formData = new FormData()
      formData.append('username', this.state.username)
  		formData.append('password', this.state.password1)
      formData.append('first_name',this.state.first_name)
      formData.append('last_name',this.state.last_name)
      formData.append('email',this.state.email)
      formData.append('profile_picture',this.state.profile_picture)

      this.props.signUpAction(formData)
  	}
  	render(){
  	
  	return(
  		<Segment inverted>
  			<Form error encType="multipart/form-data" inverted onSubmit={this.handleSubmit}>
          <h3>Sign Up Form</h3>
          {this.state.usernameError&&
          <Form.Group widths='equal'>
            <Message error header={this.state.usernameError.header} content={this.state.usernameError.content}/>
          </Form.Group>
          }
  				<Form.Group  widths='equal'>
  					<Form.Input fluid label="Username" onChange={this.handleChange} name="username"/> 
          </Form.Group>
          <Form.Group  widths='equal'>
            <Form.Input fluid label="First name" onChange={this.handleChange} name="first_name"/> 
          </Form.Group>
          <Form.Group  widths='equal'>
            <Form.Input fluid label="Last name" onChange={this.handleChange} name="last_name"/> 
          </Form.Group>
          <Form.Group  widths='equal'>
            <Form.Input fluid label="Email" onChange={this.handleChange} name="email"/> 
          </Form.Group>
          {this.state.passwordError&&
          <Form.Group widths='equal'>
            <Message error header={this.state.passwordError.header} content={this.state.passwordError.content}/>
          </Form.Group>
          }
          <Form.Group widths='equal'>	
            <Form.Input fluid label="Password" onChange={this.handleChange} name="password1" type="password"/>
  				</Form.Group>
          <Form.Group widths='equal'> 
            <Form.Input fluid label="Repeat password" onChange={this.handleChange} name="password2" type="password"/>
          </Form.Group>
          {this.state.profilePictureError&&
          <Form.Group widths='equal'>
            <Message error header={this.state.profilePictureError.header} content={this.state.profilePicturedError.content}/>
          </Form.Group>
          }
          <Form.Group>
            {this.state.profile_picture?
            <label onClick={this.handleClick} htmlFor="file" className="ui icon button">
                <i className="file icon"></i>
                {this.state.profile_picture.name}
              </label>
            :
            <label onClick={this.handleClick} htmlFor="file" className="ui icon button">
                <i className="file icon"></i>
                Upload profilepicture
              </label>
              }
            <input type="file" ref="profile_picture_uploader" onChange={this.handleFileChange} name="profile_picture" style={{display:'none'}}/>   
  				</Form.Group>
          <Form.Button disabled={!this.state.username
  					||!this.state.password1
            ||(this.state.password1!==this.state.password2)}
            type="submit">sign up</Form.Button>
  			</Form>
  		</Segment>)
  }

}

const mapdDispatchToProps = {
  signUpAction
}
const ConnectedSignUpForm = connect(null,mapdDispatchToProps)(SignUpForm)
export default ConnectedSignUpForm