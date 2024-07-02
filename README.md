# Home Swap App (Cohort 46 Group B Final Project)

## Table of Contents
- [INTRODUCTION](#introduction)
- [LIVE DEMO](#live-demo)
- [SCREENSHOTS](#screenshots)
- [KEY FEATURES AND FUNCTIONALITIES](#key-features-and-functionalities)
- [TECHNOLOGIES USED](#technologies-used)
- [USAGE](#usage)
- [FOLDER STRUCTURE](#folder-structure)
- [INSTALLATION](#installation)
- [CONTRIBUTORS](#contributors)
- [ACKNOWLEDGEMENTS](#acknoledgements)

## INTRODUCTION
Home Swap is a  full-stack MERN application built and  designed to facilitate house swaps between users. It allows users to list their properties, explore available swap opportunities, and  arrange  or apply for swaps to enjoy living in different locations temporarily. To participate in a swap, users must first have a property listing uploaded. This requirement ensures that all members of the platform are both potential swappers and hosts, which enables a balanced and reciprocal swapping environment.

## LIVE DEMO
[Click here for Demo Version](https://c46-group-b-4e426f6bf421.herokuapp.com/)

## SCREENSHOTS
![Signup](client/src/assets/homeswap-signup.png)
![Home](client/src/assets/homeswap-home.png)

## KEY FEATURES AND FUNCTIONALITIES
 Key features and functionalities of Home Swap include:

- **Property Listings:** Users can create detailed listings for their properties, including descriptions, images, and amenities, location, number of bedrooms and available dates. 
- **Swap Opportunities:** Users can explore a wide range of available properties that match their preferences and criteria, making it easy to find the perfect swap.
- **Search and View Properties:** Users can  search for and find properties that fit their swap criteria, using the five search criterias provided in the app. Search by City, Country, Property Type, Number of Bedrooms and Amenities.
- **Swap Requests:** In the app users can initiate swap requests with other property owners. Once a request is sent, users can leave messages, accept or reject swap requests.
- **User Authentication:** Ensures that all users are verified and authenticated.
- **Profile Management:** Users can create and manage their profiles, including upolading their properties.



## TECHNOLOGIES USED
- **Frontend:** React, Axios, Material UI, React Toastify, Font Awesome, Sweet Alert.
- **Backend:** Node.js with Express.js framework, Concurrently, Cors, Cloudinary.
- **Database:** MongoDB with Mongoose for object modeling.
- **Authentication:** Secure handling with JWT (JSON Web Tokens), Bcrypt.
- **Styling:** Styled using CSS and Material UI.
- **Build Tool:** Bundled with Webpack.

## USAGE
Signup and Log In: Securely register or log in to access your account.
List Your Property: Add your property by filling in necessary details and uploading images.
Browse Properties: Search through the listings to find potential swaps.
Initiate Swap Requests: Send a request to swap with other users.
Confirm Swaps: Once you find what you like, confirm swaps or reject swaps.

## FOLDER STRUCTURE
Detailed folder structure of the project:
```
client
├── public
│   └── index.html
└── src
    ├── __tests__
    ├── __testUtils__
    ├── assets
    ├── components
    │   ├── __tests__
    │   ├── AboutUsContent
    │   ├── CreateSwapRequest
    │   ├── Footer
    │   ├── HomeBackground
    │   ├── Login
    │   ├── MyPropertyCard
    │   ├── Nav
    │   ├── Profile
    │   ├── ProfilePropertyList
     │   ├── RequestList
    │   ├── PropertyCard
    │   ├── PropertyList
    │   ├── ProtectedRoute
    │   ├── Search
    │   ├── SignUp
    │   ├── UploadProperty
    │   ├── ViewProperty
    ├── context
    ├── hooks
    ├── pages
    ├── util
    ├── AppWrapper.jsx
    ├── index.jsx
    ├── .babelrc
    ├── .env
    ├── .eslintrc.js
    ├── jest.config.js
    ├── package-lock.json
    ├── package.json
    ├── setupTests.js
    ├── webpack.config.js
cypress
├── fixtures
├── plugins
└── support
server
└── src
    ├── __tests__
    ├── __testUtils__
    ├── controllers
    ├── db
    ├── models
    ├── routes
    ├── util
    ├── app.js
    ├── index.js
    ├── testRouter.js
    ├── .env
    ├── .eslintrc.cjs
    ├── babel.config.cjs
    ├── jest.config.js
    ├── package-lock.json
    ├── package.json
    ├── .gitignore
    ├── .prettierrc.json 
    ```
    


```
## Installation
To run this project locally:

### 1. Clone the repository:
```bash
git clone https://github.com/HackYourFuture/cohort46-project-group-B.git
```

### 2. Install client dependencies
```bash
cd client
npm install
```
### 3. Install server dependencies
```bash
cd ../server
npm install
```

### 4. Set environment variables
```bash
PORT=PORT
MONGODB_URI=mongodb-uri
JWT_SECRET=jwt-secret
```

### 5. Run the app
```bash
# Server
cd server
npm run dev
# Client
cd ../client
npm run dev
```

## CONTRIBUTORS/ AUTHORS
- Front-End : [@Fressia](https://github.com/barrios2) | [@Ali](https://github.com/AliOthman0934) | [@Marley](https://github.com/Marley-Semende)

- Back-End : [@Mariam](https://github.com/mariamisaeva) 

## ACKNOWLEDGEMENTS
We would like to extend our heartfelt gratitude to the Hack Your Future team and mentors for their support, an extensive curriculum, resources and mentorship throughout the program and to Frank and Muhamed who have  been mentoring us  throughout the implementation of the project. 
Thank you all for your support and contributions. Home Swap would not have been possible without your support 🙌🏾.
