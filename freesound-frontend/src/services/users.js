import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/api/users/'

const getOne = async(id)=>{
	const response  = await axios.get(baseUrl+id)
	return response.data
}
const getAll = async()=>{
	const response  = await axios.get(baseUrl)
	return response.data
}

export default {getAll,getOne}