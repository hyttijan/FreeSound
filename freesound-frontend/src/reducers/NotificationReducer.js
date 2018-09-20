const notificationReducer = (state=[],action)=>{
	switch(action.type){
		case 'NOTIFY_SUCCESS':
			return [...state,{level:'success',content:action.notification}]
		case 'NOTIFY_ERROR':
			return [...state,{level:'error',content:action.notification}]
		case 'NOTIFY_INFO':
			return [...state,{level:'',content:action.notification}]
		case 'HIDE':
			return state.filter(notification=>action.notification!==notification.content)
		default:
			break
	}
	return state
}

const addNotificationSuccessAction = async(notification,dispatch)=>{
	dispatch({type:'NOTIFY_SUCCESS',notification:notification})
	setTimeout(()=>dispatch({type:'HIDE',notification:notification}))
}
const addNotificationErrorAction = async(notification,dispatch)=>{
	dispatch({type:'NOTIFY_ERROR',notification:notification})
	setTimeout(()=>dispatch({type:'HIDE',notification:notification}))
}
const addNotificationInfoAction = async(notification,dispatch)=>{
	dispatch({type:'NOTIFY_INFO',notification:notification})
	setTimeout(()=>dispatch({type:'HIDE',notification:notification}))
}
const hideNotificationAction = async(notification,dispatch)=>{
	dispatch({type:'HIDE',notification:notification})
}
export {notificationReducer,addNotificationSuccessAction,addNotificationErrorAction,addNotificationInfoAction,hideNotificationAction}