# Pix - A Food Pickup Application
Pix is an online ordering web application built for a client, Grandma's Creamery. Customers can browse through a delicious menu of icy desserts and place an order for pickup through twilio.

## Tech Stack and Tools
| Front-End  | Back-End | Database  | Deployment |
| ------------- | ------------- | ---------- | --------- |
| jQuery | Express  | postgreSQL  | Heroku|
| Bootstrap | EJS | | |
| SASS | | | |

## Live Link
https://vast-shore-37866.herokuapp.com/menu

## Demo
THe menu page is responsive for mobile and tablets.
![menu page](https://github.com/aalibarre/pix/blob/master/docs/menu.gif?raw=true)
A twilio text is sent to customer and restaurant when order is successfully placed. A timer shows when order is ready.
![checkout page](https://github.com/aalibarre/pix/blob/master/docs/checkout.gif?raw=true)

## Packages
```json
"dependencies": {
    "body-parser": "^1.19.0",
    "chalk": "^2.4.2",
    "cookie-parser": "^1.4.6",
    "cookie-session": "^1.4.0",
    "dotenv": "^2.0.0",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "morgan": "^1.9.1",
    "pg": "^8.5.0",
    "pg-native": "^3.0.0",
    "sass": "^1.35.1",
    "twilio": "^3.71.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.10"
  }
```
## Local Machine Setup Instructions (Ubuntu)
1. Install dependencies: `npm install`
2. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
3. Visit `http://localhost:8080/`
