import React, {useState, useEffect} from 'react';
import { getTransactions } from './api/transactionsApi';
import InputBox from './components/InputBox';
import PeriodSelector from './components/PeriodSelector'
import Transaction from './components/Transaction';
import TransactionSummary from './components/TransactionSummary';
import Modal from 'react-modal'
import TransactionModal from './components/TransactionModal';

import css from './components/styles/transaction.module.css'

Modal.setAppElement("#root")

export default function App() {

  const currYear = new Date().getFullYear()
  const currMonth = new Date().getMonth() + 1
  
  const currPeriod = `${currYear}-${currMonth.toString().padStart(2,'0')}`
  const [period, setPeriod] = useState(currPeriod)
  const [transactionsList, setTransactionsList] = useState([])
  const [filteredTransactions, setFilteredTransactions] =useState([])
  const [transactionsLength, setTransactionsLength] = useState(0)
  const [credits, setCredits] = useState(0)
  const [debts, setDebts] = useState(0)
  const [filter, setFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const listTransactions = async() => {
      const transactions = await getTransactions(period)
      setTransactionsList(transactions)
      setFilteredTransactions(transactions)
    }

    listTransactions()
  }, [period])

  useEffect(() => {

    setTransactionsLength(filteredTransactions.length)

    const credits = filteredTransactions.filter(t => t.type === '+')
      .reduce((acc, currVal) => acc + currVal.value, 0)
    
    const debts = filteredTransactions.filter(t => t.type === '-')
    .reduce((acc, currVal) => acc + currVal.value, 0)

    setDebts(debts)
    setCredits(credits)

  }, [filteredTransactions])

  useEffect(() => {
    const newText = filter.toLowerCase()
    console.log(newText)
    setFilteredTransactions(transactionsList.filter(t => {
      return t.descriptionLowerCase.includes(newText)}
      ))
  },[filter, transactionsList])

  const handleSelect = (month, year) =>{
      setPeriod(`${year}-${month.padStart(2,'0')}`)
  }

  const handleFilter = filter =>{
    setFilter(filter)
  }

  const triggerModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleNewTransaction = () =>{
    setSelectedId('')
    triggerModal()
  }

  const handleSelectId = id => {
    setSelectedId(id)
    triggerModal()
  }


  return (
    <div className="center container">
        <strong style={title}>Desafio Final do Bootcamp Full Stack</strong><br/>
        <span style={title}>Controle Financeiro Mensal</span>
        
         <PeriodSelector onSelect={handleSelect}/> 
         <TransactionSummary length={transactionsLength} credits={credits} debts={debts}/>
         <InputBox onFilter={handleFilter} onTrigger={handleNewTransaction}/>
         {
           filteredTransactions.map((transaction, index) => (
             <Transaction key={transaction._id} 
                          transaction={transaction} 
                          index={index+1} 
                          handleId={handleSelectId}/>
           ))
         }
          <Modal isOpen={isModalOpen} onRequestClose={triggerModal} style={modal}>
            <TransactionModal id={selectedId} closeModal={triggerModal} />
         </Modal> 
    </div>

  )
}

const title = {
  fontSize: '30px',
  textAlign: 'center'
}

const modal = {
  top: '50%',
  left: '50%',
  bottom: 'auto',
  right: 'auto',
  marginRight:'-50%',
  transform:'translate(-50%, -50%)'
}