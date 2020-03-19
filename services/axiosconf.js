import axios from 'axios';


export default axios.create({
    baseURL: 'https://apisimc.herokuapp.com/api'
})