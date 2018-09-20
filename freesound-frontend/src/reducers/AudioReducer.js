import audioService from '../services/audios'
import {addNotificationSuccessAction,addNotificationErrorAction,hideNotificationAction} from './NotificationReducer'
const audioReducer = (state=null,action)=>{
	return state
}

const addAudioAction = (formData)=>{
	return async(dispatch)=>{
		const response = await audioService.addOne(formData)
		if(response.status===201){
			const notification = `new audio '${response.data.name}' was added`
			addNotificationSuccessAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(notification,dispatch),5000)	
		}
		else{
			const notification = response.statusText
			addNotificationErrorAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(notification,dispatch),5000)	
		}
		
	}
}

export {audioReducer,addAudioAction}