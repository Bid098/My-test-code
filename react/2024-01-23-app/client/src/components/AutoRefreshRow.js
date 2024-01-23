import React, { useEffect, useState } from 'react'


function AutoRefreshRow({ name, COV, value }) {
    //const [value, setValue] = useState(0)
    const [_value, setValue] = useState(value);
    return (
        <>
            <tr>
                <td>{name}</td>
                
                {!COV ? <><td>{_value}</td><button onClick={async () => {
                    try {
                        const response = await fetch('/api/getValue');
                        if (!response.ok) {
                            throw new Error('Errore nella risposta della richiesta API');
                        }
                        setValue(await response.text())
                    } catch (error) {
                        console.log(error)
                    }
                }}
                >Refresh</button></> : <><td>{value}</td></>}
            </tr>
        </>
    )

}

export default AutoRefreshRow