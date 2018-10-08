import genreService from '../services/genres'
import {addNotificationErrorAction} from './NotificationReducer'
const genreReducer = (state=[],action)=>{
	switch(action.type){
		case 'INIT_ALL_GENRES':
			return action.genres
		default:
			break
	}
	return state
}

const initAllGenresAction = ()=>{
	return async(dispatch)=>{
		try{
			const response = await genreService.getAll()

			if(response.status===200){
				dispatch({type:'INIT_ALL_GENRES',genres:response.data})	
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
				errors.push("Network error, could not fetch genres")
			}
			errors.forEach(error=>{
				addNotificationErrorAction(error,dispatch)
			})
			
		}
		
	}
}

export {genreReducer,initAllGenresAction}