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


# i submit nothing nothing nothing again
when i made lines for registrationerr
and got this at backend console

[nodemon] restarting due to changes...
[nodemon] starting `babel-node server.js`
(node:57084) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:57084) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:57084) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB
Incoming Data: { name: '', email: '', password: '' }
Received Data: { name: '', email: '', password: '' }
user data before saving: {
  name: '',
  email: '',
  password: '$2a$10$cxjiwxQa4c3ylG.XTdj0wOhN17YY.Ah146yAv/J8MTEaxJ.5c8s5G',
  _id: new ObjectId('658aa2e61846258f8184b5cd'),
  accessToken: '8d09039b88b5d4ab8c2beb78ad6fa7fd303deb659ec8a0872d8689fd5c33c8fedc0d4e86dbc8211f18a60891834cf89f5df339cf02696fc650269a24a6302dbe9a3e7bcc73d864157e009948184b1b676be69466ff66c8ff56507278f8f65025cfc39183a5af5c81af029f412f179bdeef7ed8196c33ac3d4175988b830cf6cc',
  createdAt: 2023-12-26T09:54:46.487Z
}
Error creating user: MongoServerError: E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "" }
    at InsertOneOperation.execute (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/insert.ts:79:13)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at executeOperationAsync (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/execute_operation.ts:190:12) {
  index: 0,
  code: 11000,
  keyPattern: { name: 1 },
  keyValue: { name: '' },
  [Symbol(errorLabels)]: Set(0) {}
}
/Users/catfood/project-auth/project-auth/backend/server.js:111
          setRegistrationError(_context.t0.message);
          ^

ReferenceError: setRegistrationError is not defined
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:85:5)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.throw (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _throw (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

Node.js v21.2.0
[nodemon] app crashed - waiting for file changes before starting...

# did i copy pasted this? i cant remember.
this is what i got from chrome console
when i submit same value as before when i register
while setting lines for registrationerr

POST http://localhost:8080/users net::ERR_CONNECTION_REFUSED
postID @ App.jsx:25
handleButtonClick @ App.jsx:75
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
VM15:1 error: TypeError: Failed to fetch
    at postID (App.jsx:25:30)
    at handleButtonClick (App.jsx:75:5)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=ba23b5ff:3672:22)
    at Object.invokeGuardedCallbackDev (react-dom_client.js?v=ba23b5ff:3697:24)
    at invokeGuardedCallback (react-dom_client.js?v=ba23b5ff:3731:39)
    at invokeGuardedCallbackAndCatchFirstError (react-dom_client.js?v=ba23b5ff:3734:33)
    at executeDispatch (react-dom_client.js?v=ba23b5ff:7014:11)
    at processDispatchQueueItemsInOrder (react-dom_client.js?v=ba23b5ff:7034:15)
    at processDispatchQueue (react-dom_client.js?v=ba23b5ff:7043:13)
    at dispatchEventsForPlugins (react-dom_client.js?v=ba23b5ff:7051:11)


# after that, i passed the parameter 'setRegistrationError' and getting 'failed to fetch' at console. where this comes from? want to edit the msg if i can

what i did is from here

The issue you're encountering is because setRegistrationError is not defined in the scope of your postID function. In a React functional component, you can't use setRegistrationError directly outside the functional component. To solve this, you need to pass the setRegistrationError function as a prop to the postID function.

Here's how you can modify your code to fix the issue:

Update the postID function to accept setRegistrationError as a parameter:
javascript
Copy code
const postID = async (setRegistrationError) => {
  try {
    // ... (rest of the function remains unchanged)
  } catch (error) {
    console.error('error:', error);
    setRegistrationError(error.message);
    res.status(400).json({ message: 'could not create user', errors: error.message });
  }
}
When calling postID in your component, pass setRegistrationError as an argument:
javascript
Copy code
const handleButtonClick = () => {
  // trigger the POST request when the button is clicked
  postID(setRegistrationError);
}
By doing this, you ensure that the setRegistrationError function is available within the postID function. This pattern is a common way to handle state updates in asynchronous functions that are not directly part of the component's scope.


so where comes from 'failed to fetch' at frontend and why that comes and how to fix this?


chrome console

App.jsx:25 
        
        
       POST http://localhost:8080/users net::ERR_CONNECTION_REFUSED
postID @ App.jsx:25
handleButtonClick @ App.jsx:77
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
VM15:1 error: TypeError: Failed to fetch
    at postID (App.jsx:25:30)
    at handleButtonClick (App.jsx:77:5)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=ba23b5ff:3672:22)
    at Object.invokeGuardedCallbackDev (react-dom_client.js?v=ba23b5ff:3697:24)
    at invokeGuardedCallback (react-dom_client.js?v=ba23b5ff:3731:39)
    at invokeGuardedCallbackAndCatchFirstError (react-dom_client.js?v=ba23b5ff:3734:33)
    at executeDispatch (react-dom_client.js?v=ba23b5ff:7014:11)
    at processDispatchQueueItemsInOrder (react-dom_client.js?v=ba23b5ff:7034:15)
    at processDispatchQueue (react-dom_client.js?v=ba23b5ff:7043:13)
    at dispatchEventsForPlugins (react-dom_client.js?v=ba23b5ff:7051:11)
