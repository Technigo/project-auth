# so im back.
but its hard to tell where i were. 
so ill make use of this to guide myself. 
first, am i connected to mongodb?
lets run the server.

# msg i got from the backend terminal

backend git:(master) ✗ npm run dev

> project-auth-backend@1.0.0 dev
> nodemon server.js --exec babel-node

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `babel-node server.js`
(node:45442) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:45442) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:45442) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080


i strongly feel im not connected to db. this is connected only for local.
Server running on http://localhost:8080
but ive defined like
const port = process.env.PORT || 8080;
so it should see the env first and then 8080.
is there any way to see wheter this 'process.env.PORT' is ignored and went to 8080 instead?
or is this not ignored but i cant see the connection somehow?

# but, before i proceed,
i just wanted to make sure i save this to somewhere else,
bcs i dont want to fuck this up. 
i think i did similiar thing before,
and i lost git at this repo,
and i made the whole repo again,
go get back git.
probably restarted, almost reworked the repo.
im afraid, but idk, lets do that

# did i lost connection with this repo with git?
lets test this out
-> i see. so good to go forward!

# to make sure that i am connected to mongodb
according to chatgpt, im connected to mongodb currently.
but i cant believe it.
i maybe had so much hard times assuring myself this
so i want to visualize this if i can.

# this makes it clear.
when im connected, i get msg connected from console
when im not connected, for example, switch the internet that have been not allowing connecting to mongodb, 
it shows me err msg.

# when succeed

 backend git:(master) ✗ npm run dev

> project-auth-backend@1.0.0 dev
> nodemon server.js --exec babel-node

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `babel-node server.js`
(node:51525) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:51525) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:51525) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB


# when failed

 backend git:(master) ✗ npm run dev

> project-auth-backend@1.0.0 dev
> nodemon server.js --exec babel-node

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `babel-node server.js`
(node:51282) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:51282) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:51282) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Error connecting to MongoDB: MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/
    at _handleConnectionErrors (/Users/catfood/project-auth/project-auth/backend/node_modules/mongoose/lib/connection.js:809:11)
    at NativeConnection.openUri (/Users/catfood/project-auth/project-auth/backend/node_modules/mongoose/lib/connection.js:784:11)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  reason: TopologyDescription {
    type: 'ReplicaSetNoPrimary',
    servers: Map(3) {
      'ac-pduuxjk-shard-00-00.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-01.0olueje.mongodb.net:27017' => [ServerDescription],
      'ac-pduuxjk-shard-00-02.0olueje.mongodb.net:27017' => [ServerDescription]
    },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: 'atlas-hjl0mu-shard-0',
    maxElectionId: null,
    maxSetVersion: null,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined
}



i mean, i had long unproductive time with this, so happy to be able to recognize this.
but it is still shame that i didnt know this fact at w 14, no one is telling me,
and needed to find out the fact after w 16, when everyone is running into final project.
im not sure that i have time to do final project for exact this reason.

but it is nice that i found out this after w16!
bcs while im doing this w16s project, i noticed something wrong,
so ive made this journey.
so if there was no this w16s project,
ill be graduating without knowing this fatal fact,
so let me say, how nice of this. im gracefull. 

but i cant still believe this can be happened, in not self taught course xD
i rly want my school to guide me if i am doing something wrong.
i mean if i study everything myself, there is only myself to be blame,
but to be assisted with my stupidness, i think i paid and put time and energy to align this course...
there is actually no one to watch what i am doing,
and my whole learning is done by me, im almost feeling like that.
wish i could get active help... not like in this way...

# haha, come on git, you are ready to log the change. 

# why my git is not taking this change at readme?

# yea, so this is connected to mongodb. what next?

right before i gave up, i was trying talk to server, that i have something to talk,
by submitting couple of words. 
i was curious whether this server is actually taking my words,
or it is actually rejecting.
i thought when i go to cloud.mongodb.com,
there should be log that server rejected my request,
but it is likely to be said, they dont have that feature. 
it is clear if i send validate info(or not, ive not tested it),
the database will be uploaded with my submitting,
but what if that i send wrong info?
where i can see something is wrong?

# lets look into frontend
bcs i submit via frontend

