# NASA APOD

![nasa apod](https://github.com/user-attachments/assets/2a9470c1-c9c2-483b-9a52-5731bd46ea15)


This is a web app that displays NASA's Astronomy Picture of the Day (APOD), fetched directly from NASA's public API. Users can view daily space-themed photos along with detailed descriptions, and even save the favorite images for later in the Favourites tab.

## Features
- **User Authentication** – User can register and log in securely.
- **Favourite tab** - Save and view your favorite APOD entries.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/midhunk0/nasa-apod.git
    ```
2. Navigate to the project directory:
    ```sh
    cd nasa-apod
    ```
3. Install client dependencies:
    ```sh
    cd client
    npm install
    ```
4. Install server dependencies:
    ```sh
    cd ../server
    npm install
    ```

## Usage

1. Start the backend server:
    ```sh
    cd server
    npm start
    ```
2. Start the frontend development server:
    ```sh
    cd ../client
    npm start
    ```
3. Open your browser and navigate to `http://localhost:3000`.

## Dependencies

- **PostgreSQL** – Relational database for storing user data and favorites
- **Express.js** – Backend framework
- **React** – Frontend library
- **Node.js** – JavaScript runtime
- **NASA APOD API** – For fetching astronomy images and descriptions

## License

This project is open-source and licensed under the **MIT License**.
