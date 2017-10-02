# Youtoob: 
This application is based on a popular content streaming application called Youtube.    
    
You can find the completed application here: https://youtoob.gabetr.in

## An Introduction to Software Testing:

Software testing is performed to verify whether the results of a program matches the expected results 
and ensure that the software is bug free. It also helps to identify errors, gaps or missing 
requirements in contrary to the actual requirements. 

A good testing suite serves as a documentation for other developers to learn how to use the software. 

**Testing can be either done manually or using automated tools. In this sprint, we will focus on writing automated tests.**

## High level goal of this sprint:
- Gain exposure to writing software in a test driven development way (TDD).
- Gain exposure to different types of software testing.
- Gain familiarity with the tools necessary to perform software testing.

## Set up:
1. Clone the repo:    
`$ git clone https://github.com/ArchangelGabriel/Youtoob`    
`$ cd Youtoob && npm install`    

2. After cloning the repo, make sure that all of the tests passes.    
`$ npm test`
    
**As you can see, we have a number of tests that are passing successfully. 
It is essential that whenever we build additional features, we don’t break previously written tests.**
    
*We will not be covering webpack in this sprint but it is essential that it is set up to run our tools successfully. 
For now, our focus is on implementing and writing tests instead of setting up the testing environment which could 
complicate things and get in the way.*

## Documentation:

### Folder structure:
- `__tests__` folder includes all of the tests. You’ll be working with the files here extensively.
- `public` folder will be the place where the videos are uploaded to. It also includes static files that are publicly accessible to everyone.
- `client` folder includes all frontend files, they consisted mainly of react components and a few helper functions.
- `server` folder contains files that are important for saving and retrieving user information and videos. It includes our app models, routes and a few helper functions.

### Endpoints:
**Get a list of videos**    
* **GET** `/api/videos`    
* **Query:**
  * q:String - Keyword to search for    
  
**Get a single video by id**    
* **GET** `/api/videos/:id`    
    
**Get the mp4 video file by id**    
* **GET** `/api/videos/:id/watch`    
    
**Upload a video**    
* **POST** `/api/videos`    
* **Body:** `{ title, description, videoFile }`
     
**Register**    
* **POST** `/api/register`    
* **Body:** `{ username, password }`
     
**Login**    
* **POST** `/api/login`    
* **Body:** `{ username, password }`
     
## Bare Minimum Requirements:
    
### Unit Testing
- [ ] Open `__testing__/client/utils/queryStringToObject.js`, read the instructions and write some tests!
- [ ] Open `__testing__/server/models/video.test.js`, read the instructions and write some tests!
- [ ] Open `__testing__/utils/api.test.js`, read the instruction and write some tests!
    
### Integration Testing
- [ ] Open `__testing__/server/routes/users.test.js`, read the instruction and write some tests!
    
### React Component Testing
- [ ] Open `__testing__/client/components/ViewCount.test.js`, read the instruction and write some tests!
    
## Nightmare Mode:
- [ ] Implement video thumbnails like the one shown here: https://youtoob.gabetr.in/
