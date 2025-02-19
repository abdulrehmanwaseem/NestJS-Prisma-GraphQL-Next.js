# NestJS-Prisma-GraphQL-Next.js

This project is a **highly scalable, industry-standard full-stack application** using **NestJS (Prisma + GraphQL)** for the backend and **Next.js** for the frontend. It follows best practices for modular architecture, performance, and security.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="120" alt="Next.js Logo" /></a>
</p>

## Description

This repository provides a **full-stack solution** leveraging:

### Backend Features

- **NestJS** – A progressive Node.js framework for building scalable and maintainable server-side applications
- **Prisma** – A next-generation ORM for Node.js and TypeScript, providing type-safe database access with an intuitive API
- **GraphQL** – A powerful query language for APIs that enables flexible and efficient data fetching
- **Two-Factor Authentication (2FA)**
  - Integration with Google Authenticator
  - QR code generation using `qrcode`
  - Time-based One-Time Password (TOTP) using `speakeasy`
- **Security Features**
  - JWT-based authentication
  - CSRF protection
  - Environment-based configuration

### Frontend Features

- **Next.js** – A modern React framework with server-side rendering (SSR) and static site generation (SSG)
- **TypeScript** – Ensures type safety and better developer experience
- **RTK Query** – Powerful data fetching and caching for Redux applications
- **GraphQL Integration**
  - GraphQL Code Generator for type-safe queries
  - TypeScript + RTK Query codegen integration
- **Modern Authentication**
  - JWT token management
  - 2FA support with Google Authenticator
  - Secure session handling

## Project Setup

Clone the repository:

````bash
$ git clone https://github.com/yourusername/NestJS-Prisma-GraphQL-Next.js.git
$ cd NestJS-Prisma-GraphQL-Next.js

#### Configure Environment Variables

Copy the example environment file and update it:

```bash
$ cp .env.example .env
````

#### Start the Backend

```bash
# development mode
$ cd ../backend_NestJS
$ pnpm install
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Frontend Setup (Next.js)

Navigate to the frontend directory:

```bash
$ cd ../frontend_Next
$ pnpm install

# development mode
$ pnpm run dev

# production mode
$ pnpm run build && pnpm run start
```

## Features

### Authentication & Security

- **JWT Authentication** – Secure token-based authentication system
- **Two-Factor Authentication (2FA)**
  - Google Authenticator integration
  - QR code setup process
  - TOTP verification
- **CSRF Protection** – Cross-Site Request Forgery prevention

### API & Data Management

- **GraphQL API** – Type-safe API with efficient data fetching
- **RTK Query Integration** – Powerful data fetching and caching
- **Code Generation** – Automated type generation for GraphQL operations
- **Prisma ORM** – Type-safe database queries and migrations

## Folder Structure

```
/NestJS-Prisma-GraphQL-Next.js
  ├── backend_NestJS/    # NestJS API with Prisma & GraphQL
  ├── frontend_Next.js/  # Next.js Frontend
  ├── CODE_OF_CONDUCT.md
  ├── README.md
  ├── LICENSE
  ├── SECURITY.md
```

## Deployment

### Backend Deployment

Refer to [NestJS Deployment Guide](https://docs.nestjs.com/deployment) for best practices.

### Frontend Deployment

Refer to [Vercel](https://vercel.com) or [Next.js Deployment Docs](https://nextjs.org/docs/deployment).

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributions

We welcome contributions! Feel free to open issues or submit pull requests to enhance this project.

## License

This project is provided under MIT. See the [LICENSE](LICENSE) file for details.
