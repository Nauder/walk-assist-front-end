# Walk Assist Frontend

This repository contains the **WIP** code for the frontend of a project
aimed at helping blind individuals navigate specific locations on foot, developed as a university class project.
The frontend is developed with React utilizing Next.js for dynamic rendering and Tailwind for styling.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- Frontend for a RESTful API built with Flask for blind navigation assistance.
- Utilizes axios for ajax API requests.
- Authentication and authorization for standard and admin users through JWT.

## Getting Started

### Prerequisites

- Node v20.9.0^
- Prepared [project backend](https://github.com/Nauder/walk-assist)

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/Nauder/walk-assist-front-end
    cd walk-assist-front-end
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

The user needs to log in to access the system, which has the following functions:

- User CRUD (Admin only)

## License

This project is licensed under the [GPL-3.0 license](LICENSE).

