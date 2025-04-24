Prerequisites
Before you start, ensure you have the following installed:
	Node.js - Download and install it from nodejs.org (https://nodejs.org/en).
	Visual Studio (or VS Code) - Required for running the terminal and editing code.

Step-by-Step Guide
1. Install Node.js
	Download and install the latest version of Node.js (v22.14.0) from nodejs.org.
2. Open the Terminal in Visual Studio
	Open Visual Studio.
	Go to View → Terminal (ensure you're using Command Prompt, not PowerShell).
3. Verify Node.js and npm Installation
	To check if Node.js and npm are installed correctly, run the following commands:
node -v
npm -v
	You should see version numbers for both Node.js and npm.
4. Create a New React App
	Run the following commands in the terminal:
npx create-react-app my-app
cd my-app
	This will create a default React project in a folder called my-app.
5. Add Files from Git
	Locate the files you downloaded from Git.
	Copy and replace the necessary files into the appropriate folders inside my-app.
	Usually, most project files go into the src folder.
6. Start the Local Development Server
	To run the application, navigate to your project folder and execute:
npm start
	This will start the React development server, and your application should open in a browser at:
http://localhost:3000

Additionally you need to download these (copy-paste to Command Prompt):
npm install react-bootstrap bootstrap
npm install react react-dom
