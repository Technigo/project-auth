# ive created createdAt field, and added process to handle logout the user.
my local storage current has no access token, which indicates ive successfully logged out.
but the problem is with creating new user.
i highyly doubt that i was able to do this.
because this likely supposed to create multiple user probably?
i remember i tested this thousand times yesterday.
and what i have currently is, only

{"_id":{"$oid":"6585928bba80c151c3f2452f"},"name":"1","email":"2","password":"$2a$10$tV310roYSSsAlMmOmRjn9u0dTq2m1wJ4/.aSy0iNIao0Lx/D.Gqu2","accessToken":"9d618fd67e409361a70c34c80d7cf0e72487c430b05d12bf92d48dd53e0e1a58457399671f4f08011f0aca161c1a212e33a0295bcf108bb41b73707faf6248c65338d357ba8c737956950c27f901e8a0f2d18ec7200a63dc7a4d857180b6870f5be49cc2d4407b78299df5263ce5a332fd964cfe9fd9652cb435bbee778029c5","__v":{"$numberInt":"0"}}

this single document.
not multiple document with several 1 2 3 that i input through input field.
so, in summary, although i have something like this at browser console every single time that i submit data 1 2 3 with creating new user,

{id: '6586cd1f40383a4d4046ca18', accessToken: 'a77e03cc5eb178cbd396a6bcc2045b9171f5fc5c6cb2228a2f…cccc2395ac235887c4b469fc204ccfe8f8883cdf26f9af1c2'}

this indicates this is not happeneing database side. probably only for server side,
or im not even sure with this, bcs accesstoken is what i implemented at backend.
it works only for backend code, server.js.


# so, what is the actual problem currently?
when i create user with 4 5 6 with input field, it doesnt update database cloud.
what i see is only formal 1 2 3. of course, not with createdAt field.
why i could create 1 2 3 before,
and why i cant create 4 5 6 currently?

# err msg from dev console
it is... very familiar, cors error.
this happened before to me, 
when i submit wrong user field.
but i highly doubt this process, bcs i was able to create user with 1 2 3 before, probably.
forst, ill force this cors error to removed, just like what i did before, with unable cors,
and ill see how i handle this after.

{id: '6586cd1f40383a4d4046ca18', accessToken: 'a77e03cc5eb178cbd396a6bcc2045b9171f5fc5c6cb2228a2f…cccc2395ac235887c4b469fc204ccfe8f8883cdf26f9af1c2'}accessToken: "a77e03cc5eb178cbd396a6bcc2045b9171f5fc5c6cb2228a2f0015d7e557dc273878d007f60608cf81e9d82e61f46e60edcdd5cae17f5b5bf5c2c834228962bdbc56e0777b48a23e996bfe5ee32712bf9b330376b6608af8d98ee34fc8eadc8240eb886d92d9624cccc2395ac235887c4b469fc204ccfe8f8883cdf26f9af1c2"id: "6586cd1f40383a4d4046ca18"[[Prototype]]: Object
localhost/:1 Access to fetch at 'https://one8-y5ov.onrender.com/users' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
App.jsx:19 
        
        
       POST https://one8-y5ov.onrender.com/users net::ERR_FAILED
postID @ App.jsx:19
handleButtonClick @ App.jsx:68
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
    at postID (App.jsx:19:30)
    at handleButtonClick (App.jsx:68:5)
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
postID @ App.jsx:44
await in postID (asynkron)
handleButtonClick @ App.jsx:68
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


# oh no. i think ive fucked this up.
so when i enabled no cors mode, the dev console started to spit out nothing.
not even single

