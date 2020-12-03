const express = require('express');
const errorHandler = require('../handlers/errorHandler.js');
const transactionService = require('../services/transactionService.js')
const transactionRouter = express.Router();

transactionRouter.get('/', transactionService.index)
transactionRouter.get('/:id',transactionService.show)
transactionRouter.post('/new', transactionService.store)
transactionRouter.patch('/:id', transactionService.update)
transactionRouter.delete('/:id', transactionService.delete)
transactionRouter.use(errorHandler)

module.exports = transactionRouter;
