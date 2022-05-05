const asyncHandler = require('express-async-handler')
const Item = require('../models/itemModel')
const { errors } = require('../config/messages')


const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find()
    res.status(200).json(items)
})

const setItem = asyncHandler(async (req, res) => {

    if (!req.user.is_admin) {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }

    if (!req.body.name || !req.body.total_needed) {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }

    const item = await Item.create({
        name: req.body.name,
        total_needed: req.body.total_needed,
        total_pledged: 0,
        category: req.body.category || 'Uncategorized',
    })

    res.status(200).json(item)
})

const updateItem = asyncHandler(async (req, res) => {

    const secret = process.env.SUPERADMIN_KEY
    const mayUpdate = req.user.is_admin || req.body.secret === secret
    if (!mayUpdate ) {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }

    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(404)
        throw new Error(`${errors['404']}`)
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedItem)
})


const deleteItem = asyncHandler(async (req, res) => {

    if (!req.user.is_admin) {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }

    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(404)
        throw new Error(`${errors['404']}`)
    }

    await item.remove()
    res.status(200).json({
        id: req.params.id
    })
})

module.exports = {
    getItems,
    setItem,
    updateItem,
    deleteItem,
}