{"_id":{"$oid":"6585928bba80c151c3f2452f"},"name":"1","email":"2","password":"$2a$10$tV310roYSSsAlMmOmRjn9u0dTq2m1wJ4/.aSy0iNIao0Lx/D.Gqu2","accessToken":"9d618fd67e409361a70c34c80d7cf0e72487c430b05d12bf92d48dd53e0e1a58457399671f4f08011f0aca161c1a212e33a0295bcf108bb41b73707faf6248c65338d357ba8c737956950c27f901e8a0f2d18ec7200a63dc7a4d857180b6870f5be49cc2d4407b78299df5263ce5a332fd964cfe9fd9652cb435bbee778029c5","__v":{"$numberInt":"0"}}

that i used to had when i submit with 1 2 3 at least. wait, was i getting this with 4,5,6? cant remember so ill go up and see.
it is probably saying i had this first when i tested with 4 5 6 ?
and then, maybe i enabled no cors mode and it just stopped to work?
so i disabled this again, and totally fucked up. stopped to working, giving me nothing.
i highly regret that i backup this before i try enable no cors mode
but like
how would i know it?
do i need to back up every single time that i try implement new change every single time?
with creating every single new repo every single time?
if so, im out. it doesnt makes sense.
i mean, the others should being working better than what i am.
i dont think others have possiblity with this much fucked up as i have.
but how can i know how others are doing?
conversation system is totally blocked wity my school currently. not helping me at all.
but what i need is community, i need this so bad, to exchange each others status and exchange how each others work
when the face this kind of ridiculous working situation
i hope rly, technigo had gave me this kind of working invironment
i was expecting exactly this when i applied to this school
there is no point to just learn self when im paying and participating at school
so this is wrong. what i can say is this is wrong. i wish my wish has voice and goes to someone who understands me



# while i was mad...

and then, the dev console finally gave me the result.
so, it was not fucked up at all, but it was just fucking slow to respond.
just usual cors error when i send 4 5 6 with disabled no cors mode.
so need to enable this and see what happens again xD

(the usual cors error that i used to have when having problem with input field)
Access to fetch at 'https://one8-y5ov.onrender.com/users' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
App.jsx:19 
        
        
       POST https://one8-y5ov.onrender.com/users net::ERR_FAILED
postID @ App.jsx:19
handleButtonClick @ App.jsx:68
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
    at postID (App.jsx:19:30)
    at handleButtonClick (App.jsx:68:5)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=ba23b5ff:3672:22)
    at Object.invokeGuardedCallbackDev (react-dom_client.js?v=ba23b5ff:3697:24)
    at invokeGuardedCallback (react-dom_client.js?v=ba23b5ff:3731:39)
    at invokeGuardedCallbackAndCatchFirstError (react-dom_client.js?v=ba23b5ff:3734:33)
    at executeDispatch (react-dom_client.js?v=ba23b5ff:7014:11)
    at processDispatchQueueItemsInOrder (react-dom_client.js?v=ba23b5ff:7034:15)
    at processDispatchQueue (react-dom_client.js?v=ba23b5ff:7043:13)
    at dispatchEventsForPlugins (react-dom_client.js?v=ba23b5ff:7051:11)

    (but wait, where is familiar id and accesstoken that i used to got when submit?
    in this case, it doesnt contains log with id and accesstoken that looks like this
    
{id: '6586cd1f40383a4d4046ca18', accessToken: 'a77e03cc5eb178cbd396a6bcc2045b9171f5fc5c6cb2228a2f…cccc2395ac235887c4b469fc204ccfe8f8883cdf26f9af1c2'}

which means this is the current problem.)

so, currently, when i submit 4 5 6 at input field, i am having both cors err and 'not generated console log for id and accesstoken err' if i call this correctly.

and, before, like yesterday, when i submit 1 2 3 , i had no cors error, neither 'not generated ... err'. i had console log actually yesterday.

oh no. i rly dont know how to proceed.
lets shut up and just handle cors feature first. at least, i have possiblity of get rid of cors error at least. 



# i enabled this, mode: 'no-cors',
and getting this. rly clear.

VM15:1 error: SyntaxError: Unexpected end of input (at App.jsx:31:42)
    at postID (App.jsx:31:42)


