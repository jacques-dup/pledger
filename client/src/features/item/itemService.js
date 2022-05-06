import axios from 'axios'
import { API_URL } from '../../config/consts'
import { makeAuthHeaderConfig } from '../../utils/network'
import { sortByProp } from '../../utils/data'

const URL = `${API_URL}/api/items/`

const createItem = async (itemData, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.post(URL, itemData, config)
    return response.data
}

const editItem = async (itemData, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.put(URL + itemData.id, itemData, config)
    return response.data
}

const getItems = async (token) => {
    // const config = makeAuthHeaderConfig(token)
    const response = await axios.get(URL)
    const sorted = response.data.sort(sortByProp('category'))
    let previousCategory;
    const flattened = sorted.reduce( (acc, item) => {

        if (!previousCategory || previousCategory !== item.category) {
            acc.push({name: item.category, isHeading:true, _id: item.category, total_needed: 0, total_pledged: 0})
            previousCategory = item.category
        }
        acc.push(item)
        return acc
    },[])
    return flattened
}

const deleteItem = async (itemId, token) => {
    const config = makeAuthHeaderConfig(token)
    const response = await axios.delete(URL + itemId, config)
    return response.data
}

const itemService = {
    createItem,
    editItem,
    getItems,
    deleteItem,
}

export default itemService