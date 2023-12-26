# copy pasted login form from chatgpt. currently havine err , saying

App.jsx:79 
        
        
       POST http://localhost:8080/login 404 (Not Found)
handleLogin @ App.jsx:79
callCallback2 @ react-dom_client.js?v=ba23b5ff:3672
invokeGuardedCallbackDev @ react-dom_client.js?v=ba23b5ff:3697
invokeGuardedCallback @ react-dom_client.js?v=ba23b5ff:3731
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=ba23b5ff:3734
executeDispatch @ react-dom_client.js?v=ba23b5ff:7014
processDispatchQueueItemsInOrder @ react-dom_client.js?v=ba23b5ff:7034
processDispatchQueue @ react-dom_client.js?v=ba23b5ff:7043
dispatchEventsForPlugins @ react-dom_client.js?v=ba23b5ff:7051
(anonym) @ react-dom_client.js?v=ba23b5ff:7175
batchedUpdates$1 @ react-dom_client.js?v=ba23b5ff:18907
batchedUpdates @ react-dom_client.js?v=ba23b5ff:3577
dispatchEventForPluginEventSystem @ react-dom_client.js?v=ba23b5ff:7174
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=ba23b5ff:5476
dispatchEvent @ react-dom_client.js?v=ba23b5ff:5470
dispatchDiscreteEvent @ react-dom_client.js?v=ba23b5ff:5447
Visa 15 ramar till
Visa färre
VM15:1 err during login: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
eval @ VM15:1
overrideMethod @ console.js:213
handleLogin @ App.jsx:101
await in handleLogin (asynkron)
callCallback2 @ react-dom_client.js?v=ba23b5ff:3672
invokeGuardedCallbackDev @ react-dom_client.js?v=ba23b5ff:3697
invokeGuardedCallback @ react-dom_client.js?v=ba23b5ff:3731
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=ba23b5ff:3734
executeDispatch @ react-dom_client.js?v=ba23b5ff:7014
processDispatchQueueItemsInOrder @ react-dom_client.js?v=ba23b5ff:7034
processDispatchQueue @ react-dom_client.js?v=ba23b5ff:7043
dispatchEventsForPlugins @ react-dom_client.js?v=ba23b5ff:7051
(anonym) @ react-dom_client.js?v=ba23b5ff:7175
batchedUpdates$1 @ react-dom_client.js?v=ba23b5ff:18907
batchedUpdates @ react-dom_client.js?v=ba23b5ff:3577
dispatchEventForPluginEventSystem @ react-dom_client.js?v=ba23b5ff:7174
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=ba23b5ff:5476
dispatchEvent @ react-dom_client.js?v=ba23b5ff:5470
dispatchDiscreteEvent @ react-dom_client.js?v=ba23b5ff:5447
Visa 16 ramar till
Visa färre



# i had this. so tried fix 'email'->'name' for response for handlelogin.
was writing down things from chatgpt, so needed to apply things carefully xD

App.jsx?t=1703576196034:76 
        
        
       POST http://localhost:8080/login 401 (Unauthorized)
handleLogin @ App.jsx?t=1703576196034:76
callCallback2 @ react-dom_client.js?v=ba23b5ff:3672
invokeGuardedCallbackDev @ react-dom_client.js?v=ba23b5ff:3697
invokeGuardedCallback @ react-dom_client.js?v=ba23b5ff:3731
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=ba23b5ff:3734
executeDispatch @ react-dom_client.js?v=ba23b5ff:7014
processDispatchQueueItemsInOrder @ react-dom_client.js?v=ba23b5ff:7034
processDispatchQueue @ react-dom_client.js?v=ba23b5ff:7043
dispatchEventsForPlugins @ react-dom_client.js?v=ba23b5ff:7051
(anonym) @ react-dom_client.js?v=ba23b5ff:7175
batchedUpdates$1 @ react-dom_client.js?v=ba23b5ff:18907
batchedUpdates @ react-dom_client.js?v=ba23b5ff:3577
dispatchEventForPluginEventSystem @ react-dom_client.js?v=ba23b5ff:7174
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=ba23b5ff:5476
dispatchEvent @ react-dom_client.js?v=ba23b5ff:5470
dispatchDiscreteEvent @ react-dom_client.js?v=ba23b5ff:5447
Visa 15 ramar till
Visa färre
VM65:1 Login failed: {message: 'invalid name or password'}

