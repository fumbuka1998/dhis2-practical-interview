<!-- in this readme.md file am going to explain part(a) of deliverables -->

<!-- DESIGN DECISION -->

i. Component Structure:
The application is structured as a React functional component (Weather) to manage the state, UI, and behavior.

ii. Styling:
The app uses CSS for styling, providing a clean and simple user interface.
The design is responsive, adapting to different screen sizes for a better user experience.

iii. User Interface:
The UI includes an input field for the user to enter a location, a button to trigger the weather request, and a chart to display temperature and rainfall data.

iv. Chart.js for Data Visualization:
The Chart.js library is used for data visualization, providing an interactive and visually appealing way to display weather information.
Two datasets (temperature and rainfall) are displayed on the chart for a comprehensive overview.


<!-- HOW TO HANDLE API REQUEST AND RESPONSE -->
i. API Integration:
The OpenWeatherMap API is used to fetch weather data based on the user's location input.

ii. Handling API Requests:
API requests are triggered when the user clicks the "Get Weather" button.
Asynchronous requests are handled using axios to avoid blocking the main thread.

iii. Error Handling:
Errors in API requests are caught and logged to the console.
If the location entered by the user is not found, an error message is displayed on the UI to guide the user to enter another location.

The chart is updated in real-time as the user fetches weather data for different locations.


iv. Error Feedback:
Clear error messages are displayed to inform the user if there's an issue with the location input or if the API request fails.



