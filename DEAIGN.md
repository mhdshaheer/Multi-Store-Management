# DESIGN.md

# Design Overview

The application follows a **Repository Pattern** with a **Controller → Service → Repository** architecture, separating business logic from data access to keep the code clean, maintainable, and easy to extend.

The backend is built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**, while the frontend is built with **Angular**. The project also follows the **SOLID principles**, making it easier to scale, maintain, and extend as new features are added.

## Data Model

The application uses four main collections:

### User

Stores user information and roles.

```text
User
- _id
- name
- email
- password
- role (USER | ADMIN)
```

### Store

Represents a physical store.

```text
Store
- _id
- name
- address
```

### Product

Stores product information.

```text
Product
- _id
- name
- description
- price
```

### Stock

Tracks the quantity of each product available in a specific store.

```text
Stock
- _id
- productId
- storeId
- quantity
```

Each `(productId, storeId)` pair is unique, ensuring that each product has only one stock record per store.

## Preventing Negative Stock

To prevent negative inventory during concurrent requests, stock updates are executed inside **MongoDB transactions** using **Mongoose sessions**. Before deducting stock, the application verifies that sufficient quantity is available. Since the validation and update occur within the same transaction, concurrent requests cannot oversell inventory or result in negative stock.

## Atomic Stock Transfers

A stock transfer consists of two operations:

1. Deduct stock from the source store.
2. Add the same quantity to the destination store.

Both operations are executed within a single MongoDB transaction. If any step fails, the transaction is rolled back automatically, ensuring that stock is never deducted without being added to the destination store.

## Design Decisions

- Implemented the **Repository Pattern** to separate database operations from business logic.
- Followed the **SOLID principles** to improve scalability, maintainability, and code reusability.
- Used **MongoDB transactions** to ensure atomic stock transfers and maintain data consistency.
- Implemented **role-based authorization**, allowing only administrators to manage inventory.
- Kept business logic in the service layer while repositories handle only database operations, ensuring a clear separation of concerns.