eval @ VM15:1
overrideMethod @ console.js:213
postID @ App.jsx:51
await in postID (asynkron)
handleButtonClick @ App.jsx:77
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
App.jsx:53 Uncaught (in promise) ReferenceError: res is not defined
    at postID (App.jsx:53:7)


this is from backend terminal.
still having duplicate err and setregi not defiined

[nodemon] restarting due to changes...
[nodemon] starting `babel-node server.js`
(node:57084) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:57084) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:57084) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB
Incoming Data: { name: '', email: '', password: '' }
Received Data: { name: '', email: '', password: '' }
user data before saving: {
  name: '',
  email: '',
  password: '$2a$10$cxjiwxQa4c3ylG.XTdj0wOhN17YY.Ah146yAv/J8MTEaxJ.5c8s5G',
  _id: new ObjectId('658aa2e61846258f8184b5cd'),
  accessToken: '8d09039b88b5d4ab8c2beb78ad6fa7fd303deb659ec8a0872d8689fd5c33c8fedc0d4e86dbc8211f18a60891834cf89f5df339cf02696fc650269a24a6302dbe9a3e7bcc73d864157e009948184b1b676be69466ff66c8ff56507278f8f65025cfc39183a5af5c81af029f412f179bdeef7ed8196c33ac3d4175988b830cf6cc',
  createdAt: 2023-12-26T09:54:46.487Z
}
Error creating user: MongoServerError: E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "" }
    at InsertOneOperation.execute (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/insert.ts:79:13)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at executeOperationAsync (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/execute_operation.ts:190:12) {
  index: 0,
  code: 11000,
  keyPattern: { name: 1 },
  keyValue: { name: '' },
  [Symbol(errorLabels)]: Set(0) {}
}
/Users/catfood/project-auth/project-auth/backend/server.js:111
          setRegistrationError(_context.t0.message);
          ^

ReferenceError: setRegistrationError is not defined
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:85:5)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.throw (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _throw (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)

Node.js v21.2.0
[nodemon] app crashed - waiting for file changes before starting...



# current: when i send nothign nothing nothing, i see 'could not create user' from app with red letter. i got this for console

App.jsx:25 
        
        
       POST http://localhost:8080/users 400 (Bad Request)
postID @ App.jsx:25
handleButtonClick @ App.jsx:82
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
VM120:1 Error response: {message: 'could not create user', errors: 'E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "" }'}


might be intended... now?
want to add line to make sure i have err msg from certain place.
and then, i assume chatgpt added me many unnecessary line so want to remove them if i can

# When the unique: true constraint is violated (i.e., when an attempt is made to insert a document with a field value that already exists and is marked as unique), MongoDB will raise a duplicate key error. The error code for this situation is E11000. In Mongoose, this error is typically handled with an MongoServerError object.
so.. since i have e11000 err when i submit the same value, and since this is intended and displaying err msg at frontend side, i guess ive handled this...?
regarding for this at requirements?
Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend (displaying the errors in a nice way in the frontend is a stretch goal - it’s fine to just show 'Something went wrong' on the frontend if you run out of time).

# okay. what next? no. i need break. 
i mean, this shouldnt be this much hard.
bcs i dont know how to learn, im experiencing this nonsense.
and participating course means i learn how to learn better
which happens not well for me in this case
idk, ill wrap up what ive done, git commit and push, 
and come back with better mood

and i think this is nothing with setregistrationerror. gpt seemed added things that not needed.
when i am willing to, i need to remove those

# Make sure to clear or reset the error state appropriately (for example, when the user dismisses the error or successfully registers) to provide a clean experience when interacting with your application.

i probably need to do this, but whatever, im out.


# how do I show this json at frontend? 
} catch (error) {
  console.error('Error creating user:', error)
  res.status(400).json({ message: 'could not create user for some reason', errors: error.message })
}


how do I show this json at frontend? 

ChatGPT
In your React component (App.jsx), you have the following code to display error messages received from the server:

jsx
Copy code
<p style={{ color: 'red' }}>{loginError}{registrationError}</p>
This code assumes that loginError and registrationError are state variables that store the error messages. Based on your code, it seems like you're setting the error messages in the state when handling registration errors. For example:

