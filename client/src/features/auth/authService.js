import axios from 'axios'
import { API_URL } from '../../config/consts'
import { makeAuthHeaderConfig } from '../../utils/network'
import { sortByProp } from '../../utils/data'

const URL = `${API_URL}/api/users/`

const register = async (userData) => {
    const response = await axios.post(URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const getUsers = async (token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.get(URL + 'admin/all', config)
    const sorted = response.data.sort(sortByProp('_id'))
    return sorted
}

const authService = {
    register,
    logout,
    login,
    getUsers,
}

export default authService