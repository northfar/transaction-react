import axios from 'axios'


const url = process.env.URL || 'http://localhost:3001'

const api  = axios.create({
    baseURL: `${url}/api/transaction`
})

export const getTransactions = async(period ) =>{
    const res = await api.get(`/?period=${period}`)
    const {transactions} = res.data

    return transactions.map(transaction => {
        return{
            ...transaction,
            descriptionLowerCase: transaction.description.toLowerCase(),
            categoryLowerCase: transaction.category.toLowerCase()
        }
    })
}

export const saveTransaction = async(transaction) =>{
    const res = await api.post('/new', transaction)
    console.log(res.data)
}

export const updateTransaction = async(transaction) => {
    const {_id} = transaction
    const res = await api.patch(`/${_id}`, transaction)
    console.log(res.data)
}

export const getTransaction = async(id) => {
    const res = await api.get(`/${id}`)
    return res.data
}

export const deleteTransaction = async(id) => {
    const res = await api.delete(`/${id}`)
    const {deleted} = res.data
    return deleted
}