# App per la gestione di api e sse per la gestione della comunicazione backend - frontend
Questa app è stata scritta sia per il backend che per il frontend per provare la comunicazione tra un web server node js e un frontend react

il server contiene alcune api quali:
### /api/getResources
riceve le risorse da mostrare in grafica in formato JSON

#### Struttura in uscita:
 ``` json
 [
    { "Name":"var1", "Initial_Value":0, "COV":true },
    { "Name":"var2", "Initial_Value":0, "COV":true },
    { "Name":"var3", "Initial_Value":0, "COV":true },
    { "Name":"var4", "Initial_Value":0, "COV":false },
    { "Name":"var5", "Initial_Value":0, "COV":false },
    { "Name":"var6", "Initial_Value":0, "COV":true },
]
 ```
 I quali componenti sono:

 -  **Name**: Nome mnemonico della variabile
 -  **Initial_Value**: Il valore iniziale della variabile
 -  **COV**: true/false indica se il valore cambia automaticamente nel tempo o se sarà necessario richiamare un aggiornamento a mano

