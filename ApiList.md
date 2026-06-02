# DevTinder APIs

Post /SignUp
Post /LogIn
Post /LogOut

Get /Profile/View
Patch/Profile/edit
Patch /Profile/Password

Post /request/send/interested/:userId
Post /request/send/ignored/:userId

Post /request/review/accepted/:requestId
Post /request/review/rejected/:requestId

Get /Connections
Get /requests/received
Get /fedd --> Get You The Profile Of Other User On Platform 





// Api For The Sending And Accepting Connections Request

Status:= Ignored, Interested, Accepted , Rejected

For Sending:=
Post /request/send/interested/:userId
Post /request/send/ignored/:userId

For Receving:=
Post /request/review/accepted/:requestId
Post /request/review/rejected/:requestId