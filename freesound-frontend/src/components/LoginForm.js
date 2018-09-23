import React from 'react';
import {Form,Segment,Message} from 'semantic-ui-react'
import {loginAction} from '../reducers/LoginReducer'
import { connect } from 'react-redux'
class LoginForm extends React.Component{
 	constructor(props){
  		super(props)
  		this.state = {
              username:null,
  					  password:null,
              usernameError:null,
              passwordError:null
  					  }
  	}
  	handleChange=(event)=>{
  		this.setState({[event.target.name]:event.target.value})
  	  event.target.name==='username'
      ?
      this.handleUserNameError(event.target.value)
      :
      this.handlePasswordError(event.target.value)
    }	
  	handleUserNameError = (username)=>{
      if(username.length===0){
        this.setState({usernameError:{header:'Username error',content:'Username cannot be blank'}})  
      }
      else{
        this.setState({usernameError:null})
      }
      
    }
    handlePasswordError = (password)=>{
      if(password.length===0){
        this.setState({passwordError:{header:'Password error',content:'Password cannot be blank'}})  
      }
      else{
        this.setState({passwordError:null})
      }
      
    }
  	handleSubmit = async(event)=>{
  		event.preventDefault()
  		this.props.loginAction({username:this.state.username,password:this.state.password})
  	}
  	render(){
  	
  	return(
  		<Segment inverted>
  			<Form error inverted onSubmit={this.handleSubmit}>
          {this.state.usernameError&&
          <Form.Group widths='equal'>
            <Message error header={this.state.usernameError.header} content={this.state.usernameError.content}/>
          </Form.Group>
          }
  				<Form.Group  widths='equal'>
  					<Form.Input fluid label="Username" onChange={this.handleChange} name="username"/> 
          </Form.Group>
          {this.state.passwordError&&
          <Form.Group widths='equal'>
            <Message error header={this.state.passwordError.header} content={this.state.passwordError.content}/>
          </Form.Group>
          }
          <Form.Group widths='equal'>	
            <Form.Input fluid label="Password" onChange={this.handleChange} name="password" type="password"/>
  				</Form.Group>
  				<Form.Button disabled={!this.state.username
  					||!this.state.password}type="submit">login</Form.Button>
  			</Form>
  		</Segment>)
  }

}

const mapdDispatchToProps = {
  loginAction
}
const ConnectedLoginForm = connect(null,mapdDispatchToProps)(LoginForm)
export default ConnectedLoginForm