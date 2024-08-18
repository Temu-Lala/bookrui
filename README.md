#Cheack the Screensoot in the bookrui have a folder screenshoot cheack what it looks like the whole informatio 
---

# Bookr

Bookr is a modern book management application built using Next.js, Node.js, PostgreSQL, and Material UI. It allows users to manage books, user accounts, and view detailed information about books. The application features user authentication, role management, and a comprehensive API for interacting with book data.

## Technologies Used

- **Frontend**: Next.js, Material UI, Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Others**: bcrypt for password hashing, CORS for cross-origin requests

## Project Structure

- **Frontend**: Next.js project with Material UI for styling and Axios for making HTTP requests.
- **Backend**: Node.js server with Express.js handling API endpoints and PostgreSQL for data storage.

## Installation

### Backend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/bookr.git
   cd bookr
   ```

2. **Navigate to the Backend Directory:**

   ```bash
   cd backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up PostgreSQL:**
   
   Make sure PostgreSQL is installed and running. Update the `clientConfig` and `poolConfig` in `server.js` with your PostgreSQL credentials.

5. **Start the Backend Server:**

   ```bash
   npm start
   ```

### Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend Server:**

   ```bash
   npm run dev
   ```

## API Endpoints

### User Endpoints

- **POST `/register`**: Register a new user.
  - **Body**: `{ username, email, location, phone, password }`
  - **Response**: `{ id, username, email, location, phone, role }`

- **POST `/`**: User login.
  - **Body**: `{ email, password }`
  - **Response**: `{ token, role }`

- **GET `/users`**: Fetch all users.
  - **Response**: `[ { id, username, email, location, phone, role }, ... ]`

- **PUT `/users/:id/role`**: Update user role.
  - **Body**: `{ role }`
  - **Response**: `{ id, username, email, location, phone, role }`

### Book Endpoints

- **POST `/books`**: Add a new book.
  - **Body**: `{ title, genre, price, imagePath, author, publicationdate, publisher, description }`
  - **Response**: `{ id, title, genre, price, imagePath, author, publicationdate, publisher, description, username, email, created_at }`

- **GET `/books`**: Fetch all books.
  - **Response**: `[ { id, title, genre, price, imagePath, author, publicationdate, publisher, description, username, email, created_at }, ... ]`

- **GET `/books/:id`**: Fetch a single book by ID.
  - **Response**: `{ id, title, genre, price, imagePath, author, publicationdate, publisher, description, username, email, created_at }`

- **GET `/booksusername`**: Fetch books by username.
  - **Query Parameter**: `username`
  - **Response**: `[ { id, title, genre, price, imagePath, author, publicationdate, publisher, description, username, email, created_at }, ... ]`

- **GET `/books/daily`**: Get daily book counts.
  - **Response**: `[ { date, count }, ... ]`

- **GET `/search`**: Search for books by title.
  - **Query Parameter**: `title`
  - **Response**: `[ { id, title, genre, price, imagePath, author, publicationdate, publisher, description, username, email, created_at }, ... ]`

## Usage

1. **Register a New User**: Use the `/register` endpoint with user details.
2. **Login**: Use the `/` endpoint with email and password to obtain a JWT token.
3. **Add a Book**: Use the `/books` endpoint with book details. Include the JWT token in the Authorization header.
4. **View Books**: Use the `/books` endpoint to fetch all books or `/books/:id` to fetch a specific book.
5. **Search Books**: Use the `/search` endpoint with a title query parameter.

## Testing

For testing, you can use tools like Postman to interact with the API endpoints. Ensure that the backend server is running before testing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, feel free to reach out to me at [temesgendebebe1921@example.com].

---

