require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')

const path = require('path');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
})


const {authenticateUser, authenticatePermissions} = require('./middleware/authentication')

const cors = require('cors')

const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const uploadRouter = require('./routes/uploadImageRoutes')
const productRouter = require('./routes/productRoutes')
const paymentRouter = require('./routes/paymentRoutes')
const accumulateRouter = require('./routes/accumulateRoutes')
const bankInfoRouter = require('./routes/bankInfoRoutes')
const withdrawRouter = require('./routes/withdrawRoutes')

const cookieParser = require('cookie-parser');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }))
app.use(express.static('./public'))

app.use(cors({credentials: true}));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/accumulate', accumulateRouter)
app.use('/api/v1/bankInfo', bankInfoRouter)
app.use('/api/v1/withdraw', withdrawRouter)


app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/about.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/signup.html'))
})

app.get('/dashboard', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/dashboard.html'))
})

app.get('/product', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/product.html'))
})

app.get('/buy', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/buy.html'))
})

app.get('/income', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/income.html'))
})

app.get('/admin-dashboard', [authenticateUser, authenticatePermissions('admin')],(req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/admin-dashboard.html'))
})

app.get('/paymentConfirm', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/paymentConfirm.html'))
})


app.get('/mine', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/mine.html'))
})

app.get('/withdraw', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/withdraw.html'))
})

app.get('/about', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/about.html'))
})

app.get('/updatePassword', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/updatePassword.html'))
})

app.get('/withdrawal', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/withdrawal.html'))
})


app.get('/withdrawalRecord', authenticateUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/withdrawalRecord.html'))
})

app.get('/confirmWithdrawal', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pages/confirmWithdrawal.html'))
})



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.port || 2200

const start = async () => {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`SERVER IS LISTENING ON PORT ${port}`))
}

start()


