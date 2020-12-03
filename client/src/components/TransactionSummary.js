import React from 'react';
import { formatValue } from '../helpers/formatHelpers';

// import { Container } from './styles';

import css from './styles/summary.module.css'

function TransactionSummary({length, credits, debts}) {
    const balance = credits - debts
  return (
      <div className={css.summaryBox}>
          <div>
              <strong>Lançamentos: </strong><span>{length}</span>
          </div>
          <div>
                <strong>Receitas: </strong><span className={css.credit}>{formatValue(credits)}</span>
          </div>
          <div>
                <strong>Despesas: </strong><span className={css.debt}>{formatValue(debts)}</span>
          </div>
          <div>
                <strong>Saldo: </strong>
                <span className={balance > 0 ? css.credit : css.debt}>{formatValue(balance)}</span>
          </div>
      </div>
  );
}

export default TransactionSummary;