# EcoTransit

## Overview

EcoTransit is an application designed to help users find sustainable commuting options and make eco-conscious transportation choices. It provides features for route planning, carbon footprint estimation, and promoting greener transportation modes.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Java Development Kit (JDK)
- Spring Boot with Maven
- MySQL or another compatible database
- Google Cloud Platform
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mjain02/sustainable-commute-finder.git
```

2. Navigate to the project directory:

```bash
cd sustainable-commute-finder
```

3. See the `Usage` section

### Usage

#### Backend:

1. Go to the sustainable_commute_finder folder

```bash
cd sustatinable_commute_finder
```

2. Run the spring boot

```bash
mvn spring-boot:run
```

#### Frontend:

1. Go to front end folder

```bash
cd frontend
```

2. Install the necessary dependencies

```bash
npm install
```

3. Start the startup script for React. It will automatically choose port 3000 and host the application on your local host. Make sure to run it on port 3000 to make sure there's no CORS issue when the frontend calls the backend API

```bash
npm start
```

4. Access the web app through your browser at http://localhost:3000.

### Features

- User registration and authentication
- Route planning for driving, walking, biking, and public transit
- Interactive maps for route selection
- Carbon footprint estimation for different transportation modes
- Estimate the impact in choosing an alternative mode of transport