-> i think im having this bcs i enabled 'no-cors', which blocks to make valid JSON.
so.. not related to no-cors probably?
but, like before, yesterday, when i handle 1 2 3 submit, i had same problem with cors,
and i solved this with 1.having valid input first 2. and then disable no-cors
this is related with cors error. what was yesterday?
#1. without having no cors mode, i had cors error.
#2. with having enabled no cors mode, i had probably input err, probably. i cant remember but likely like this. 
#3. by fixing input problem, and disabling no cors mode, i could access to welcome page? or i could manage create user? or i could store the accesstoken? cant remember rly, but something between this, meaning i felt ive solved the problem at that time yesterday.

# so... what to do now?
make sure my current input is valid.
-> haha, chatgpt says 4,5,6 is no problem. then what?
would 1,2,3 had problem also?
then how would i post at the cloud database? no clue at all xDDDDD
if i cant fix input bcs i cant find any problem there, then no meaning of taking care of cors now. bcs it seemed work yesterday, but not for today. cant take same approach,
or i might mistaken something. probably i failed yesterday and thoought i was succeed with input and cloud and things like that xDDDD rly not sure how to start or what to continue

lets disable no cors first then
and then forget everything that happened today,
and then try to take a look again with current err msg that i got from dev console from browser,
which saying

VM15:1 error: SyntaxError: Unexpected end of input (at App.jsx:31:42)
    at postID (App.jsx:31:42)




# was able to inject accesstoken direct to local storage and see the result saying welcome user.
what next?
so token is working
but creating user is not working
but was working yesterday, or seemed to at least
so... like why? rly frustrated


# i cant register user and dont know why

# i register 1 2 3 just like ive did yesterday, and chrome dev console is not responding. might server is too slow or having problem somewhere. rly feel bad about this slow process. but no. while i try this and that while waiting, it spitted out this familiar console log at chorme dev console.

saying,
{id: '6586e0515cd947fdd72e65a9', accessToken: 'c46daf26ac72a15ac28378af23f4bfbcb11c3325eaa1f6be94…6a1aacb8408632505d779badbf24499859651c33b194bc5b1'}

showing, 
welcome, user


where this accesstoken comes from?
super sure not comes from, or stored at cloud mongodb.
bcs when i refresh, what i see is only this,

_id
6585928bba80c151c3f2452f
name
"1"
email
"2"
password
"$2a$10$tV310roYSSsAlMmOmRjn9u0dTq2m1wJ4/.aSy0iNIao0Lx/D.Gqu2"
accessToken
"9d618fd67e409361a70c34c80d7cf0e72487c430b05d12bf92d48dd53e0e1a58457399…"
__v
0


which is very much different from what i got.


it seems pretty sure it generetes token and stuff when i submit at register.
but it seems it is not storing the data at cloud mongodb.
but bcs it stores 'this' data, not loads the data from 'cloud mongo', at localstorage,
the browser uses this token to log in,
so pretty much not about the mongodb cloud itself.
haha having been doing wrong structure. this is not communicating with cloud server but with my very local.


so the correct following step should be,
when i register,
it stores the user data at cloud first.
idk why 123 before seemed to be happen to be stored for cloud.

but it is clear that the data im seeing from cloud
{"_id":{"$oid":"6585928bba80c151c3f2452f"},"name":"1","email":"2","password":"$2a$10$tV310roYSSsAlMmOmRjn9u0dTq2m1wJ4/.aSy0iNIao0Lx/D.Gqu2","accessToken":"9d618fd67e409361a70c34c80d7cf0e72487c430b05d12bf92d48dd53e0e1a58457399671f4f08011f0aca161c1a212e33a0295bcf108bb41b73707faf6248c65338d357ba8c737956950c27f901e8a0f2d18ec7200a63dc7a4d857180b6870f5be49cc2d4407b78299df5263ce5a332fd964cfe9fd9652cb435bbee778029c5","__v":{"$numberInt":"0"}}
this one, happened to be stored accidently, or some process with i dont know,
or by mistake,


