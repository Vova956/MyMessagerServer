const Router = require('express').Router
const controller = require('../Controlers/chatController')
const authMiddleware = require('../Middlewares/authMiddleware')
const authMiddleWare = require("../Middlewares/authMiddleware")

const router = new Router()
router.post('/getChat',authMiddleWare,controller.getMessages)
router.post('/postMessage',authMiddleWare,controller.postMessage)
router.get('/getAmount',authMiddleWare,controller.getAmount)
router.get('/getAllMessages',authMiddleware,controller.getAllMessages)


module.exports = router 