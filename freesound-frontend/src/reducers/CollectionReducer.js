import collectionService from '../services/collections'
import {addNotificationErrorAction,hideNotificationAction} from './NotificationReducer'
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
				setTimeout(()=>hideNotificationAction(dispatch),5000)	
			}
		}
		catch(error){
			const notification = "Network error, could not fetch collections"
			addNotificationErrorAction(notification,dispatch)
			setTimeout(()=>hideNotificationAction(notification,dispatch),5000)
		}
		
	}
}

export {collectionReducer,initAllCollectionsAction}