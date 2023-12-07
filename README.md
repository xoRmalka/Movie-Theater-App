# Movie Theater App

Welcome to the Movie Theater App repository! This application is an end-to-end solution for managing a single theater with 10 rows and 10 seats per row. It includes features for users to explore scheduled movies, place orders for available seats, and an admin interface for managing movies and schedules.

## Table of Contents
1. [System Overview](#system-overview)
    - [Home Page](#home-page)
    - [Movie Order Page](#movie-order-page)
    - [Admin Page](#admin-page)
2. [Technical Stack](#technical-stack)
3. [Getting Started](#getting-started)
4. [Installation](#installation)

## System Overview

### Home Page

The Home Page displays a list of scheduled movies with their titles and dates. Users can order the movies by date and filter them by a specified date range.

### Movie Order Page

The Movie Order Page provides detailed information about a selected movie, including its title, description, duration, and date. Users can view a seat map indicating seat availability, choose and order a single seat at a time. The order system is designed to handle multiple orders simultaneously, ensuring that a specific seat cannot be ordered for two different customers.

### Admin Page

The Admin Page is designed for administrators to manage the movie schedule. It includes options to create, edit, or delete movies. Administrators can schedule or cancel movies, and movies can be scheduled at multiple times. The system prevents scheduling two movies at the same time to avoid conflicts.

## Technical Stack

- Front-end: React
- API: Express
- Database: MongoDB

## Getting Started

To get started with the Movie Theater App, follow the installation instructions below.

## Installation

1. Clone the repository:

    ```bash
    git clone git clone https://github.com/xoRmalka/Movie-Theater-App.git
    ```

2. Navigate to the project directory:

    ```bash
    cd movie-theater-app
    ```

3. Install dependencies for both the front-end and back-end:

    ```bash
    # Install front-end dependencies
    cd .\Client\movie-theater-app\
    npm install

    # Install back-end dependencies
    cd .\Server\
    npm install
    ```

4. Set up the MongoDB database:
    - Create a MongoDB database and update the connection string in the server configuration.

## Usage

1. Start the server:

    ```bash
    # From the server directory
    node index.js
    ```

2. Start the front-end:

    ```bash
    # From the client directory
    npm run dev
    ```
