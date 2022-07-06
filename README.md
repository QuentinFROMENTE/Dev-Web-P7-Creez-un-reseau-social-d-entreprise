# Projet 7 Openclassrooms : Créez un réseau social d'entreprise

# Pour faire fonctionner le projet sur votre machine : 

- Ouvrer le terminal et naviguer jusqu'au dossier back-end,
- Installer les pacquets nécessaires pour le fonctionnenement du serveur : express et mongoose par les commande "npm install express" et "npm install mongoose",
- Lancer le serveur avec la commande "node ./serveur.js",

# Rappel des structures de donnée entre front-end et back-end par route :

- /api/auth/signup 
verb: 'POST'
body : {email: '', password: bcrypt.hash('')}

- /api/auth/login
verb 'POST'
body: {email: '', password: bcrypt.hash('')} 

- /api/auth/logout
verb 'GET'

- /api/user/thread
verb 'POST'
body: {userId: ''}

- /api/user/profile
verb 'POST'
body: {userId: ''}

- /api/user/update
verb 'PUT'
body : {userId: '', profile: {}}

- /api/quote
verb 'GET'

- /api/quote
verb 'POST'
body : {quote: {}}

- /api/quote/:id
verb 'PUT'
body: {quote: {}}

- /api/quote/:id
verb 'DELETE'

- /api/quote/:id/like
verb 'PUT'
body: {userId: '', like: 0 (for delete) || 1 (for like) || -1 (for dislike)}