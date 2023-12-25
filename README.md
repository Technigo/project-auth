# im back. as like yesterday, had time of stupidity for future education bcs i was scard of moving away from here. but everything i put to any further education turned out to be nothing, because i need portfolio for that as well, just like job application. i mean i can try without that, stating i dont have that and want to do this or that, but i just wanted to be confident. so it is just matter of the thoought that i always need something prior to learn something, not the system or process itself, but that is what i currently feel, so i say i wasted today again.

but what i need to do? it is clear. i need portfolio to present. so after i compelet w16, or in base of the knowledge i got from w16, nevertheless how late my final project would be, i will dive into it and use the result as my portfolio. i mean, once it is done, i need thousands of times for make use of it, to show it good to be shown to others, but regardless of it, i can say i have good reason to proceed, so no need to burn away every my remaining time and energy with anger, to be nothing.

and the thing is, im enjoying this. if i hated this just for a little bit, i would be already quit. for many other lives in general, i was needed something to focus on, achieve, learn, and make use out of what ive done. so this period played perfect role for me in that way, so even i get up in anger towards here every morning, ill say this gave me reason to be alive. it is good to achieve little thing in daily or weekly or short term basis. is that agile method or something? like poya said at very first day about how our class is organaizzed? ill never know, but it is way better than nothing. just wish, would be much better, if i did better than this......

so, dont be lost, and make use of it, by wrap this up fast as possible, and dive into the real project. i mean, if i can xD it is already 25/12... haha

# You are joined on Invalid Date

welcome, user!
you are joined on 'invalid date'
try again? (button)

err msg from chrome dev console, gone, due to reconnect.

currently, im getting 

GET http://localhost:8080/user 500 (Internal Server Error)

from

App.jsx:78 
        
        
       GET http://localhost:8080/user 500 (Internal Server Error)
fetchUserData @ App.jsx:78
(anonym) @ App.jsx:16
commitHookEffectListMount @ react-dom_client.js?v=ba23b5ff:16902
invokePassiveEffectMountInDEV @ react-dom_client.js?v=ba23b5ff:18318
invokeEffectsInDev @ react-dom_client.js?v=ba23b5ff:19695
commitDoubleInvokeEffectsInDEV @ react-dom_client.js?v=ba23b5ff:19680
flushPassiveEffectsImpl @ react-dom_client.js?v=ba23b5ff:19497
flushPassiveEffects @ react-dom_client.js?v=ba23b5ff:19441
(anonym) @ react-dom_client.js?v=ba23b5ff:19322
workLoop @ react-dom_client.js?v=ba23b5ff:195
flushWork @ react-dom_client.js?v=ba23b5ff:174
performWorkUntilDeadline @ react-dom_client.js?v=ba23b5ff:382
Visa 10 ramar till
Visa färre



which means there is something wrong while getting the date. 
however, my cloud has it.



_id
65883fc61c050e3c87992031
name
"11"
email
"22"
password
"$2a$10$COvZhxw4aD13YZ8vKncUIOPDET6SOZOgGX2/Aout77PCvfvRtS.dq"
accessToken
"70eb4df3c8047b32adc33ee71431e41f8ea810eb62e8b0c081f7e5f664ea673c779d27…"
createdAt
2023-12-24T14:27:18.155+00:00
__v
0

so there should be process gotten been wrong between those fetch.




