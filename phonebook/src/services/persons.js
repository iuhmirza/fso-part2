import axios from "axios"
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = newObject => {
    return axios.post(baseURL, newObject)
}

/*
const update = (name, newObject) => {
    return axios.put(`${baseURL}/${name}`, newObject)
}
*/

export default {getAll, create}