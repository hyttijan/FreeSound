import audioService from '../services/audios'
import {addNotificationSuccessAction,addNotificationErrorAction} from './NotificationReducer'
const audioReducer = (state=null,action)=>{
	return state
}

const addAudioAction = (formData)=>{
	return async(dispatch)=>{
		const response = await audioService.addOne(formData)
		if(response.status===201){
			const notification = `new audio '${response.data.name}' was added`
			addNotificationSuccessAction(notification,dispatch)
		}
		else{
			const notification = response.statusText
			addNotificationErrorAction(notification,dispatch)
		}
		
	}
}

export {audioReducer,addAudioAction}