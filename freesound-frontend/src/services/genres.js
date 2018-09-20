import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/api/genres/'

const getOne = async(id)=>{
	const response  = await axios.get(baseUrl+id)
	return response
}
const getAll = async()=>{
	const response  = await axios.get(baseUrl)
	return response
}

export default {getAll,getOne}