import React from 'react';
import Modal from 'react-modal'
// import { Container } from './styles';
import {formatValue} from '../helpers/formatHelpers'
import ActionIcon from './ActionIcon';

import {deleteTransaction} from '../api/transactionsApi'

import css from './styles/transaction.module.css'

function Transaction({transaction, index, handleId}) {
    const {_id, category, value, type, description} = transaction
    
    const handleActionClick = async(id, type) =>{
        if (type==='edit'){
           handleId(id)
        }
        else{
           await deleteTransaction(_id)
        }
    }


    const bgStyle = type === '+' ? {background : '#00cec9'} : {background : '#ff7675'}

  return (
      <div className={css.flexRow} style={bgStyle}>
          <div className={css.transactionLeft}>
            <div>  
                <span className={css.index}>{index.toString().padStart(2, '0')}</span>
            </div>
            <div className={css.transactionCol}>
                <strong>{category}</strong>
                <span>{description}</span>
            </div>
          </div>
          <div className={css.transactionRight}>
              <div> 
                  <span className={css.money}>{formatValue(value)}</span>
            </div>
             <div>
                 <ActionIcon id={_id} type='edit' onActionClick={handleActionClick}/>
                 <ActionIcon id={_id} type='delete' onActionClick={handleActionClick}/>
             </div>
          </div>

      </div>
  );
}

export default Transaction;

