import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/api/audios/'

const getOne = async(id)=>{
  const response  = await axios.get(baseUrl+id)
  return response.data
}
const addOne = async(formData)=>{
	const userAndToken = JSON.parse(localStorage.getItem('user'))
	const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Token '+userAndToken.key
        }
    }
	const response = await axios.post(baseUrl,formData,config)
	return response

}
const getAll = async()=>{
  const response  = await axios.get(baseUrl)
  return response.data	
}

export default {getAll,getOne,addOne}