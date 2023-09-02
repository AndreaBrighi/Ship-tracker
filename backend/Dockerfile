FROM node:18

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install
# ricordo che devo rendere accessibile dall'esterno del container 
# la porta 3000 su cui nodejs rimane in attesa di connessioni
# da parte dei client
# Occhio, non espongo la porta, questa EXPOSE è solo una nota per # ricordare che devo esporre la porta quando eseguo il container. 
EXPOSE 3000
EXPOSE 3001
# dico quale comando eseguire automaticamente quando eseguirò il # container: serve per far partire il servizio web nel container. 
CMD npm start