and i just want to make sure my app is currently not storing user at cloud. 
i think there is possiblity , regardless of trial of 456, 
when i try 123, there is already 123.
there is no process for validate this already existing data or not
so can be this-related-problem,

but just wanted to make sure i can register first.

it is 14:36
but im rly feeling uncomfortable bcs of problem that related to the place i chose
for todays work
im not sure. will i be able to manage recover myself today within this short moment?

idk. im not sure. but i want to give try,
bcs today is good day, i dont want to lose today
just due to minor problem such like this. 

wish me to manage to come back.
i will register the user somehow, i strongly want this



# not the exact err handling, but this is suggested by chatgpt. see if this helps submit to cloud

It seems like your backend code is set up correctly to handle POST requests and save user data to MongoDB using Mongoose. However, there are a few points to check:

Error Handling in Backend:
In your backend code, you have an error variable named error, but in the catch block, you are using err. This might be causing the error message not to be logged properly. Change errors: err.errors to errors: error.errors:
javascript
Copy code
} catch (error) {
  res.status(400).json({ message: 'could not create user', errors: error.errors });
}
Async/Await Issue:
The user.save() method is asynchronous, so you should use await to make sure it completes before sending the response. Update the relevant part of your code like this:
javascript
Copy code
const user = new User({ name, email, password: bcrypt.hashSync(password) });
await user.save();
res.status(201).json({ id: user._id, accessToken: user.accessToken });




# qna from chatgpt. i edited some of the suggestion,
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })
mongoose.Promise = Promise;

// create a user model using mongoose
// with properties for your registered user
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    // i would like to remove this unique true for email
    // bcs i hated this when i use website.
    // i wanted to create multiple id but was hard to have many email for it
    // but since i need to learn the structure first, ill leave this here haha
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start ////////
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// to store a users access token here
// so, we store using here, but how we see it back?
app.post('/users', async (req, res) => {
  // this is not working. why??
  console.log('Incoming Data:', req.body)
  try {
    const {name, email, password} = req.body
    const user = new User({name, email, password: bcrypt.hashSync(password)})
    await user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({message: 'could not create user', errors: error.errors})
    // get err
    // open diegos codealong
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// need data validation because regardless of what i input, it creates new user
// then there should be user list that has plenty of user. where is it?



I think ive got all the changes you've recommended me.

i logged in with registering 1,2,3

I got this, from the chrome dev console

{id: '6586ef2513dfec5526519b6a', accessToken: '339c48b50a89dec2622c7fe95c40e1318bd587a815e6527102…b3285d348ad37432f88345fd3f16fe8bcc356e5360653a239'}

however, I am not getting the error message from the console

which supposed to be related with this line.

} catch (error) {
  console.error('Error creating user:', error);
  res.status(400).json({ message: 'could not create user', error: error.message });
}



what I got from backend terminal from my vscode is just like normal days, 

backend git:(master) ?✗ npm run dev

> project-auth-backend@1.0.0 dev
> nodemon server.js --exec babel-node

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `babel-node server.js`
(node:87819) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:87819) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:87819) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
Server running on http://localhost:8080
Connected to MongoDB



nothing about error.




and when I see cloud.mongodb.com and see my database, 
there is no new data created , with new token or id, but this old data from my old trial long time ago.

{"_id":{"$oid":"6585928bba80c151c3f2452f"},"name":"1","email":"2","password":"$2a$10$tV310roYSSsAlMmOmRjn9u0dTq2m1wJ4/.aSy0iNIao0Lx/D.Gqu2","accessToken":"9d618fd67e409361a70c34c80d7cf0e72487c430b05d12bf92d48dd53e0e1a58457399671f4f08011f0aca161c1a212e33a0295bcf108bb41b73707faf6248c65338d357ba8c737956950c27f901e8a0f2d18ec7200a63dc7a4d857180b6870f5be49cc2d4407b78299df5263ce5a332fd964cfe9fd9652cb435bbee778029c5","__v":{"$numberInt":"0"}}



