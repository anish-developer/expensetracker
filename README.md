# Expense Tracker Backend

A backend service built with NestJS and MongoDB to track user expenses and provide advanced statistics like top spending days, monthly changes, and future predictions.

## Features

- Add, update, and delete expenses
- Statistics:
  - Top 3 days by total expenditure (per user)
  - Monthly percentage change in spending (per user)
  - Next month’s expenditure prediction (per user)
- Supports users and categories collections
- Server-side validations using DTOs

## Technologies Used

- Node.js with NestJS framework
- MongoDB with Mongoose ODM
- TypeScript

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-tracker-backend.git
cd expense-tracker-backend
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file from the provided `.env.example`:

```bash
cp .env.example .env
```

Then open `.env` and set your MongoDB URI:

```env
MONGO_URI=mongodb://localhost:27017/expense-tracker
PORT=3000
```

### 4. Run the Application

Start the development server:

```bash
npm run start:dev
```

Other options:

```bash
# Build and run in production mode
npm run build
npm run start:prod
```

### 5. Verify API is Running

After the server starts, open your browser or API tool (Postman, Insomnia) and go to:

```
http://localhost:3000
```

Test endpoints like:

- `GET /expenses`
- `POST /expenses`
- `GET /stats/top-days`

### 6. Insert Sample Data

Use MongoDB Compass or shell to insert sample `users` and `categories`:

**Users Collection:**

```json
{
  "_id": "66c123abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active"
}
```

**Categories Collection:**

```json
{
  "_id": "66c456def456",
  "name": "Food"
}
```

This will allow expense entries to reference valid users and categories.
