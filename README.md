# Full Stack News App

## Overview

This project is a full-stack news web application that fetches and filters articles using **NewsAPI**. It features user authentication (sign-up/sign-in), bookmarking functionality, and efficient state management using React Context. The application is designed for an optimal user experience with a clean and minimal code structure.

## News Source

The source used for fetching news articles is **NewsAPI**.  
Sometimes it doesn’t deliver the exact number of articles as defined in the query, but other than that, it works fine.

## Authentication Design

The overall design for the **sign-in/sign-up** pages is generic and written inside the same file. This is done to minimize code redundancy while achieving a similar yet distinctive view between the two.

Several constraints have been added and structured error logging is provided on display for improved debugging and user guidance.

## Bookmarking System

The `bookmarks` field inside the user model is defined as an **array of objects**. This approach was found to be the most practical and efficient way of storing and fetching bookmarks.

- Upon login, the initial user data (including bookmarks) is stored inside **Context**, allowing for easier access to user data throughout the site.
- For every API call that adds or removes a bookmark, the backend responds with the updated user object, including the modified `bookmarks` field.
- This updated object is stored again in the frontend Context.

By doing this, the number of API calls needed to display bookmarks is significantly reduced, leading to **less traffic and faster, better user experience**.

## Instructions

### Prerequisites
- Install VSCode (or a similar IDE)
- Install Git, Node.js, and npm
- Update your system PATH if needed to access these tools from the terminal

### Setup Steps

1. Create a new folder and open it inside VSCode.
2. Clone this repository using the `git clone` command.
3. After cloning, initialize Git inside the `/full-stack-news-app` folder:
     git init
     git add .
4. Open two terminals in VSCode:
     In the first terminal, navigate to the backend:
        cd /full-stack-news-app/backend
     In the second terminal, navigate to the frontend:
        cd /full-stack-news-app/frontend
5. Add a .env file inside the /backend folder before proceeding.
6. In both terminals, run the following command to install dependencies:
     npm install
8. Once installation is complete, start both servers using:
     npm start
10. Open your browser and go to:  http://localhost:3000
12. Registration and Activation:
      After registering, you will receive a verification link via email.
      Click the link to activate your account.
13. Go to the /sign-in page, log in, and start using the site.
**Note:** The Logout button is located beneath the banner message on desktop screen display.