am I connected to the database?
since I have this, from the chrome dev console
{id: '6586ef2513dfec5526519b6a', accessToken: '339c48b50a89dec2622c7fe95c40e1318bd587a815e6527102…b3285d348ad37432f88345fd3f16fe8bcc356e5360653a239'}
i assume my backend is working as intended


but since this-related data is something I cant see at cloud.mongodb.com,
there might be error connecting there?


or,
why I cant update the cloud by submitting by my app?









import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import crypto from "crypto"
import bcrypt from "bcrypt-nodejs"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })
mongoose.Promise = Promise;

// create a user model using mongoose
// with properties for your registered user
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    // i would like to remove this unique true for email
    // bcs i hated this when i use website.
    // i wanted to create multiple id but was hard to have many email for it
    // but since i need to learn the structure first, ill leave this here haha
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start ////////
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// to store a users access token here
// so, we store using here, but how we see it back?
app.post('/users', async (req, res) => {
  // this is not working. why??
  console.log('Incoming Data:', req.body)
  try {
    const {name, email, password} = req.body
    const user = new User({name, email, password: bcrypt.hashSync(password)})
    await user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({message: 'could not create user', errors: error.errors})
    // get err
    // open diegos codealong
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


/// need data validation because regardless of what i input, it creates new user
// then there should be user list that has plenty of user. where is it?





import { useState, useEffect } from "react";

export const App = () => {
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // check if the user is already logged in by looking for the access token in local storage
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
    }
  }, [])

  const postID = async () => {
    try {
      const response = await fetch('https://one8-y5ov.onrender.com/users', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ name: inputName, email: inputEmail, password: inputPassword })
      }) 
      
      // handle error response till.ex. cors error
      // it is currently not working, then what is this for?
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        return
      }

      // handle response
      const data = await response.json()
      console.log(data)

      // store the access token in local storage
      localStorage.setItem('accessToken', data.accessToken)
      setIsLoggedIn(true) // update state bcs the localstorage has accesstoken saved
    } catch (error) {
      console.error('error:', error)
    }
  }

  const handleLogout = () => {
    // clear the access token from local storage
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false) // update state saying the user is logged out
  }

  const handleNameChange = (event) => {
    setInputName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setInputEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value)
  }

  const handleButtonClick = () => {
    // trigger the POST request when the button is clicked
    postID()
  }
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, User!</h1>
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


// handle error when post failed - i guess i have so? then where to check it?
// try to get the data at cloud.mongodb.com when you post

ChatGPT
It looks like your code is set up correctly, and you've taken the necessary steps to log errors in your backend. The fact that you're not seeing error messages in the console suggests that the catch block is not being executed or the error object doesn't contain the expected errors property.

To get more information about the error, you can modify your catch block to log the entire error object:

javascript
Copy code
} catch (error) {
  console.error('Error creating user:', error);
  res.status(400).json({ message: 'could not create user', error: error.message });
}
By logging the entire error object, you should be able to see the details of the error, including any validation errors, in your terminal or console. If there are no validation errors, the errors property might be undefined, and you can use error.message to get the error message.

Additionally, make sure that you have the correct MongoDB connection string (mongoUrl). If the connection to MongoDB fails, it could prevent data from being saved.

Regarding why you don't see the new data in your MongoDB Atlas dashboard, check the collection where your data is supposed to be stored. If your application is connected to the correct database, and there are no errors during the save operation, the data should be saved.

If the problem persists, consider checking the MongoDB connection and server logs for any additional information. You might also want to try using a MongoDB client to connect to your database and check the data directly. This can help you verify whether the issue is with your application code or the database connection.





