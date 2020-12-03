import React from 'react';

// import { Container } from './styles';

function ActionIcon({id, type, onActionClick}) {
    
    const handleIconClick = () =>{
        onActionClick(id, type)
    }
    

  return <span className="material-icons" 
               style={{cursor:'pointer'}}
               onClick={handleIconClick}>
            {type}
       </span>
}

export default ActionIcon;