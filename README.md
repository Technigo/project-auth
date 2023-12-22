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