import genreService from '../services/genres'
import {addNotificationErrorAction,hideNotificationAction} from './NotificationReducer'
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
				setTimeout(()=>hideNotificationAction(notification,dispatch),5000)	
			}
		}
		catch(error){
			const notification = "Network error, could not fetch genres"
			addNotificationErrorAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(notification,dispatch),5000)
		}
		
	}
}

export {genreReducer,initAllGenresAction}