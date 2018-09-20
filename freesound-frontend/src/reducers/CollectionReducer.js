import collectionService from '../services/collections'
import {addNotificationErrorAction} from './NotificationReducer'
const collectionReducer = (state=[],action)=>{
	switch(action.type){
		case 'INIT_ALL_COLLECTIONS':
			return action.collections
		default:
			break
	}
	return state
}

const initAllCollectionsAction = ()=>{
	return async(dispatch)=>{
		try{
			const response = await collectionService.getAll()
			if(response.status===200){
				dispatch({type:'INIT_ALL_COLLECTIONS',collections:response.data})	
			}
			else{
				const notification = response.statusText
				addNotificationErrorAction(notification,dispatch)	
			}
		}
		catch(error){
			const notification = "Network error, could not fetch collections"
			addNotificationErrorAction(notification,dispatch)
		}
		
	}
}

export {collectionReducer,initAllCollectionsAction}