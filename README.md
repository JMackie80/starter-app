# Starter APP
Welcome to the starter app.

## Server Design 
- JWT bearer tokens are used to authenticate users on consecutive requests.  
- To get something up and running quickly there are no roles. Authorization only checks if the user is an admin or not. Only an admin can manage users. This would need to be expanded in a real application. Authorization would be needed for each case to ensure only the correct users can access the case.  
- A REST API is used.  
- Each domain concept is split into routers, controllers, repositories, and types in order to maintain single responsibility and promote re-use.
- Prisma is used to access the database.
- SQLite is used for the database.

## Server Directory Structure
- bin - startup of the server  
- routes - express routers  
- middleware - custom express middleware  
- controllers - controllers to process logic  
- repositories - repositories to access data in a common way  
- data - javascript objects to simiulate database data  
- types - custom types  

## Server Get Started
- Run 'npm install' to install packages  
- Run 'npm start' to start the server  

## Client Design 
- Basic React application
- http calls are abstracted to axiosUtils
- authentication Context / Provider handle authentication state

## Client Get Started
- Run 'npm run migrate' to run database migrations
- Run 'npm run generate' to generate the prisma client
- Run 'npm run seed' to seed the database
- Run 'npm start' to start the client 

## More to do
- More tests should be written for the server
- Tests should be implemented for the client
- login lockout should be implemented on failed login attempts
- There should be a rate limit for server requests.
- CSRF prevention should be implemented.
- Validation should be implemented for the client.
- Styling could be improved on the client.
- Files should be separated into folders for the client.
- Roles should be implemented.

