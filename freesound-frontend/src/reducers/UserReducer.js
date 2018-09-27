import userService from '../services/users'
import {addNotificationErrorAction,addNotificationSuccessAction} from './NotificationReducer'
const userReducer = (state=null,action)=>{
	switch(action.type){
		case 'INIT_USER':
			return action.user
		default:
			break	
	}
	return state
}
const signUpAction=(formData)=>{
	return async(dispatch)=>{
		try{
			const response = await userService.addOne(formData)
			const response2 = await userService.getOne(response.data.id)
			if(response.status===201){
				dispatch({type:'INIT_USER',user:response2.data})
				const notification = `new user '${response2.data.username}' was created succesfully`	
				addNotificationSuccessAction(notification,dispatch)
			}
			else{
				const notification = response.statusText
				addNotificationErrorAction(notification,dispatch)	
			}
		}
		catch(error){
			const notification = error.response?error.response.statusText:"Network error"
			addNotificationErrorAction(notification,dispatch)
		}
		
	}	
}
const getUserAction = (userId)=>{
	return async(dispatch)=>{
		try{
			const response = await userService.getOne(userId)
			if(response.status===200){
				dispatch({type:'INIT_USER',user:response.data})	
			}
			else{
				const notification = response.statusText
				addNotificationErrorAction(notification,dispatch)	
			}
		}
		catch(error){
			const notification = error.response?error.response.statusText:"Network error"
			addNotificationErrorAction(notification,dispatch)
		}
		
	}
}

export {userReducer,getUserAction,signUpAction}