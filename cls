[33mcommit 61a5c3ed63e9cb252c7242040f21959d22187504[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: mishra <jisumishra4@gmail.com>
Date:   Mon May 25 15:07:44 2026 +0530

    Making SignUp Page Is Dynamic to receive data From The end User

[1mdiff --git a/notes.txt b/notes.txt[m
[1mindex 4a148c7..ce079d6 100644[m
[1m--- a/notes.txt[m
[1m+++ b/notes.txt[m
[36m@@ -10,11 +10,21 @@[m [mif we remove ~(we replace with tilda also in the palce of carate but that have d[m
 [m
 package.lock.json = tell the exact version of the project locking on or uses [m
 [m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
 ## Monggodb Database ##[m
 [m
 To Connect The Nodejs application to the the mongodb database we use thw npm library called mongoose[m
 npm i mongoose[m
 [m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
 Route Handler = decides which function runs[m
 app.get('/user', ...)[m
 [m
[36m@@ -35,6 +45,13 @@[m [mmiddleware is needed one of the reason is to autenticate the user cofidentatial[m
 “Route handler defines the endpoint and HTTP method, while request handler is the function executed when that route is matched.”[m
 [m
 [m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
 ## Connection To The DataBAse:=[m
 [m
 Right Process Is connect To The DataBase Then Listening To The Server[m
[1mdiff --git a/src/app.js b/src/app.js[m
[1mindex 4a5ef23..68c95f5 100644[m
[1m--- a/src/app.js[m
[1m+++ b/src/app.js[m
[36m@@ -7,29 +7,19 @@[m [mconst app = express() // instaces of express[m
 app.use(express.json());[m
 [m
 app.post("/signup", async (req, res) => {[m
[31m-  console.log(req.body); [m
 // creating the new instaces of the user model[m
[31m-// const user =  new User({[m
[31m-//   firstName : "Jisu",[m
[31m-//   lastName : "Mishra",[m
[31m-//   emailId : "jisuk138@gmail.com",[m
[31m-//   password : "jisuuu@123"[m
[31m-// });[m
[31m-[m
[31m-//   const user = new User ({[m
[31m-//     firstName : "Harsh",[m
[31m-//     lastName  : "Mishra",[m
[31m-//     emailId : "harsh@gmail.com",[m
[31m-//     passWord : "Harsh@123"[m
[31m-//   })[m
[31m-[m
[31m-// try {[m
[31m-//  await user.save();[m
[31m-//  res.send("user addeded succesfully ");[m
[31m-// }[m
[31m-// catch (err) {[m
[31m-//   res.status(400).send("Error saving the user :"+ err.message);[m
[31m-// }[m
[32m+[m[32mconst user =  new User(req.body);[m
[32m+[m
[32m+[m[32mconsole.log(req.body);[m
[32m+[m
[32m+[m[32mtry {[m
[32m+[m[32m await user.save();[m
[32m+[m[32m res.send("user addeded succesfully ");[m
[32m+[m[32m}[m
[32m+[m[32mcatch (err) {[m
[32m+[m[32m  res.status(400).send("Error saving the user :"+ err.message);[m
[32m+[m[32m}[m
[32m+[m
 });[m
 [m
 [m
