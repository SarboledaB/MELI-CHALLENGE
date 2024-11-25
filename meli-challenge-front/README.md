# MercadoLibre Challenge Frontend

## Author
Sebastian Arboleda Botero

sarboledabotero@gmail.com

linkedin.com/in/sarboledab/


## Project Structure

```bash
meli-challenge/
├── meli-challenge-front/ 
│   ├── .husky/           # Precommit config
│   ├── __mocks__/        # Assets mock
│   ├── public/           # public assets
│   ├── src/              # Frontend source code
│   │    ├── assets/      # assets (png,svg,jpg...)
│   │    ├── components/  # shared components
│   │    ├── hooks/       # react hooks
│   │    ├── pages/       # pages of components
│   │    ├── services/    # backend calls
│   │    ├── styles/      # SASS main and variables
│   │    ├── utils/       # logic shared
│   │    ├── App.jsx      # App index
│   │    └── main.jsx     # start point
│   ├── .env              # Environment configuration (not included in Git)
│   ├── babel.config.cjs  # Babel configuration
│   ├── jest.config.cjs   # Jest configuration
│   ├── jest.setup.cjs    # Jest Setup
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies and scripts
└── README.md             # This file

```

## Scrips

Start frontend on localhost:5173
```bash
yarn dev
```

Create a build of the application
```bash
yarn build
```

Format code with prettier
```bash
yarn format
```

Start unit test with jest
```bash
yarn test
```
