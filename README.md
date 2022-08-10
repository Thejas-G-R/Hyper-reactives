Project - AutoMate

Objective 

 - Our end to end application has been designed to make the user experience pleasant for searching the right vehicle service provider for user’s car.
 - A user can request to register his/her car with AutoMate which sends the request to Admin to verify all the car details. 
 - Once admin has verified and approved the car registration, the user can now search and choose from all the service providers.
 - All the service providers are managed by the admin so the user does not have to worry about the authenticity of these service providers.
 - Users also get the feature of saving the receipts of the service done on their cars and will also be able to view the service history of the car in a timeline format.

Steps to Install and Run the Project

	-Clone this project to your local 

	-run the following command in terminal 
		
		mongod --dbpath "/path to your data file"

	-open a new terminal and run below command for DB dump
		
		mongorestore --db hyperReactives-Users "Path-to-your-clone-folder\Hyper-reactives\Hyper-reactives-server\Mongo Database dump\hyperReactives-Users" 

	-open a new terminal and run the below commands 
		
		cd .\Hyper-reactives\Hyper-reactives-server\

		npm i

		npm start

	-Open a new terminal and run the below commands
		
		cd .\Hyper-reactives\Hyper-reactives-app\

		npm i

		npm start 


Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

You are ready to use the application enjoy!!
