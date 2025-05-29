# Starter APP
Welcome to the starter app.

## Design 
- JWT bearer tokens are used to authenticate users on consecutive requests.  
- To get something up and running quickly there are no roles. Authorization only checks if the user is an admin or not. Only an admin can manage users. This would need to be expanded in a real application. Authorization would be needed for each case to ensure only the correct users can access the case.  
- A REST API is used.  
- Each domain concept is split into routers, controllers, repositories, and types in order to maintain single responsibility and promote re-use.  

## Directory Structure
- bin - startup of the server  
- routes - express routers  
- middleware - custom express middleware  
- controllers - controllers to process logic  
- repositories - repositories to access data in a common way  
- data - javascript objects to simiulate database data  
- types - custom types  


## Get Started
- Run 'npm install' to install packages  
- Run 'npm start' to start the server  

## Authentication


