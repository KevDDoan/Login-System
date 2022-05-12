# 4900-Project
This is a webpage project done for my 4900 Project<br>
Getting Started:<br>
-After pulling the code type "npm i" to install the necessary modules<br>
-Then in the terminal type "npm run serverStart" to get the program running<br>
-Create a .env folder and in it I have two variables <br>
-"session = secret" and "ATLAS_URL = ______" in the empty space put your MongoDB link<br>
--This is for security reasons <br>
Overview:<br>
This project contains the following features...<br>
-Login System with Passport User Auth <br>
-Login System also is linked to MongoDB with Encryption + Decryption feature<br>
-File Upload System<br>
-Data Fetch System<br>
Login System with Passport User Auth + Encryption and MongoDB:<br>
-MongoDB connection is functional<br>
-Login System is fully functional and will send and save User login information + encrypting password when registering to my User model which is connected to my MongoDB cluster<br>
-When logging in my passport model takes care of comparing user input to the data in my User model <br>
--If there is a match with the User then we decrypt the password to compare if theres a match<br>
--If there's a match we authenticate the User and sign them in and store their session <br>
--Otherwise we display a flash message indictating the error letting the User know if they inputted the incorrect email or password respectively<br>
-Additonal features include access to certain pages only if you're authenticated and vice versa not allowing you to access certain sites if you're logged in already<br>
-For example there is no reason to access a register or login page if you're already logged in and no reason to give just anyone access to their data if they aren't logged in<br>
File Upload:<br>
-Was able to upload files to the server and even save the fileName to my User model however ran into many struggles<br>
Issues I had with File Upload<br>
-My User model has a fileName section in it and my goal was to update that field whenever the logged in User uploads a file<br>
-My assumption is with my passport feature my server knows who is currently logged in or not however I'm not sure if that is the case or not<br>
-Regardless I believe if I the proper syntax for that I can then do something along the lines of User.findOne(currentUser, fileName) something along the lins of that<br>
-the findOne command is to find a certain collection based off of your search field and the second parameter is what you want to add to it<br>
-so depsite not knowing what could be done my thought process would've been this if I could somehow do<br>
--"const x = curretLoggedInUser;" "const y = req.file.fileName;" and then "User.findOneandUpdate(currentLoggedInUser or x, and req.file.fileName or y)<br>
Data Fetch:<br>
-Data fetching at a basic level gave me some issues however I was able to print out all the data in my User model onto "/data"<br>
-For good practice you'd have to be logged in to actually see the data<br>
-The goal of this was because it was requested of us to create a checklist for the students to keep up with their progress on their website<br>
Issues I had with Fetching Data:<br>
-However due to my inability to complete the file upload system it made fetching the data equally as difficult because fetching the entire collection itself is easy however printing the data of a specific User is what got me stuck<br>
-I tried implementing a search feature as well to override the issue i had with searching for data of the current logged in user because if I can search by email then I don't have to search by whoever is currently logged in <br>
-However I failed to be able to update my User model of the fileName for my User which meansa my search feature isn't functional<br>
-Addionally I ran into some bugs with my search feature because for some reason everytime I search something it renders the "/data" page even tho I don't see any where in my code that tells it to render it<br>
