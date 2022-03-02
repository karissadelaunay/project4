## Setup 

1. Clone the repo
2. Rename the folder to your Project, you can use the `mv` command like `mv mern-boilerplate yourprojectname`
3. Delete the `.git` file, when you are in the root of the file, you can press `ls` and you should see a `.git` file, then go ahead and run `rm -rf .git`


#### Setup your git repo

1. go to github and create your github and create a repo (Without a readme or liscense you can add that later!)
2.  Then follow the directions on github that says ```…or create a new repository on the command line```

it should look like this

```
git init
git add .
git commit -m "first commit"
git remote add origin git@git.generalassemb.ly:SEI-CC/test.git // this will be whatever your address will be
git push -u origin master
```

#### Setup the App

```npm install```

*DOTENV*

`touch .env`

add your variables

```
DATABASE_URL=mongodb://localhost:27017/testagramV2
BUCKET_NAME=catcollectorone
SECRET=mysecretforjwt
```

The app is configured, to use those respective key names for the database, jwt secret and aws bucket, of course you'll have your own values

## Aryas Apothecary

1. This App is all about Juice.  Arays Apothecary is a local venice juice company.  On this app you can post pictures of yourself or your animals or anything you want with a juice from Aryas Apothecary with a chance to be featured as the photo of the day!  You can also check out the juice products available from the company with locations to buy from.  You can check out your profile page and like others posts.  You can even favorite the juice products available from the company!


#### Technologies Used
1. JavaScript
2. MongoDB
3. Mongoose
4. Express
5. Robo3T
6. CSS
7. React.js
8. JSX
9. HTML
11. AWS S3
12. Semantic-UI styling

## Link to Launched App
https://aryasapothecary.herokuapp.com/login

#### Trello Board
https://trello.com/b/5Gmq15zf/aryas-apothecary-juice-app

#### WireFrames
<img width="802" alt="Screen Shot 2022-02-28 at 3 06 18 PM" src="https://user-images.githubusercontent.com/94722723/156073267-a6efdc53-1d05-4932-a4ba-42f4ff2ab486.png">

#### Screen Shots of Application
<img width="1381" alt="Screen Shot 2022-02-28 at 3 06 51 PM" src="https://user-images.githubusercontent.com/94722723/156073318-1bbdc736-58a6-44c2-885f-01e8f7733fdd.png">
<img width="1422" alt="Screen Shot 2022-02-28 at 3 07 51 PM" src="https://user-images.githubusercontent.com/94722723/156073441-edacd06e-b318-4923-91d5-dee4c94675f8.png">
<img width="1413" alt="Screen Shot 2022-02-28 at 3 08 20 PM" src="https://user-images.githubusercontent.com/94722723/156073489-564435a6-7b31-4801-b1ea-3b4d922d4876.png">
<img width="1413" alt="Screen Shot 2022-02-28 at 3 08 51 PM" src="https://user-images.githubusercontent.com/94722723/156073775-d909e93e-f966-449e-b800-63e5e9fc3bc2.png">
<img width="1423" alt="Screen Shot 2022-02-28 at 3 09 20 PM" src="https://user-images.githubusercontent.com/94722723/156073926-22a5c56b-1cca-4137-8eae-37eb884fd743.png">

#### Ice Box Features
1.  I want to be able to see my favorites products on my profile page
2.  I want to be able to change and edit my bio and profile photo
3.  I want to get notified if I am the featured photo of the day
4.  I want to be notified when new products are available
