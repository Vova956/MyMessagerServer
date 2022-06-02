const Router = require('express').Router
const controller = require('../Controlers/groupController')
const authMiddleWare = require("../Middlewares/authMiddleware")

const router = new Router()
router.get('/getUsers',authMiddleWare,controller.getUsers)//+
router.post('/postMessage',authMiddleWare,controller.postMessage)//+
router.post('/addAdmin',authMiddleWare,controller.addAdmin)//+
router.post('/addUser',authMiddleWare,controller.addUser)//+
router.get('/getChat',authMiddleWare,controller.getChat)//+

module.exports = router 