const path = require('path')
const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 8000

connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const whitelist = ['https://commonground-pledger.herokuapp.com/']
if (process.env.NODE_ENV !== 'production') {
    whitelist.push('http://localhost:3000')
}

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/items', require('./routes/itemRoutes'))
app.use('/api/pledges', require('./routes/pledgeRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))