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
			const errors = []
			if(error.response){
				for(var err in error.response.data){
					errors.push(error.response.data[err])
				}	
			}
			else{
				errors.push("Network error, could not add audio")
			}
			errors.forEach(error=>{
				addNotificationErrorAction(error,dispatch)
			})
			
		}
		
	}
}

export {addAudioAction}