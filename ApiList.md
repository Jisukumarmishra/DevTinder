# DevTinder APIs

authRouter
Post /SignUp
Post /LogIn
Post /LogOutgit


profileRouter
Get /Profile/View
Patch/Profile/edit
Patch /Profile/Password


ConnecctionsRequestRouter
<!-- Post /request/send/interested/:userId
Post /request/send/ignored/:userId -->

Post /request/send/:status/:userId

<!-- Post /request/review/accepte
d/:requestId
Post /request/review/rejected/:requestId -->

Post /request/review/:status/:requestId

userRouter
Get /user/Connections
Get /user/requests/received
Get /user/fedd --> Get You The Profile Of Other User On Platform 




// Api For The Sending And Accepting Connections Request

Status:= Ignored, Interested, Accepted , Rejected

For Sending:=
Post /request/send/interested/:userId
Post /request/send/ignored/:userId

For Receving:=
Post /request/review/accepted/:requestId
Post /request/review/rejected/:requestId