## Att göra:
- Secret-sidan innehåll
  ✅ Logga ut knapp
- Felmeddelanden
  - Inte inloggad
    ✅ Kan inte logga in
    ✅ Kan inte skapa användare
- ✅ Styling
- Backend
  ✅ Lägga till error 403
- Städa kod
  - Backend
  - Frontend



## Detta fungerar:

- Skapa en User via Postman: OK✅
- Skapa en User via Frontend form: OK✅
  - får tillbaka: Registration completed, please log in

- Logga in via Postman med rätt email + password: OK✅
  - får tillbaka userID, accessToken, name.
- Logga in via Frontend med rätt email + password: OK✅
 - får tillbaka:
Hi Santa!
Authenticated Endpoint: {"secretMessage":"This is a super secret message for User: Santa"}
- Logga in via Frontend med FELAKTIG info: OK✅
  får tillbaka: Could not log in, try again

- Token funkar: 
/secrets med Token:
- funkar✅ - får tillbaka 201 + name
/secrets utan Token:
- funkar✅ - får 401 Unauthorized + "message": "Please try logging in again"




## Problem: 🛑
1. Vid login av User i Frontend skickas väldigt många console.log - (syns ej i Postman)
  - Secret.js . Fetch?? kallas tre gånger - se console.log
  - user.js - reducer status message 4 gånger


2. /secrets med felaktig Token
- får 401 Unauthorized + "message": "Please try logging in again"
- Borde få:
res.status(403).json({ message: 'Access token is missing or wrong'
##### Fast det är ändå lite ok - får ju ett error ändå..



## Oklar status:
- skicka vidare User vid inloggning?
- Felmeddelanden i console.log och frontend



## Kontrollera:
- change backend/package.json for @babel till andra version - men verkar vara åter för en del andra idag igen trots korr igår på samma problem.