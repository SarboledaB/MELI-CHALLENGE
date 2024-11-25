# Mercado Libre Challenge

## Author
Sebastian Arboleda Botero

sarboledabotero@gmail.com

linkedin.com/in/sarboledab/


## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) (Latest stable version)
- Git (for cloning the repository)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/SarboledaB/meli-challenge.git
cd meli-challenge
```

### Set Up the Backend
   Navigate to the backend directory:

```bash
cd meli-challenge-back
````

Install dependencies:

```bash
yarn install
````
Create a .env file in the backend directory and configure the required environment variables. Example:

```env
PORT=3000
MELI_API_URL=
CLIENT_URL=
```

Start the backend server:

```bash
yarn start
```
The server should be running at http://localhost:3000 (or the port you configured).


### Set Up the Frontend
Navigate to the frontend directory:

```bash
cd meli-challenge-front
```

Install dependencies:

```bash
yarn install
```

Create a .env file in the frontend directory and configure the required environment variables. Example:

```env
VITE_API_URL=http://localhost:3000/api/items
```
Start the development server:

```bash
yarn start
```
The frontend should be running at http://localhost:5173.