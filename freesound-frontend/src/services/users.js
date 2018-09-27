import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/api/users/'
const getOne = async(id)=>{
	const response  = await axios.get(baseUrl+id)
	return response
}
const getAll = async()=>{
	const response  = await axios.get(baseUrl)
	return response
}
const addOne = async(formData)=>{
	const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
	const response = await axios.post(baseUrl,formData,config)
	return response
}

export default {getAll,getOne,addOne}