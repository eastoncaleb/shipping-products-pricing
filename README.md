# React Price Modal Application

This React application features a modal interface for editing and saving pricing information, structured by regions and service levels. It uses a local JSON server to simulate backend functionality.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- JSON Server

1. **Clone the Repository**

```
git clone [repository URL]
cd [local repository]
```

2. **Install Dependencies**<br>
Navigate to the project directory and install the required dependencies:

```
npm install
```

3. **Setting Up JSON Server**<br>
- Install JSON Server globally:

```
npm install -g json-server
```

- Start JSON Server:
```
json-server --watch db.json --port 3001
```
**Note:** `db.json` contains the initial data for regions, service levels, and prices.

4. **Start the React Application**<br>
In the project directory, you can run:
```
npm start
```
This runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

### Using the Application
- **Opening the Price Modal**: On the main page, there is a button to open the price modal.
- **Editing Prices**: Inside the modal, you can edit prices individually or use the inputs in the header row to update all prices in a specific region.
- **Saving Changes**: After making your edits, click the "Save Pricing" button to update the prices. This will save the changes to the JSON server.
- **Closing the Modal**: The modal can be closed either by saving the changes or by clicking outside the modal area.