but seems it still not showing the err msg that i set at 

} catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({message: 'could not create user', errors: error.message})


and i dont have any clue why this not works.
probably there is no err? then, why i cant see the data at cloud?

# i added console log. it was not showing. so it indicates save.user is not executed.

app.post('/users', async (req, res) => {
  // this is not working. why??
  console.log('Incoming Data:', req.body)
  try {
    const {name, email, password} = req.body
    const user = new User({name, email, password: bcrypt.hashSync(password)})

    // check before save
    console.log('user data before saving:', user)

    await user.save()

    // check after save to make sure the line is being reached or not
    console.log('user data after saving:', user)

    res.status(201).json({id: user._id, accessToken: user.accessToken})
    console.log('User saved successfully', user)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({message: 'could not create user', errors: error.message})
    // get err
    // open diegos codealong
  }
})


(after i submit 1,2,3 and what i got from terminal is nothing at all)

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

and this is the conclusion from the chatgpt


Based on the logs you provided, it seems that the logs for "user data before saving" and "user data after saving" are not present. The absence of these logs indicates that the specified console.log statements inside your app.post('/users', async (req, res) => {...} route are not being executed.




# and this is following suggestion from chatgpt


Here are a few suggestions to troubleshoot this issue:

Check Route Hit Log:
Add a simple log at the beginning of your app.post('/users', async (req, res) => {...} route to see if the route is being hit at all. For example:
javascript
Copy code
console.log('Route hit: /users');
If you don't see this log when making a request to create a user, it means that the route might not be set up correctly.
Check for Errors:
Look for any errors in the console or terminal where your server is running. Errors in your code could prevent certain parts of the code from being executed.
Review the Code:
Double-check the code inside the app.post('/users', async (req, res) => {...} route to ensure there are no syntax errors or logical issues that could prevent the specific console.log statements from running.
Network Tab in Browser:
When making a request to create a user from your frontend, open the browser's developer tools and check the Network tab for the request/response details. Look for any error responses or unexpected behavior.
If the issue persists, consider sharing the complete code for your server.js file, especially the app.post('/users', async (req, res) => {...} route, so I can provide more specific assistance.

# i mean, this seems familiar. 
Check Route Hit Log:
Add a simple log at the beginning of your app.post('/users', async (req, res) => {...} route to see if the route is being hit at all. For example:
javascript
Copy code
console.log('Route hit: /users');
If you don't see this log when making a request to create a user, it means that the route might not be set up correctly.

route problem. ive had this before. im not sure how i solved it. 
i remember route problem ive had is from mern repo.
i ignored it,
and it ended up with not letting me register? no. im not sure.
i could register the day after without explainable reason.
but i couldnt log in, so i gave up that repo.
will that problem from mern repo related to this repo?
am i having rooute problem?
i wish not so, but good to confirm.
but it is 15:59, im off.

i wish i can be more productive. 
when i started this bootcamp, i worked 5 am till 10 pm.
while i learn at this bootcamp, i got angry and my life become hell.
to not act bad, i needed to shrink my working time till
9-4,
and this had been like 10-3,
even 12-3, or whatever more like this.
i cant avoid myself to get bad feeling from this bootcamp.
so i needed to protect myself first, so decided to work little as i can,
and recover much as i can.
i never did any other things than this.
my whole life is still with this bootcamp. i couldnt escape, and getting
this bad result. 

i mean, i cant help myself from being unhappy.
but what i need is proceed,
which lacks for me to the most.

i rly need help with this.
which soounds never happens for me from this bootcamp
but let me shout out

i need help
hjälp!!!!
wish at least got listen my scream


i want to learn,
not to be unhappy or sad or angry,
to end this bootcamp 
with things that i needed to learn
which is not happening at all to me
i am desperate
and i shout out for help




okay. lets get back to user.save line not excuted,
or possibliy my route has problem, or not,
tomorrow


