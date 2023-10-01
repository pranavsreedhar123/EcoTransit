
import './styles/App.css';
import { useEffect, useState } from 'react';
import Map from './Map';


function App() {

  const [message, setMessage] = useState('')

  return (
    <div className="App">
      <Map />

    </div>
  );
}

export default App;
