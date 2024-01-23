import React, { useEffect, useState } from 'react'
import AutoRefreshRow from './components/AutoRefreshRow';


function App() {

  const [backendData, setBackendData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getResources');
      if (!response.ok) {
        throw new Error('Errore nella risposta della richiesta API');
      }

      const data = await response.text();
      setBackendData(JSON.parse(data));
    } catch (error) {
      console.error('Errore durante la chiamata API:', error.message);
    }
  };

  //useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const eventSource = new EventSource('/sse');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let _backendDataClone = [];

      backendData.map((variable) => {
        if(data[variable.Name] !== undefined)
        {
          variable.Initial_Value = data[variable.Name];
        }
        _backendDataClone.push(variable);
      });
      console.log(_backendDataClone)
      if(_backendDataClone.length != 0)
        setBackendData(_backendDataClone)
    };

    eventSource.onerror = (error) => {
      console.error('Errore SSE:', error);
    };

    return () => {
      eventSource.close();
    };
  }, [backendData])
  

  return (
    <>
      <button onClick={() => {fetchData()}}>Richiedi configurazione</button>
      <table>
        <tr>
          <th>Nome</th>
          <th>Valore</th>
          <th>Refresh</th>
        </tr>
        {
          backendData.map((variable) => {
            return (
              <>
                <AutoRefreshRow key={variable.Name} name={variable.Name} value={variable.Initial_Value} COV={variable.COV}></AutoRefreshRow>
              </>
            )
          }
          )}
      </table>
    </>
  )
}

export default App