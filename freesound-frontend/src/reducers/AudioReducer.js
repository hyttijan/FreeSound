import audioService from '../services/audios'
import {addNotificationSuccessAction,addNotificationErrorAction} from './NotificationReducer'

const addAudioAction = (formData)=>{
	return async(dispatch)=>{
		try{
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
		catch(error){
			const notification = error.response?error.response.statusText:"Network error"
			addNotificationErrorAction(notification,dispatch)
		}
		
	}
}

export {addAudioAction}