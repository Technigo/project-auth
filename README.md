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