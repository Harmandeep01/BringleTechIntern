# File Upload System

A simple Node.js project to upload files.

## How to Use

1. Install Node.js (v14 or higher).
2. Clone this repo and run:
    ```bash
    npm install
    npm start
    ```
3. Use Postman.
## API

### `POST /upload`
- **Send**: A file (use `multipart/form-data`).
- **Response**: 
  - `200 OK`: Success.
  - `400 Bad Request`: Error.

## Setup

- Create a `.env` file:
    ```env
    PORT=3000
   MONGO_URI=yourmongodburi
    ```

## Folders

- `uploads/`: Saved files.
- `src/`: Code files.

### Links
- [LinkedIn](https://www.linkedin.com/in/harmandeep01/)

- [GitHub](https://github.com/Harmandeep01)

## Thanks

- [Multer](https://github.com/expressjs/multer)
- [Express](https://expressjs.com/)
