import collectionService from '../services/collections'
import {addNotificationErrorAction,addNotificationSuccessAction} from './NotificationReducer'
const collectionReducer = (state=[],action)=>{
	switch(action.type){
		case 'INIT_ALL_COLLECTIONS':
			return action.collections
		case 'INIT_GENRE_COLLECTIONS':
			return action.collections
		case 'ADD_COLLECTION':
			return [...state,action.collection]
		case 'EMPTY_COLLECTIONS':
			return []
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
			const notification = error.response?error.response.statusText:"Network error"
			addNotificationErrorAction(notification,dispatch)
		}
		
	}
}
const initAllCollectionInGenreAction = (genreId)=>{
	return async(dispatch)=>{
		try{
			const response = await collectionService.getAllInGenre(genreId)
			if(response.status===200){
				dispatch({type:'INIT_GENRE_COLLECTIONS',collections:response.data})	
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
const initAllCollectionInGenreAndCreatorAction = (genreId)=>{
	return async(dispatch)=>{
		try{
			const response = await collectionService.getAllInGenreAndCreator(genreId)
			if(response.status===200){
				dispatch({type:'INIT_GENRE_COLLECTIONS',collections:response.data})	
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
const addCollectionAction = (collection)=>{
	return async(dispatch)=>{
		try{
			const response = await collectionService.addOne(collection)
			if(response.status===201){
				dispatch({type:'ADD_COLLECTION',collection:response.data})
				const notification = `new collection '${response.data.name}' was added`
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
				errors.push("Network error, could not add collection")
			}
			errors.forEach(error=>{
				addNotificationErrorAction(error,dispatch)
			})
			
		}
		
	}	
}
const emptyCollectionAction =  ()=>{
	return (dispatch)=>{
		dispatch({type:'EMPTY_COLLECTIONS'})
	}
} 
export {collectionReducer,initAllCollectionsAction,initAllCollectionInGenreAction,initAllCollectionInGenreAndCreatorAction, emptyCollectionAction, addCollectionAction}