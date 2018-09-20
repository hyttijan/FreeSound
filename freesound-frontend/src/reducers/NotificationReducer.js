const notificationReducer = (state=[],action)=>{
	switch(action.type){
		case 'NOTIFY':
			return [...state,action.notification]
		case 'HIDE':
			return state.filter(notification=>action.notification!==notification)
		default:
			break
	}
	return state
}

const addNotificationAction = async(notification,dispatch)=>{
	dispatch({type:'NOTIFY',notification:notification})
}
const hideNotificationAction = async(notification,dispatch)=>{
	dispatch({type:'HIDE',notification:notification})
}
export {notificationReducer,addNotificationAction,hideNotificationAction}