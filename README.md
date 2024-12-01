# Project description

## Barchart

- You have to click on barchart to show the linechart and values

## Live on

-[Live](https://dashboard-client-xi.vercel.app/)

-[Backend](https://github.com/Priyavrat001/user-dashboard-server)


# Interactive Data Visualization Dashboard

This project is an interactive data visualization dashboard for a product analytics platform, providing real-time data on sales and user engagement. It features interactive charts, advanced filtering, cookie management, user authentication, and the ability to share URL-based views with specific filters and date ranges.

## Features

### Interactive Data Visualization
- **Bar Chart**: Displays time spent on different features (A, B, C, etc.) for a selected date range.
- **Line Chart**: Shows time trends for a category when a feature is clicked on the bar chart. Supports pan, zoom-in, and zoom-out on the time range.

### Advanced Filtering
- **Age Filter**: 15-25, >25.
- **Gender Filter**: Male, Female.
- **Date Range Selector**: Allows users to choose a specific date range, updating the charts in real time based on selected filters.

### API Integration & Data Pipeline
- Data pipeline created to handle dataset transformation and API integration. Backend API fetches real-time data for sales and engagement based on filters and date ranges.
- The data is sourced from a dataset provided and handled via a custom API created in Express.

### Cookie Management
- User preferences for filters and date range are stored in cookies. On revisiting the dashboard, users will find their last-applied filters preloaded.
- Users can reset/clear their filter preferences.

### URL Sharing
- Users can generate a sharable URL with applied filters and date range. This URL is confidential, and the recipient must log in to view the data.

### User Authentication
- Basic user login, sign-up, and logout functionality is implemented. Users must authenticate to view and share dashboard charts.

### Responsive Design
- The frontend is fully responsive, designed to work across various devices such as desktops, tablets, and mobile phones.

## Libraries and Tools Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool.
- **chart.js**: For creating interactive charts (bar chart, line chart).
- **react-chartjs-2**: React wrapper for Chart.js.
- **react-date-range**: For selecting custom date ranges.
- **react-datepicker**: Date picker component.
- **js-cookie**: Manages cookies for storing user preferences.
- **react-router-dom**: For routing and URL handling.
- **moment.js**: For handling date and time formatting.
- **react-icons**: For icons used in the UI.
- **react-hot-toast**: For user notifications.

### Backend (API Integration)
- The backend is built using Express.js to provide an API layer and process data requests from the front end.

## Installation

- npm install
- npm run dev

