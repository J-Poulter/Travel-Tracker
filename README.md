# Travel Tracker

### Abstract

The Travel Tracker is an application that provides users with a tool to help them keep track of all of their past, current, and future trips.  It also allows them to book new trips by choosing from a list of different vacation destinations while providing them with an estimated cost of flights per a person, lodging per day, and an overall estimated cost of the trip once they submit a request.  They can see any added trips in their trip display and can filter those trips by pending request, approved requests, or any of the time based filters.

On the other side of things, if the user is a travel agent they can log in as an agent and their page displays will be something else.  The first page they will encounter is one that displays all of the currently outstanding trip requests and related information that describes each trip such as name, id, destination.  From that table, they can quickly and easily choose to approve or deny each request.  On the right side of the page is a display of all trips currently occurring.  They can click a button in the nav heading which brings them to a search page where they can search for a list of users by name, and they will get a list of all that persons trips.

#### Visual Demonstration of App in User

 Here we can see a visual demonstration of the application in use from the user's(traveler) perspective:

![Traveler Display](https://user-images.githubusercontent.com/51523262/75901856-11056580-5e37-11ea-8cef-a3ec3fb79245.gif)

 Here we can see a visual demonstration of the applicaiton in use from the agent's perspective:

 ![Agent Display](https://user-images.githubusercontent.com/51523262/75901917-28445300-5e37-11ea-9f1a-1f0a7011c39a.gif)


#### Install/Setup

In order to setup the application, you can go to the repository location at <https://github.com/J-Poulter/Travel-Tracker> in order to download the necessary files.  Click on the green button 'Clone or Download' and copy the address listed.  Next, open up your terminal and navigate to the directory where you would like the app located.  Type 'git clone' followed by a space and then pasting the address you copied previously.  Once this is completed, navigate into the directory and run npm install.  After it's complete you can run npm start and open up the website it lists which should be <http://localhost:8080/>.  You are now accessing the website! To login as a user the username is 'Traveler' followed by a number between 1-50 to represent the differents users and the password is 'traveler2020'.  To login as agent the username is 'agency' and the password is 'traveler2020'
