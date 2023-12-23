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