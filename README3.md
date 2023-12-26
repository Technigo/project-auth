# from 11 till 3, was doing the stupidest thing.
got out of bed late as before. was putting 4 hrs of mobile gaming, 6 hr sleeping,
and then another 8 hrs for mobile game. 
idk where my life goes lol but this is what im currently on.
so yesterday was like that
and today, i had to think where to move
likely to russia, idk, cant stay here long
this made me feel rly insecure
so i rly wanted to apply somewhere that would keep me here
i knew that certain school, certain program that i wanted to apply 
require me math and programming for high school
i quit school when i was young so i dont have such like that
i knew but wanted to ignore
so used 11-3 imagining that im already at that school program
very stupid, i know, but felt happy once there 


so the fact is, this bootcamp is where that accepts me
i had no alternative
and have no alternative currently
which is sad
bcs ive already wasted this much
gotting almost nothing
saying that i was unlucky doesnt make time go back

1458,
and need to leave before 1600
couldnt rly look on user.save() not working
bcs i wasted all my energy imagining things that not likely come to me
so hard to work,
but to just not cry, i try write this


so user.save() is not actually saving
what could be the reason
i can ask chatgpt and see what it answers





# things having been rly bad.
now it is not responding with 
{id: '6586cd1f40383a4d4046ca18', accessToken: 'a77e03cc5eb178cbd396a6bcc2045b9171f5fc5c6cb2228a2f…cccc2395ac235887c4b469fc204ccfe8f8883cdf26f9af1c2'}
this, like yesterday, when i submit.


what i see now is just nothing, exactly nothing, no err, just white area. 


i cant even imagine what is the problem.
i rly want to restart the whole from the beginning
if so, at least ill see what is working for fresh built out app xD


now, now i see the err.
why, why is this this much slow?


seems like couple of minutes, is others getting things like this?
this is probably ive already deployed the backend?
render is amazing slow, and can this be based on that?
this makes me feel rly bad xD


anyway, familiar cors err currently.
werent i getting another err? like validating or syntax err when i submit?
why everyday different err even i didnt changed anything?
will this meaningful to handle this?
bcs this err seems to have nowhere that made from.
but i cant say im unlucky
and i dont want to cry

cant i just start over everything?
i dont want to stay here forever


# const response = await fetch('https://one8-y5ov.onrender.com/users', {
    this one had been problem. dk why, but i changed this to
    const response = await fetch('http://localhost:8080/users', {
        and, it started to work smoothly just like ive intended.
        why? idk!!! it just works.


        so, currently, when i send 1,2,3, which is already saved data, it spits err.

        App.jsx:20 
        
        
       POST http://localhost:8080/users 400 (Bad Request)
postID @ App.jsx:20
handleButtonClick @ App.jsx:69
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
VM15:1 Error response: {message: 'could not create user', errors: 'E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "1" }'}





and when i, lets say, use 11,22,33, it lets me log in, showing this at console.

{id: '65883fc61c050e3c87992031', accessToken: '70eb4df3c8047b32adc33ee71431e41f8ea810eb62e8b0c081…42f2120447e9e471b62e6c927d5fd339dcb695ae71d7164bd'}



so problem might restarts when i deploy, but whatever, it works in this way so no need to care.
maybe ill cry tomorrow xD





# god, its beautiful. this is what i wanted to see from the terminal

backend git:(master) ✗ npm run dev

> project-auth-backend@1.0.0 dev
> nodemon server.js --exec babel-node

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `babel-node server.js`
(node:89707) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:89707) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:89707) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB
[nodemon] restarting due to changes...
[nodemon] starting `babel-node server.js`
(node:10034) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:10034) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:10034) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB
Incoming Data: { name: '1', email: '2', password: '3' }
Received Data: { name: '1', email: '2', password: '3' }
user data before saving: {
  name: '1',
  email: '2',
  password: '$2a$10$846hPyRSjsmbMTR7xGkx1eNSA6jDsJciHWyfUz33ev84tWUJkFLCS',
  _id: new ObjectId('65883fac1c050e3c8799202f'),
  accessToken: '9a34b0f21db203aa9ec2b37368735e65599cfd78155fc812eabafa95e3652d449351e17989bb7812e4403f66c8d15e4f9cc59402b87f6e5ae98e8f1d93ec69b9ac162f1a59adcd3869fd92fe0b342261c97f1dedf66cede2d8bfcc8dee35654fdf342fb3b15c29e6dab34bebcf062bede3e8e332581f7abec099e739f2f7725e',
  createdAt: 2023-12-24T14:26:52.599Z
}
Error creating user: MongoServerError: E11000 duplicate key error collection: happyThoughts.users index: name_1 dup key: { name: "1" }
    at InsertOneOperation.execute (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/insert.ts:79:13)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at executeOperationAsync (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/operations/execute_operation.ts:190:12) {
  index: 0,
  code: 11000,
  keyPattern: { name: 1 },
  keyValue: { name: '1' },
  [Symbol(errorLabels)]: Set(0) {}
}
Incoming Data: { name: '11', email: '22', password: '33' }
Received Data: { name: '11', email: '22', password: '33' }
user data before saving: {
  name: '11',
  email: '22',
  password: '$2a$10$COvZhxw4aD13YZ8vKncUIOPDET6SOZOgGX2/Aout77PCvfvRtS.dq',
  _id: new ObjectId('65883fc61c050e3c87992031'),
  accessToken: '70eb4df3c8047b32adc33ee71431e41f8ea810eb62e8b0c081f7e5f664ea673c779d27a56b4f2de6ad643631f645f557321b189d32ffdd82bb8eaf76df13685246d3c90640c25397de25364f789430beb573802276e798789001f6e3d99520cdc8b4240d9be5ab842f2120447e9e471b62e6c927d5fd339dcb695ae71d7164bd',
  createdAt: 2023-12-24T14:27:18.155Z
}
user data after saving: {
  name: '11',
  email: '22',
  password: '$2a$10$COvZhxw4aD13YZ8vKncUIOPDET6SOZOgGX2/Aout77PCvfvRtS.dq',
  _id: new ObjectId('65883fc61c050e3c87992031'),
  accessToken: '70eb4df3c8047b32adc33ee71431e41f8ea810eb62e8b0c081f7e5f664ea673c779d27a56b4f2de6ad643631f645f557321b189d32ffdd82bb8eaf76df13685246d3c90640c25397de25364f789430beb573802276e798789001f6e3d99520cdc8b4240d9be5ab842f2120447e9e471b62e6c927d5fd339dcb695ae71d7164bd',
  createdAt: 2023-12-24T14:27:18.155Z,
  __v: 0
}
User saved successfully {
  name: '11',
  email: '22',
  password: '$2a$10$COvZhxw4aD13YZ8vKncUIOPDET6SOZOgGX2/Aout77PCvfvRtS.dq',
  _id: new ObjectId('65883fc61c050e3c87992031'),
  accessToken: '70eb4df3c8047b32adc33ee71431e41f8ea810eb62e8b0c081f7e5f664ea673c779d27a56b4f2de6ad643631f645f557321b189d32ffdd82bb8eaf76df13685246d3c90640c25397de25364f789430beb573802276e798789001f6e3d99520cdc8b4240d9be5ab842f2120447e9e471b62e6c927d5fd339dcb695ae71d7164bd',
  createdAt: 2023-12-24T14:27:18.155Z,
  __v: 0
}


