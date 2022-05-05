const mongoose = require('mongoose')

const pledgeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Pledge', pledgeSchema)