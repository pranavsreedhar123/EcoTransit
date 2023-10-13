# EcoTransit

- [EcoTransit](#ecotransit)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
      - [Backend](#backend-)
      - [Frontend](#frontend-)
  - [Release Notes](#release-notes)
    - [New Software Features](#new-software-features)
    - [Bug Fixes](#bug-fixes)
      - [Known Bugs and Defects](#known-bugs-and-defects-)

## Overview

EcoTransit is an application designed to help users find sustainable commuting
options and make eco-conscious transportation choices. It provides features for
route planning, carbon footprint estimation, and promoting greener
transportation modes.

EcoTransit is accessible at: [https://ecotransit-frontend.uc.r.appspot.com/](https://ecotransit-frontend.uc.r.appspot.com/)

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

3. Start the startup script for React. It will automatically choose port 3000
   and host the application on your local host. Make sure to run it on port
   3000 to make sure there's no CORS issue when the frontend calls the backend API

```bash
npm start
```

4. Access the web app through your browser at `http://localhost:3000`

## Release Notes

We are delighted to provide customers with the release of EcoTransit, version 1.0.

### New Software Features

1. **User Authentication**: Implemented sign up and log in using Firebase. Users
   will be notified if they try to sign up with an email that has already been
   used. Log in sessions will also persist on browser close.

2. **Dynamic Route Planning**: The new dynamic route planning feature allows users
   to explore alternate sustainable modes of transportation to their
   destination based on real-time traffic and carbon emissions data.

3. **Environmental Impact Estimation**: Our software now provides an estimation of
   the environmental impact for each chosen transportation mode, helping users
   make eco-conscious commuting decisions.

### Bug Fixes

1. Performance Improvements: Resolved slow loading times during route planning.

2. User Interface Enhancement: Fixed minor interface glitches for better usability.

3. Data Accuracy: Improved the accuracy of carbon footprint estimations.

#### Known Bugs and Defects:

- A tiny bug that we have is that though we ask the users to input locations
  within the U.S we don’t really check for that. We do, however, account for the
  possibility that there are no options for certain or all modes of
  transportation without having the app crash.

- A defect was that we did not get time to work on adding the autofill part for
  the locations.

- Another defect was that we didn’t account for emissions caused by other
  factors apart from driving, such as charging electric vehicles or the
  manufacturing process to build the cars.

We are committed to continuously improving our software, and we look forward to
implementing the missing features in future releases. If you encounter any
issues or have further questions, please do not hesitate to contact our support
team at psreedhar6@gatech.edu, wmerickel3@gatech.edu, meghnajain@gatech.edu,
daniel.you@gatech.edu, mjung76@gatech.edu, mchanshetty3@gatech.edu.

Thank you for choosing EcoTransit, and we hope our software contributes to your
sustainable commuting goals.
