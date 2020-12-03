import React, {useState, useEffect} from 'react';

// import { Container } from './styles';

import {getTransaction, saveTransaction, updateTransaction} from '../api/transactionsApi'

import css from './styles/transaction.module.css'

function TransactionModal({closeModal, id}) {
    const disabled = id !== ''
    const label = id !== '' ? 'Edição' : 'Inclusão'

    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')
    const [strDate, setStrDate] = useState('')
    const [year, setYear] = useState(0)
    const [month, setMonth] = useState(0)
    const [day, setDay] = useState(0)
    const [type, setType] = useState('-')



    const handleSubmit = async() => {
        const transaction = {
            description: description,
            category: category,
            value: value,
            year: year,
            month: month,
            day: day
        }

        console.log(transaction, strDate)
        // if(id !== ''){
        //     transaction = {_id: id, ...transaction}
        //     await updateTransaction(transaction)
        // }
        // else{
        //     await saveTransaction(transaction)
        // }
    }

    useEffect(() => {

        const loadTransaction = async(id) => {
            const transaction = await getTransaction(id)
            if(transaction){
                setDescription(transaction.description)
                setCategory(transaction.category)
                setValue(transaction.value)
                setStrDate(transaction.yearMonthDay)
            }

        }

        loadTransaction(id)

    }, [])

    const handleCloseModal = () =>{
        closeModal()
    }

  return (
      <>
      <div>
          <h2>{label} de Lançamento</h2>
          <a onClick={handleCloseModal} className="waves-effect waves-light btn red darken-4">
              <span className="material-icons">close</span>
          </a>
      </div>
      <div className={css.modalBox}>
          <form onSubmit={handleSubmit}>
          <div className="row">
              <div className="input-field col s6">
                    <label >
                        <input type="radio" 
                               name="type" 
                               id="despesa"
                               checked={type==="-"} 
                               value="-" 
                               disabled={disabled}
                               onClick={() => setType("-")} />
                        <span>Despesa</span> 
                    </label>
              </div>
              <div className="input-field col s6">
              <label >
                        <input type="radio" 
                               name="type" 
                               id="receita" 
                               value="+" 
                               disabled={disabled} 
                               checked={type==="+"}
                               onClick={() => setType("+")}/>
                       <span> Receita </span>
                    </label>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <label htmlFor="description">Descrição: </label>
                  <input type="text" 
                         name="description" 
                         id="description" 
                         value={description}
                         onChange={event => setDescription(event.target.value)}/>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s12">
                  <label htmlFor="category">Categoria: </label>
                  <input type="text" 
                         name="category" 
                         id="category" 
                         value={category}
                         onChange={event => setCategory(event.target.value)}/>
              </div>
          </div>
          <div className="row">
              <div className="input-field col s6">
                  <label htmlFor="value">Valor (R$): </label>
                  <input type="number" 
                         name="value" 
                         id="value" 
                         value={value}
                         onChange={event => setValue(event.target.value)}/>
              </div>
              <div className="input-field col s6">
                   <input type="date" name="trDate" id="trDate"/>
              </div>
          </div>
          <div className="row">
              <div className="col s6">
                  <button type="submit" className="waves-effect waves-light btn">
                      <span className="material-icons">save</span>
                      SALVAR
                  </button>
              </div>
          </div>
        </form>
      </div>
      </>
  )
}

export default TransactionModal;