const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { errors } = require('../config/messages')

const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        password
    } = req.body

    if (!name || !email || !password || !phone) {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }

    const userExists = await User.findOne({
        email
    })

    if (userExists) {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone,
            token: generateToken(user._id),
            is_admin: user.is_admin,
        })
    } else {
        res.status(400)
        throw new Error(`${errors['400']} ${errors.invalid}`)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
            is_admin: user.is_admin,
        })
    } else {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const makeAdmin = asyncHandler(async (req, res) => {
    const secret = process.env.SUPERADMIN_KEY
    const id = req.params.id

    if (!secret || !id || !req.body.secret || secret != req.body.secret) {
        res.status(403)
        throw new Error(`${errors['403']} ${errors.invalid}`)
    }

    const user = await User.findOne({ id })
    if (!user) {
        res.status(404)
        throw new Error(`${errors['404']}`)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedUser)
})

const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    makeAdmin,
    getMe,
}