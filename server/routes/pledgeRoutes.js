const express = require('express')
const router = express.Router()
const {
    getPledges,
    setPledge,
    updatePledge,
    deletePledge,
} = require('../controllers/pledgeController')

const {
    protect
} = require('../middleware/authMiddleware')

router.route('/').get(protect, getPledges).post(protect, setPledge)
router.route('/:id').delete(protect, deletePledge).put(protect, updatePledge)

module.exports = router