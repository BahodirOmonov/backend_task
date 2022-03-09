import express from 'express'

const router = express.Router()

import MessageController from '../controllers/message.js'

router.get('/', MessageController.GET)
router.get('/:messageId', MessageController.GET)
router.post('/', MessageController.POST)
router.put('/', MessageController.PUT)
router.put('/:messageId', MessageController.PUT)
router.delete('/', MessageController.DELETE)
router.delete('/:messageId', MessageController.DELETE)

export default router