# and then... where i was? i cant remember. 
i can create user, with createdAt.
i wanted to fetch this and show this to the logged in user.
so for exact 'and then use that token when making other requests to your API'
from the instruction
https://github.com/Technigo/project-auth/blob/master/instructions.md

# welcome, user! you are joined on invalid date 
failed to fetch 

GET http://localhost:8080/user net::ERR_CONNECTION_REFUSED
fetchUserData @ App.jsx:78
(anonym) @ App.jsx:16
commitHookEffectListMount @ react-dom_client.js?v=ba23b5ff:16902
invokePassiveEffectMountInDEV @ react-dom_client.js?v=ba23b5ff:18318
invokeEffectsInDev @ react-dom_client.js?v=ba23b5ff:19695
commitDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ba23b5ff:19680
flushPassiveEffectsImpl @ react-dom_client.js?v=ba23b5ff:19497
flushPassiveEffects @ react-dom_client.js?v=ba23b5ff:19441
commitRootImpl @ react-dom_client.js?v=ba23b5ff:19410
commitRoot @ react-dom_client.js?v=ba23b5ff:19271
performSyncWorkOnRoot @ react-dom_client.js?v=ba23b5ff:18889
flushSyncCallbacks @ react-dom_client.js?v=ba23b5ff:9133
flushSync @ react-dom_client.js?v=ba23b5ff:18953
scheduleRefresh @ react-dom_client.js?v=ba23b5ff:19998
renderer.scheduleRefresh @ renderer.js:592
(anonym) @ @react-refresh:267
performReactRefresh @ @react-refresh:256
setTimeout (asynkron)
(anonym) @ @react-refresh:666
validateRefreshBoundaryAndEnqueueUpdate @ @react-refresh:707
(anonym) @ App.jsx?t=1703427985026:166
(anonym) @ client.ts:559
(anonym) @ client.ts:476
(anonym) @ client.ts:323
queueUpdate @ client.ts:323
await in queueUpdate (asynkron)
(anonym) @ client.ts:176
handleMessage @ client.ts:174
(anonym) @ client.ts:91
Visa 20 ramar till
Visa färre
VM15:1 Error: TypeError: Failed to fetch
    at fetchUserData (App.jsx:78:30)
    at App.jsx:16:7
    at commitHookEffectListMount (react-dom_client.js?v=ba23b5ff:16902:34)
    at invokePassiveEffectMountInDEV (react-dom_client.js?v=ba23b5ff:18318:19)
    at invokeEffectsInDev (react-dom_client.js?v=ba23b5ff:19695:19)
    at commitDoubleInvokeEffectsInDEV (react-dom_client.js?v=ba23b5ff:19680:15)
    at flushPassiveEffectsImpl (react-dom_client.js?v=ba23b5ff:19497:13)
    at flushPassiveEffects (react-dom_client.js?v=ba23b5ff:19441:22)
    at commitRootImpl (react-dom_client.js?v=ba23b5ff:19410:13)
    at commitRoot (react-dom_client.js?v=ba23b5ff:19271:13)





