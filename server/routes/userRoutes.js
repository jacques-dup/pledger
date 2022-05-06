const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    makeAdmin,
    getUsers,
} = require('../controllers/userController')
const {
    protect
} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/admin/:id', protect, makeAdmin)
router.get('/admin/all', protect, getUsers)

module.exports = router