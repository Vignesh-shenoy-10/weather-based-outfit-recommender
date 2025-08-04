# weather-based-outfit-recommender
This Repository is a part of UI challenge
Tech Stack:
1. ReactJS - Frontend 
2. Styling - TailwindCSS for utility classes + Material UI for ready-made, responsive components
3. State Management - Basic React UseState, useEffect, ContextAPI -> Only for theme switching
   
# How did i setup my Development Environment?
1. I used the npx create-react-app weather-dashboard - Although Create-react-app is deprecated, VS-Code did an auto install for me. 
2. Installed dependencies - npm install @mui/material @emotion/react @emotion/styled tailwindcss -> Tailwind css did give me an error, after looking it up I did an npm install -D @tailwindcss/cli
3. I had to configure the global css file that is index.css in order to incorporate tailwind css.
   

# How to run the project on localhost?
1. After forking from the repository, Please do an npm install - This should install all the dependencies that are required to run the project. 
2. npm start command in order to load up the application on your localhost:3000.

# OpenWeatherMap API 
1. I created an account and used an API key that i got from my profile on OpenweatherMap.
2. I had to wait for sometime in order to get my APU key Activated.

# Design details
1. I have used a simple search bar to search for cities, followed by a search button next to it.
2. I have used MUI cards to display the weather details and the recommendation data. 

# Core functionality/Logic
Following are the core functionalities involved
1. A function to Fetch Weather API details - fetchWeather()
2. A function to Show icons based on weathers fetched - getAnimatedWeatherIcon() - Used a library react animated weather icons.
3. A function to Show recommended outfits based on weather data - getOutfitRecommendation() 

# Error handling
1. I have created WeatherInputErrorPopup component which is a basic MUI card layout to display error if input is empty.
2. I have created WeatherErrorPopup component which is a basic MUI Card Layout to display error if entered city does not exist. 


# Architecting 
A simple architecture is followed to keep the app modular. For now, I have seperated only the error component from the main dashboard component. 

# Improvements to Application architecture
1. Seperation of concerns between the core logic and the reusable components can be achieved by making the core logic functions independent and away from the weatherDashboard component.
2. I could seperate the cards as a component and make it reusable, Due to the smaller nature of this application i have not done it nor did time allow me for now.



