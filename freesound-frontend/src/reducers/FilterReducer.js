const filterReducer = (state='ALL',action)=>{
	switch(action.type){
		case 'FILTER':
			return action.filter
		default:
			break
	}
	return state
}

const filterCollectionsAction = ()=>{
	return{
		type:'FILTER',
		filter:"GENRE"
	}
}
export {filterCollectionsAction,filterReducer}