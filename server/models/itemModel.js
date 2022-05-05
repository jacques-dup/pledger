const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an item name'],
    },
    total_needed: {
        type: Number,
        required: [true, 'Please add a total_needed number'],
    },
    total_pledged: {
        type: Number,
    },
    pledges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pledge',
    }],
    category: {
        type: String,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Item', itemSchema)