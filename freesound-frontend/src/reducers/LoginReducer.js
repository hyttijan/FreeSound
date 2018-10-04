import userService from '../services/users'
import loginService from '../services/login'
import {addNotificationErrorAction,addNotificationSuccessAction} from '../reducers/NotificationReducer'

const loginReducer = (state=null,action)=>{
	switch(action.type){
		case 'LOGIN':
			return action.user
		case 'LOGOUT':
			return null
		default:
			break
	}
	return state
}

const loginAction = (credentials)=>{
	return async(dispatch)=>{
		try{
			const response = await loginService.login(credentials)
			const datas = []
			if(response.status===200){
				const response2 = await userService.getOne(response.data.user)
				localStorage.setItem('user',JSON.stringify(response.data))
				dispatch({type:'LOGIN',user:response2.data})
				datas.push(`You logged in as user ${response2.data.username}`)
			}
			else if(response.data){
				for(var data in response.data){
					datas.push(response.data[data])
				}
			}
			datas.forEach(data=>{
				addNotificationSuccessAction(data,dispatch)
			})
		}
		catch(error){
			const errors = []
			if(error.response){
				for(var err in error.response.data){
					errors.push(error.response.data[err])
				}	
			}
			else{
				errors.push("Network error, could not login")
			}
			errors.forEach(error=>{
				addNotificationErrorAction(error,dispatch)
			})
			
		}
		
	}
}
const logoutAction = ()=>{
	return async(dispatch)=>{
		localStorage.removeItem('user')
		dispatch({type:'LOGOUT',user:null})
		const notification = 'You have logged out'
		addNotificationSuccessAction(notification,dispatch)
	}
}
const getLoginAction = ()=>{
	return async(dispatch)=>{
		if(localStorage.getItem('user')){
			const userAndToken = JSON.parse(localStorage.getItem('user'))
			const response = await userService.getOne(userAndToken.user)
			dispatch({type:'LOGIN',user:response.data})
		}
	}

}
export {loginAction,logoutAction,getLoginAction,loginReducer}