const response = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: inputName, password: inputPassword }),
});


# so! this made me login! nothing more to do?
i can say ive omitted pretty much a lot of err handling. i was lazy.
i can always go back and work more if i want!
also, im using same input field at frontend for register and login. i needed to seperate it when i want to work more. i mean i have seperate input field for each register and login, but i didnt difined it seperately. but.. im lazy!!!

# Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend (displaying the errors in a nice way in the frontend is a stretch goal - it’s fine to just show 'Something went wrong' on the frontend if you run out of time).

this become things to solve for me.
so, when i submit (nothing)(nothing)and(nothing) at register, it still creates a new user!!!

Welcome, User!
You are joined on 2023-12-26 10:33:15

try again?


{id: '658a9ddb484df90f966f6ae5', accessToken: '03ebc13ecc098cd04fbacfd45bc586fe4330a4e488c93a0300…0db8997ce53fea1e5b7abbf8590eab9ef7034053fc259b219'}


this literately created this cursed document at db cloud!!!

_id
658a9ddb484df90f966f6ae5
name
""
email
""
password
"$2a$10$2be/FIyp.qReBEfoa.A2sO50tEx.DmGXoPxZEnrAQVWQ9tHqei0oi"
accessToken
"03ebc13ecc098cd04fbacfd45bc586fe4330a4e488c93a03004ff8aea3dea101ed10c7…"
createdAt
2023-12-26T09:33:15.173+00:00
__v
0


so, i need to make user cant submit when they have nothing for value for example xD

# the err i got at chrome console when i submit the same (nothing)(nothing)(nothing) again
is this from the validation process(like, can i say that i have working validation, for example required:true)? or is this err from something else?

App.jsx:24 
        
        
       POST http://localhost:8080/users 400 (Bad Request)
postID @ App.jsx:24
handleButtonClick @ App.jsx:74
callCallback2 @ react-dom_client.js?v=ba23b5ff:3672
invokeGuardedCallbackDev @ react-dom_client.js?v=ba23b5ff:3697
invokeGuardedCallback @ react-dom_client.js?v=ba23b5ff:3731
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=ba23b5ff:3734
executeDispatch @ react-dom_client.js?v=ba23b5ff:7014
processDispatchQueueItemsInOrder @ react-dom_client.js?v=ba23b5ff:7034
processDispatchQueue @ react-dom_client.js?v=ba23b5ff:7043
dispatchEventsForPlugins @ react-dom_client.js?v=ba23b5ff:7051
(anonym) @ react-dom_client.js?v=ba23b5ff:7175
batchedUpdates$1 @ react-dom_client.js?v=ba23b5ff:18907
batchedUpdates @ react-dom_client.js?v=ba23b5ff:3577
dispatchEventForPluginEventSystem @ react-dom_client.js?v=ba23b5ff:7174
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=ba23b5ff:5476
dispatchEvent @ react-dom_client.js?v=ba23b5ff:5470
dispatchDiscreteEvent @ react-dom_client.js?v=ba23b5ff:5447
Visa 15 ramar till
Visa färre
VM15:1 Error response: {message: 'could not create user', errors: 'E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "" }'}


this is something i can do if i want to handle this err 
but not sure that i needed to do this though
what i need is display err msg at frontend, so ill skip this for this moment
-------------
The error you're encountering is a MongoDB error related to the unique constraint you've set on the name field in your Mongoose schema. The specific error code is E11000 duplicate key error, and it occurs when MongoDB attempts to insert a document with a value for the name field that already exists in the collection.

In your case, the error message indicates that there's a duplicate key error on the name_1 index, which is associated with the name field in your users collection. The key { name: "" } suggests that the attempted insertion has an empty string as the value for the name field.

Here's the relevant part of the error message:

json
Copy code
{ 
  message: 'could not create user', 
  errors: 'E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "" }'
}
To handle this error more gracefully in your code, you can check for this specific error code in your catch block when saving the user:

javascript
Copy code
try {
  // ... (your existing code)
} catch (error) {
  console.error('Error creating user:', error);

  if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
    // MongoDB duplicate key error (unique constraint violation) for the 'name' field
    res.status(400).json({
      errors: {
        name: 'Name is already in use',
      },
    });
  } else {
    // Handle other errors
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
This modification checks if the error is a duplicate key error for the name field and sends a specific error message back to the client in that case.
------------