and yea, my old fellow cors error xD
from dev console of frontend


Access to fetch at 'https://one8-y5ov.onrender.com/users' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
App.jsx:8 
        
        
       POST https://one8-y5ov.onrender.com/users net::ERR_FAILED
postID @ App.jsx:8
handleButtonClick @ App.jsx:38
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
    at postID (App.jsx:8:30)
    at handleButtonClick (App.jsx:38:5)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=ba23b5ff:3672:22)
    at Object.invokeGuardedCallbackDev (react-dom_client.js?v=ba23b5ff:3697:24)
    at invokeGuardedCallback (react-dom_client.js?v=ba23b5ff:3731:39)
    at invokeGuardedCallbackAndCatchFirstError (react-dom_client.js?v=ba23b5ff:3734:33)
    at executeDispatch (react-dom_client.js?v=ba23b5ff:7014:11)
    at processDispatchQueueItemsInOrder (react-dom_client.js?v=ba23b5ff:7034:15)
    at processDispatchQueue (react-dom_client.js?v=ba23b5ff:7043:13)
    at dispatchEventsForPlugins (react-dom_client.js?v=ba23b5ff:7051:11)


has same result when i tried with deployed version. what is all this about??????


Access to fetch at 'https://one8-y5ov.onrender.com/users' from origin 'https://reliable-wisp-a561e3.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
index-95a77c2d.js:40 
        
        
       POST https://one8-y5ov.onrender.com/users net::ERR_FAILED 502 (Bad Gateway)
t @ index-95a77c2d.js:40
l @ index-95a77c2d.js:40
Fc @ index-95a77c2d.js:37
Uc @ index-95a77c2d.js:37
$c @ index-95a77c2d.js:37
si @ index-95a77c2d.js:37
Gs @ index-95a77c2d.js:37
(anonym) @ index-95a77c2d.js:37
xu @ index-95a77c2d.js:40
ws @ index-95a77c2d.js:37
Dl @ index-95a77c2d.js:37
bo @ index-95a77c2d.js:37
nf @ index-95a77c2d.js:37
index-95a77c2d.js:40 error: TypeError: Failed to fetch
    at t (index-95a77c2d.js:40:57449)
    at l (index-95a77c2d.js:40:57767)
    at Object.Fc (index-95a77c2d.js:37:9852)
    at Uc (index-95a77c2d.js:37:10006)
    at $c (index-95a77c2d.js:37:10063)
    at si (index-95a77c2d.js:37:31442)
    at Gs (index-95a77c2d.js:37:31859)
    at index-95a77c2d.js:37:36771
    at xu (index-95a77c2d.js:40:36724)
    at ws (index-95a77c2d.js:37:8988)


# https://stackoverflowteams.com/c/technigo/questions/4977
although this seems to be only temporary suggestion,
it got rid of cors error.
instead, im getting the error that i supposed to get,
saying this is not expected data. exactly, i wanted this.

VM86:1 error: SyntaxError: Unexpected end of input (at App.jsx:20:42)
    at postID (App.jsx:20:42)


# the info i got to get rid of cors err

1 Answer
Sorted by:

 
0

Hej Irupé!
Here's a temporary suggestion on how to work around this problem, by adding the no-cors mode to the fetch:

    // Send a POST request to the backend API
    try {
      const response = await fetch('https://backend-mentorshipproject-zzac2sf6oa-no.a.run.app/register', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
Share
Edit
Follow
answered Jun 5 at 15:33
Matilda Brunemalm's user avatar
Matilda BrunemalmAdmin
4,45911 gold badge55 silver badges9



# i made proper input field, and what i got back is err. nothing new at db

VM15:1 error: SyntaxError: Unexpected end of input (at App.jsx:22:42)
    at postID (App.jsx:22:42)
eval @ VM15:1
overrideMethod @ console.js:213
postID @ App.jsx:31
await in postID (asynkron)
handleButtonClick @ App.jsx:49
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
App.jsx:10 
        
        
       POST https://one8-y5ov.onrender.com/users net::ERR_ABORTED 502 (Bad Gateway)
postID @ App.jsx:10
handleButtonClick @ App.jsx:49
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
