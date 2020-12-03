
import React, {useState, useEffect} from 'react';
import M from 'materialize-css'

function PeriodSelector({onSelect}) {

    const yearRange = [2019,2020,2021]
    const monthRange = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]

    const now = new Date()

    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
    

    useEffect(() =>{
        var elems = document.querySelectorAll('select')
        var instances = window.M.FormSelect.init(elems, {})
    },[])

    const handleChangeYear = event =>{
        const {value} =event.target
         setSelectedYear(value)
        handleSelect(selectedMonth, value)
    }

    const handleChangeMonth = event =>{
        const {value} =event.target
        setSelectedMonth(value)
        handleSelect(value, selectedYear)
    }

    const handleSelect = (month, year) =>{
        onSelect(month, year)
    }

   
    
  return (
      <div className="row">
          <div className="input-field col s4">
            <select name="month" id="month" value={selectedMonth} 
            onChange={handleChangeMonth}>
              {
                  monthRange.map((month, index) => (
                    <option key={index} value={index+1}>{month}</option>
                  ))
              }
            </select>
          </div>
          <div className="input-field col s4">&nbsp;</div>
          <div className="input-field col s4">
            <select name="year" id="year" value={selectedYear} 
                onChange={handleChangeYear}>
              {
                  yearRange.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))
              }
            </select>  
          </div>
         
      </div>
  );
}

export default PeriodSelector;