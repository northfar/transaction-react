import React, {useState} from 'react';

// import { Container } from './styles';

import css from './styles/inputbox.module.css'

function InputBox({onFilter, onTrigger}) {

    const [filter, setFilter] = useState('')

    const handleChange = event =>{
        const {value} = event.target
        setFilter(value)
        onFilter(value)
    }

    const handleClick = () => {
        onTrigger()
    }

  return(
      <div className={css.inputBox}>
          <div className="row">
              <div className="input-field col s4">
                <a onClick={() => handleClick()} className="waves-light waves-effect btn">NOVO LANÇAMENTO+</a>
              </div>
              <div className="input-field col s8">
              <input type="text" placeholder="Descrição" value={filter} onChange={handleChange}/>
              </div>
          </div>
      </div>
  );
}

export default InputBox;