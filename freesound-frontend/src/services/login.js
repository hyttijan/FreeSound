import backendUrl from '../utils/config'
import axios from 'axios'
const baseUrl = backendUrl+'/rest-auth/'

const login = async(credentials)=>{
  const response  = await axios.post(baseUrl+'login/',credentials)
  return response
}

export default {login}