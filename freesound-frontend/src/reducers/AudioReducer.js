import audioService from '../services/audios'
import {addNotificationAction,hideNotificationAction} from './NotificationReducer'
const audioReducer = (state=null,action)=>{
	return state
}

const addAudioAction = (formData)=>{
	return async(dispatch)=>{
		const response = await audioService.addOne(formData)
		if(response.ok){
			const notification = `new audio '${response.name}' was added`
			addNotificationAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(dispatch),5000)	
		}
		else{
			const notification = response.statusText
			addNotificationAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(notification,dispatch),5000)	
		}
		
	}
}

export {audioReducer,addAudioAction}