jsx
Copy code
setRegistrationError(error.message || 'could not create user');
This sets the registration error message in the component's state, and you're using it to display the error message in your JSX.

Here's a breakdown:

When an error occurs during user registration in your API, you catch the error and send a JSON response with the error message:
javascript
Copy code
} catch (error) {
  console.error('Error creating user:', error);
  res.status(400).json({ message: 'could not create user for some reason', errors: error.message });
}
In your React component, you have state variables to hold the error messages:
jsx
Copy code
const [loginError, setLoginError] = useState(null);
const [registrationError, setRegistrationError] = useState(null);
When an error occurs during registration, you set the error message in the state:
jsx
Copy code
setRegistrationError(error.message || 'could not create user');
Finally, you display the error message in your JSX:
jsx
Copy code
<p style={{ color: 'red' }}>{loginError}{registrationError}</p>
Make sure to clear or reset the error state appropriately (for example, when the user dismisses the error or successfully registers) to provide a clean experience when interacting with your application.


# i have problem with 
The authenticated endpoint should return a 401 or 403 (see 401 vs. 403 on SO) with an error message if you try to access it without an Authentication access token or with an invalid token.
because regardless of that i have this at my frontend side,
i dont have this working at my backend side(at backend terminal)
and the authenticated endpoint should return ... this one probably means
endpoint = backend
so should work for backend.
i did my best to display err msg at backend side, 

at here,

app.get('/user', async (req, res) => {
  try {
    // check if auth header exists
    if(!req.headers.authorization) {
      return res.status(401).json({ message: 'Unauthorized: Missing access token'})
    }
    // get access token from request header
    const accessToken = req.headers.authorization.split(' ')[1]
    console.log('Received Access Token:', accessToken)
    // find user in the database with access token
    const user = await User.findOne({ accessToken })
    console.log('User:', user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // return user information
    res.status(200).json({ createdAt: user.createdAt })
  } catch (error) {
    console.error('error fetching user:', error)
    // res.status(500).json({ message: 'Internal Server Error' })
    res.status(401).json({ message: 'Unauthorized: Invalid access token' })
  }
})

adding lines like
 // check if auth header exists
    if(!req.headers.authorization) {
      return res.status(401).json({ message: 'Unauthorized: Missing access token'})
    }

and
} catch (error) {
    console.error('error fetching user:', error)
    // res.status(500).json({ message: 'Internal Server Error' })
    res.status(401).json({ message: 'Unauthorized: Invalid access token' })
  }
})

but none of those working, and couldnt catch the reason, 
this made me not feeling well.

but seeing this line from gpt made me explode

However, keep in mind that if there is a network error or a CORS issue, the browser may not expose the detailed error information to your frontend due to security policies. In such cases, you might see a generic error message in the frontend console.


i dont want to take care of network issue anymore.
ive had that enough.



but the fact is gpt is likely to say whatever it programmed to say
so i got angry by the text, not the fact.


i still dont know why my backend is not showing me any err log


but what is meaning of this actually?


The authenticated endpoint should return a 401 or 403 (see 401 vs. 403 on SO) with an error message if you try to access it without an Authentication access token or with an invalid token.

endpoint = backend
401 or 403 = should take place at backend console, for example, vscode terminal


what i failed: to see err msg at backend terminal

reason : dk why. but im tired and frustrated by this


# so?
ill skip this, and see what happens next
if this is that much important, 
i might not go forward.
when i resubmit this project
this might not be passed
if they pass this project
that means here is no problem
(or they actually dont care what i actually did, who knows)
so i stop here by stop generating more unnecessary pain


# so.. what left? stretch goals?
no. ill stop here
i might be come back
just like im in need of come back to every weekly project
bcs ive never thought ive learned things properly
(there was only one week for the exeption. now i dont even remember when that was)


what next is dive me into final project.
i dont actually care for final project,
but the thing is this one will work for me for portfolio to apply further education
and since i have nothing that i can say 
that made by myself,
so since i dont feel to put any of the weekly projects ive done to the actual portfolio,

i mean, this might be the first trial to create something that is made by me
its too late but regardless of that, i want to dive into this without hesistating

and make myself to go forward, to get further education or job, whatever,
the thing is i rly dont want to stay here crying and using curse word for those who were unfortunately had been with me. i mean it is their fault, but i dont want to hurt myself anymore. i dont want to get up in anger and slow down that anger when i wrap up the day. my life is wasted and i admit this, i dont validate the education i had just because i dont want to admit the fact. but the thing is what i might need is stop hurting myself like this. i was happy bcs i lived life that i wanted, and now, im giving my best to, continue this, by any way, and i need portfolio for that purpose.

