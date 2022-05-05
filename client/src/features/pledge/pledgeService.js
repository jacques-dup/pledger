import axios from 'axios'
import { API_URL } from '../../config/consts'
import { makeAuthHeaderConfig } from '../../utils/network'

const URL = `${API_URL}/api/pledges/`

const createPledge = async (pledgeData, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.post(URL, pledgeData, config)
    return response.data
}

const editPledge = async (pledgeData, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.put(URL + pledgeData.id, pledgeData, config)
    return response.data
}

const getPledges = async (token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.get(URL, config)
    return response.data
}

const deletePledge = async (pledgeId, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.delete(URL + pledgeId, config)
    return response.data
}


const pledgeService = {
    createPledge,
    editPledge,
    getPledges,
    deletePledge,
}

export default pledgeService