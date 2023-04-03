import { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Week from './Components/Week';

function App(props) {
  const [name,setName] = useState('');
  const [cityName,setCityName] = useState('');
  const [alt,setAlt] = useState(true);

  const clickEnter = (e) => {
    e.preventDefault();
    if(e.key === "Enter"){

      setCityName(name);
      setName("");
    }
  }
  const alterDayState = () => {
    setAlt(true);
  }
  const alterWeekState = () => {
    setAlt(false);
  }
  return (
    <div className="App">
      <h1 style={{color:'gray'}}>Weather Forecast App</h1>
      <div className='main-input'> 
        <input className='search-input' onKeyUp={clickEnter} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      

      <div className='day-week'>
        <div className='btns'>
          <button onClick={alterDayState} >Day</button>
          <button onClick={alterWeekState}>Week</button>
        </div>
        {alt ? <Home city={cityName} /> : <Week city={cityName}/>}
      </div>
      
      
    </div>
  );
}

export default App;
