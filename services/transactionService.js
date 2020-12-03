const mongoose = require('mongoose');
const { update, remove } = require('../models/TransactionModel');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');


module.exports = {

    async store(req, res, next){
        try{
            let data = req.body

            if(!data){
                throw new Error('Sem dados para inserção!')
            }

            const transaction = new TransactionModel({
                description: data.description,
                value: data.value,
                category: data.category,
                year: data.year,
                month: data.month,
                day: data.day,
                yearMonth: `${data.year}-${data.month < 10 ? '0'+data.month : data.month}`,
                yearMonthDay: `${data.year}-${data.month < 10 ? '0'+data.month : data.month}-${data.day < 10 ? '0'+data.day : data.day}`,
                type: data.type
            })
    
            await transaction.save()
            res.json(transaction)
            console.log(`${req.method} - Transação salva com sucesso!`)
        }
        catch(err){
            next(err)
        }

    },

    async index(req, res, next){
        
        try{
            let period = req.query.period
            
            if(!period){
                throw new Error('E necessário informar o parâmetro "period"' + 
                'cujo valor deve estar no formato yyyy-mm')
            }

            const transactions = await TransactionModel.find({yearMonth:period})
            res.json({length: transactions.length, transactions})
        }
        catch(err){
            next(err)
        }
    },

    async show(req, res, next){
        try{
        
            const id = req.params.id

            const transaction = await TransactionModel.findById({_id: id})

            if(!transaction){
                throw new Error('Transação não encontrada')
            }

            res.json(transaction)
            console.log(`${req.method} - Id ${id} encontrado com sucesso`)

        }
        catch(err){
            next(err)
        }
    },

    async update(req, res, next){
        try{
            let data = req.body,
                newYearMonth = '',
                newYearMonthDay = ''
            const transaction = await TransactionModel.findById({_id: req.params.id})

            if(!data){
                throw new Error('Sem dados para edição!')
            }

            if(!transaction){
                throw new Error('Transação não encontrada')
            }

            if(data.description) transaction.description = data.description
            if(data.value) transaction.value = data.value
            if(data.year) transaction.year = data.year
            if(data.month) transaction.month = data.month
            if(data.day) transaction.day = data.day

            newYearMonth = `${data.year}-${data.month.toString().padStart(2,'0')}`,
            newYearMonthDay=`${data.year}-${data.month.toString().padStart(2,'0')}-${data.day.toString().padStart(2,'0')}`
            
            if(transaction.yearMonth !== newYearMonth) transaction.yearMonth = newYearMonth
            if(transaction.yearMonthDay !== newYearMonthDay) transaction.yearMonthDay = newYearMonthDay

            await transaction.save()

            res.json(transaction)

            console.log(`${req.method} - Transação atualizada com sucesso`)

        }
        catch(err){
            next(err)
        }
    },

    async delete(req, res, next){
        try{
            
            const transaction = await TransactionModel.findByIdAndDelete({_id:req.params.id})
            if(!transaction){
                throw new Error('Transação não encontrada')
            }

            res.json({deleted: true, message: 'Transação removida com sucesso!'})
            console.log(`${req.method} 'Transação removida com sucesso!'`)
        }
        catch(err){
            next(err)
        }
    }




}