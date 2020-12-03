const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
              type: String, 
              required: [true, 'Descrição não informada']
  },
  value: {
    type: Number, 
    required: [true, 'Valor não informado.']
  },
  category: {
    type:String, 
    required: [true, 'Categoria não informada']
  },
  year: {
    type: Number, 
    required: 
    [true,'Ano não informado']},
  month: {
     type: Number, 
     required: [true,'Mês não informado']
    },
  day: {
    type: Number, 
    required: [true,'Dia não informado']
  },
  yearMonth: {
    type: String, 
    required: [true,'Ano-mês não informado']
  },
  yearMonthDay: {
    type: String, 
    required: [true,'Data não informada']
  },
  type: {
    type: String, 
    required: [true,'Tipo não informado'],
    enum: ['+','-']
  }
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