# logs i got from 1,2,3, and 11,22,33, and invalid date
this will be gone someday, or will be hard to look back, so better save it here


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
[nodemon] restarting due to changes...
[nodemon] starting `babel-node server.js`
(node:15111) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:15111) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:15111) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
    at EventTarget.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/sdam/topology.ts:566:28)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:822:20)
    at EventTarget.dispatchEvent (node:internal/event_target:757:26)
    at abortSignal (node:internal/abort_controller:374:10)
    at TimeoutController.abort (node:internal/abort_controller:396:5)
    at Timeout.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/utils.ts:1273:61)
    at listOnTimeout (node:internal/timers:573:17)
    at processTimers (node:internal/timers:514:7) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: new ObjectId('7fffffff000000000000006a'),
    maxSetVersion: 3,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [Symbol(errorLabels)]: Set(0) {},
  [cause]: MongoNetworkError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
      at connectionFailureError (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:505:14)
      at TLSSocket.<anonymous> (/Users/catfood/project-auth/project-auth/backend/node_modules/mongodb/src/cmap/connect.ts:388:16)
      at Object.onceWrapper (node:events:634:26)
      at TLSSocket.emit (node:events:519:28)
      at TLSSocket.emit (node:domain:488:12)
      at emitErrorNT (node:internal/streams/destroy:169:8)
      at emitErrorCloseNT (node:internal/streams/destroy:128:3)
      at processTicksAndRejections (node:internal/process/task_queues:82:21) {
    [Symbol(errorLabels)]: Set(1) { 'ResetPool' },
    [cause]: Error: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net
        at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26) {
      errno: -3008,
      code: 'ENOTFOUND',
      syscall: 'getaddrinfo',
      hostname: 'ac-pduuxjk-shard-00-02.0olueje.mongodb.net'
    }
  }
}
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')
    at call (/Users/catfood/project-auth/project-auth/backend/server.js:98:44)
    at tryCatch (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator._invoke (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at Generator.next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at asyncGeneratorStep (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at _next (/Users/catfood/project-auth/project-auth/backend/server.js:2:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)




so, two types err in summary in backend terminal


error fetching user: MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net

error fetching user: TypeError: Cannot read properties of null (reading 'createdAt')



# connection issue 

1. MongoDB Connection Issue
The error MongoServerSelectionError: getaddrinfo ENOTFOUND ac-pduuxjk-shard-00-02.0olueje.mongodb.net suggests that your application is unable to connect to your MongoDB Atlas cluster. This could be due to a network issue or misconfiguration. Ensure that your MongoDB Atlas connection string is correctly configured in your .env file, and make sure your network allows connections to MongoDB Atlas.

am i rly having the connection issue?
i dont think so bcs i registered user to the cloud.
if i have the issue, how would i?


# currently this adding does nothing, but meant to play the role to not get invalid data

// format the date appropriately
    const formattedDate = user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt

    this, from

app.get('/user', async (req, res) => {
  try {
    // get access token from request header
    const accessToken = req.headers.authorization
    // find user in the database with access token
    const user = await User.findOne({ accessToken })
    // format the date appropriately
    const formattedDate = user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt
    // return user information
    res.status(200).json({ createdAt: user.createdAt })
  } catch (error) {
    console.error('error fetching user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})


# currently im having this err, but does nothing with displaying the result, no invalid date even i have this

Failed to load resource: the server responded with a status of 500 (Internal Server Error)

# what i did
is instead of
<p>You are joined on {new Date(userData?.createdAt).toLocaleString()}</p>
i removed new there, 
<p>You are joined on {Date(userData?.createdAt).toLocaleString()}</p>
from return for my app jsx

return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, User!</h1>
          {/* <p>to see userData exists or not, i add : to check</p> */}
          <p>You are joined on {Date(userData?.createdAt).toLocaleString()}</p>
          <button onClick={handleLogout}>try again?</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Name" value={inputName} onChange={handleNameChange} />
          <input type="text" placeholder="Email" value={inputEmail} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={inputPassword} onChange={handlePasswordChange} />
          <button onClick={handleButtonClick}>submit</button>
        </div>
      )}
    </div>
  )
};


dk why i got new there. was from chatgpt. and when i removed new, i got data, no invalid date,
so i removed this adding, that i did for data handling purpose, as well, bcs it does nothing
// format the date appropriately
    const formattedDate = user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt

this, from

app.get('/user', async (req, res) => {
  try {
    // get access token from request header
    const accessToken = req.headers.authorization
    // find user in the database with access token
    const user = await User.findOne({ accessToken })
    // format the date appropriately
    const formattedDate = user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt
    // return user information
    res.status(200).json({ createdAt: user.createdAt })
  } catch (error) {
    console.error('error fetching user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

# so.. no problem with fetch at least? i mean, i dont care err i have now,
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
bcs it does nothing currently

# wait, no, it presents current time, not createdAt

Welcome, User!
You are joined on Mon Dec 25 2023 14:06:47 GMT+0100 (centraleuropeisk normaltid)

try again?

what is wrong with this?



# the answer was

Handle Token in Server Code:
Ensure that you're correctly handling the Authorization header in the server code. You should extract the token from the header.
javascript
Copy code
const accessToken = req.headers.authorization.split(' ')[1];
Make sure to update this line in your /user route.


like, how would i know this?
i got this from chatgpt in accident
and angry because if this is this much simple, 
i needed to get this in seconds, not couple of days

i strongly feel if i learnt things properly,
i dont even need to deal this with chatgpt

i mean, it is good to solve the problem,
but this makes my life suffer in hell
was not happy at all in these days
and i think i have things to blame

but yea, the one to blame is probably myself
cause if ive done it earlier like 20 yrs before, im in no need to suffer with this nonsence
i can blame the school,
but that will end up with making my life destroyed
ive already been like that, so, no more

so it is just time... to... celeblate... the ... success...  idk... i dont think so...

# so, the answer was const accessToken = req.headers.authorization.split(' ')[1];
,
but want to clarify why i had such this error. why this made the app fetch,
and why couldnt before?


# If you were getting null without split(' ')[1], it indicates that the Authorization header in your HTTP request was not in the expected format.

The Authorization header for a Bearer token typically looks like this:

css
Copy code
Authorization: Bearer {token}
The word "Bearer" is followed by a space and then the actual token. If your header was different, for example, if it didn't include the word "Bearer" or if there was no space after "Bearer", the split operation would not work as expected.