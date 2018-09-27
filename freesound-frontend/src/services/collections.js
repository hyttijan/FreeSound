import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/api/collections/'

const getOne = async(id)=>{
	const response  = await axios.get(baseUrl+id)
	return response.data
}
const getAll = async()=>{
	const response  = await axios.get(baseUrl)
	return response
}
const getAllInGenre=async(genreId)=>{
	const response  = await axios.get(baseUrl+"?genre="+genreId)
	return response
}
const addOne = async(data)=>{
	const userAndToken = JSON.parse(localStorage.getItem('user'))
	const config = {
        headers: {
            'Authorization': 'Token '+userAndToken.key
        }
    }
    try{
		const response = await axios.post(baseUrl,data,config)
		return response
	}
	catch(error){
		console.log(error.response)
		if(error.response){
			return error.response
		}
		else{
			return {status:500,statusText:"Could not connect to the server"}
		}
	}
}
export default {getAll,getOne,getAllInGenre,addOne}