import express from 'express'

const router = express.Router()

// import Controllers

import UserController from '../controllers/user.js'

router.get('/', UserController.GET)
router.get('/:userId', UserController.GET)
router.post('/', UserController.POST)
router.put('/', UserController.PUT)
router.put('/:userId', UserController.PUT)
router.delete('/', UserController.DELETE)
router.delete('/:userId', UserController.DELETE)

export default router