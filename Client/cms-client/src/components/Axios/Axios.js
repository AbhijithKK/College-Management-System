import axios from 'axios'

const Instance = axios.create({
  baseURL: 'http://localhost:4000'
  // ,headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
  ,
  withCredentials: true,
})
export default Instance