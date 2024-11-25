# MercadoLibre Challenge Backend

## Author
Sebastian Arboleda Botero

sarboledabotero@gmail.com

linkedin.com/in/sarboledab/


## Project Structure

```bash
meli-challenge/
├── meli-challenge-back/ 
│   ├── .husky/           # Precommit config
│   ├── src/              # Backend source code
│   │    ├── api/         # APIs source code
│   │    ├── config/      # backend and swagger configuration 
│   │    ├── middleware/  # middlewares (handler error)
│   │    ├── services/    # Services (APIS calls)
│   │    ├── utils/       # logic shared
│   │    ├── app.js       # App config
│   │    └── index.jsx    # start point
│   ├── .env              # Environment configuration (not included in Git)
│   ├── jest.config.cjs   # Jest configuration
│   └── package.json      # Frontend dependencies and scripts
└── README.md             # This file

```

## Scrips

Start backend on localhost:3000
```bash
yarn start
```
Format code with prettier
```bash
yarn format
```

Prepare precommit with husky
```bash
yarn prepare
```

Start unit test with jest
```bash
yarn test
```
