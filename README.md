# Ship-tracker

Il progetto si pone come obiettivo la creazione di monitoriaggio di navi (basandosi sulla loro posizione).
Il proprietario della nave potrà visualizzare la posizione della nave in tempo reale, ed aggiungere nuove navi.

## Getting Started

Per poter utilizzare il progetto è consigliato usare docker, in quanto è stato creato un docker-compose che permette di avviare il progetto in maniera semplice.

``` bash
docker-compose up -d
```

Per avviare il progetto in locale, questo crearà un container con il db, uno con il server REST API e uno con il client web del gestore.
Viene anche creato un container che simula la nave e permette di ricevere i messaggi.

## Users

Per usare il progetto è necessario creare un utente, oppure usare quello già creato:

user: test
password: Test1234
