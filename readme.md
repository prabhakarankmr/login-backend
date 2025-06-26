# 🛡️ Login Backend API – NestJS Authentication System

This is a secure and scalable **NestJS-based backend API** designed for user authentication using JWT, TypeORM, and PostgreSQL. It includes structured project setup, environment-based configurations, and modular authentication using Passport strategies.

---

## 📁 Project Structure

```
login-backend/
├── src/                  # Source code
│   ├── auth/             # Authentication module
│   ├── user/             # User module (if implemented)
│   ├── config/           # Configurations
│   └── main.ts           # App entry point
├── dist/                 # Compiled output (ignored in git)
├── .env                  # Environment variables (see below)
├── .gitignore            # Git ignored files
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
```

---

## 🧪 Environment Configuration

All sensitive configs are defined in `.env`. **Example:**

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=login_app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# App Config
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 🧰 Tech Stack

- **NestJS** (with decorators and modular design)
- **TypeORM** (for DB access - not yet connected)
- **PostgreSQL** (as intended database)
- **JWT Auth** (access and refresh tokens)
- **PassportJS** (local and JWT strategies)
- **Helmet** (security middleware)
- **Rate Limiter** (to prevent brute force attacks)
- **Class Validator** (for DTO validation)

---

## 📦 Scripts

```bash
# Run in dev mode
npm run start:dev

# Create PostgreSQL DB (must have PostgreSQL CLI installed)
npm run db:create

# Drop DB
npm run db:drop

# Reset DB (drop + create)
npm run db:reset
```

---

## 🚧 Database Configuration

This project uses **TypeORM** but it is currently **not connected** to any live database.

> 🔌 To connect:

1. Update `.env` with your real database credentials.
2. Create a `data-source.ts` or check `app.module.ts` for database initialization.
3. Ensure your PostgreSQL server is running.

---

## ⚠️ Notes

- Database is **not connected**. You'll need to set up and connect it yourself.
- JWT secrets in `.env` should be changed before deploying to production.
- This project is backend-only and expects a frontend (like React or Next.js) to interact with it via APIs.

---

## 🙌 Contributing

Feel free to fork and submit pull requests. If you improve anything, especially the DB setup or add more modules, your contributions are welcome.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> Made with ❤️ using NestJS

