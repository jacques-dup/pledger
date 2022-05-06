const asyncHandler = require('express-async-handler')
const Pledge = require('../models/pledgeModel')
const Item = require('../models/itemModel')
const { errors } = require('../config/messages')

const getPledges = asyncHandler(async (req, res) => {
    const pledges = await Pledge.find({
        user: req.user.id
    })
    res.status(200).json(pledges)
})

const getAllPledges = asyncHandler(async (req, res) => {

    if (!req.user.is_admin) {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }

    const pledges = await Pledge.find()
    res.status(200).json(pledges)
})

const setPledge = asyncHandler(async (req, res) => {
    if (!req.body.item || !req.body.amount) {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }
    const pledge = await Pledge.create({
        item: req.body.item,
        user: req.user.id,
        amount: req.body.amount
    })

    const update = await updateItemPledge(pledge)
    if (update != 'failed') {
        res.status(200).json(pledge)
    }
    else {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }
    
})

const updateItemPledge = asyncHandler(async (newPledge, oldPledge = null) => {
    const item = await Item.findById(newPledge.item)
    if (!item) {
        return 'failed'
    }
    const filteredPledges = item.pledges.filter(p => p != newPledge.id)
    const updatedPledges = [...filteredPledges, newPledge]
    const updatedTotal = item.total_pledged + (oldPledge ? newPledge.amount  - oldPledge.amount : newPledge.amount )
    

    if(updatedTotal > item.total_needed) {
        return 'failed'
    }
    await Item.findByIdAndUpdate(newPledge.item, { 
        pledges: updatedPledges,
        total_pledged: updatedTotal,
    })
})

const updatePledge = asyncHandler(async (req, res) => {
    const pledge = await Pledge.findById(req.params.id)
    if (!pledge) {
        res.status(404)
        throw new Error(`${errors['404']}`)
    }
    if (!req.user) {
        res.status(401)
        throw new Error(`${errors['400']}`)
    }
    if (pledge.user.toString() !== req.user.id) {
        res.status(403)
        throw new Error(`${errors['403']}`)
    }
    const updatedPledge = await Pledge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    const update = await updateItemPledge(updatedPledge, pledge)
    if (update != 'failed') {
        res.status(200).json(updatedPledge)
    }
    else {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }
})


const deletePledge = asyncHandler(async (req, res) => {
    const pledge = await Pledge.findById(req.params.id)
    if (!pledge) {
        res.status(404)
        throw new Error(`${errors['404']}`)
    }
    if (!req.user || pledge.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error(`${errors['400']}`)
    }
    const update = await removeItemPledge(pledge)

    if (update !== 'failed') {
        await pledge.remove()
        res.status(200).json({
            id: req.params.id
        })
    }
    else {
        res.status(400)
        throw new Error(`${errors['400']}`)
    }
})

const removeItemPledge = asyncHandler(async (pledge) => {
    const item = await Item.findById(pledge.item)
    if (!item) {
        return 'failed'
    }
    const updatedPledges = item.pledges.filter(p => p != pledge.id)
    const updatedTotal = item.total_pledged - pledge.amount
    await Item.findByIdAndUpdate(pledge.item, { 
        pledges: updatedPledges,
        total_pledged: updatedTotal,
    })
})

module.exports = {
    getPledges,
    getAllPledges,
    setPledge,
    updatePledge,
    deletePledge,
}