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