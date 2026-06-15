# Inventory Management System (IMS)

A full-stack Inventory Management System built with ASP.NET Core 8, Entity Framework Core, SQL Server, JWT Authentication, Role-Based Authorization, and Next.js.

This project demonstrates enterprise-level application architecture including authentication, authorization, layered architecture, reporting, inventory tracking, and modern frontend development.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected API Endpoints
* Role-Based Authorization (Admin/User)

### Product Management

* Create Product
* Edit Product
* Delete Product
* View Product Details
* Product Search
* Pagination
* Category Filtering
* Supplier Filtering

### Category Management

* Create Category
* Edit Category
* Delete Category
* View Categories

### Supplier Management

* Create Supplier
* Edit Supplier
* Delete Supplier
* View Suppliers

### Inventory Management

* Stock In
* Stock Out
* Automatic Quantity Updates
* Stock Movement Tracking

### Reporting

* Low Stock Report
* Stock Movement History

### Dashboard

* Total Products
* Total Categories
* Total Suppliers
* Low Stock Products

### System Features

* DTO Pattern
* Repository Pattern
* Service Layer
* AutoMapper
* Validation
* Global Exception Handling
* Logging
* SQL Server Database
* Docker Support

---

## Technology Stack

### Backend

* ASP.NET Core 8 Web API
* Entity Framework Core 8
* SQL Server 2022
* JWT Authentication
* AutoMapper
* Fluent Architecture
* Repository Pattern
* Service Layer

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* App Router
* React Hot Toast

### Infrastructure

* Docker
* SQL Server Container

---

## Architecture

```text
Controller
    ↓
Service Layer
    ↓
Repository Layer
    ↓
Entity Framework Core
    ↓
SQL Server
```

---

## Database Schema

### AppUser

```text
Id
Email
PasswordHash
Role
```

### Category

```text
Id
Name
```

### Supplier

```text
Id
Name
ContactPerson
Email
```

### Product

```text
Id
Sku
Name
Quantity
LowStockThreshold
CategoryId
SupplierId
```

### StockMovement

```text
Id
ProductId
Quantity
MovementType
CreatedAt
```

---

## Role-Based Authorization

### Admin

Can:

* Create Products
* Edit Products
* Delete Products
* Create Categories
* Edit Categories
* Delete Categories
* Create Suppliers
* Edit Suppliers
* Delete Suppliers
* Perform Stock In
* Perform Stock Out
* View Reports

### User

Can:

* View Products
* View Categories
* View Suppliers
* View Reports

Cannot:

* Create Records
* Edit Records
* Delete Records
* Manage Inventory

---

## API Endpoints

### Authentication

```http
POST /api/Auth/register
POST /api/Auth/login
```

### Products

```http
GET    /api/Products
GET    /api/Products/{id}

POST   /api/Products
PUT    /api/Products/{id}
DELETE /api/Products/{id}
```

### Categories

```http
GET    /api/Categories
POST   /api/Categories
PUT    /api/Categories/{id}
DELETE /api/Categories/{id}
```

### Suppliers

```http
GET    /api/Suppliers
POST   /api/Suppliers
PUT    /api/Suppliers/{id}
DELETE /api/Suppliers/{id}
```

### Inventory

```http
POST /api/Stock/in
POST /api/Stock/out
```

### Reports

```http
GET /api/Reports/low-stock
GET /api/Reports/stock-movements
```

---

## Running the Project

### Clone Repository

```bash
git clone https://github.com/yourusername/inventory-management-system.git
```

### Start SQL Server Docker Container

```bash
docker compose up -d
```

### Run Backend

```bash
cd Inventory.Api

dotnet restore
dotnet ef database update
dotnet run
```

Backend runs on:

```text
https://localhost:5087
```

### Run Frontend

```bash
cd inventory-web

npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Default Admin Account

```text
Email:
admin@test.com

Password:
123456
```

---

## Future Enhancements

* Recent Stock Movements Dashboard Widget
* Product Images
* Export to Excel
* Audit Logs
* Advanced Reporting
* Email Notifications
* Azure Deployment
* CI/CD Pipeline
* Unit Testing
* Integration Testing

---

## Learning Outcomes

This project demonstrates practical experience with:

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* Role-Based Authorization
* RESTful API Design
* Repository Pattern
* Service Layer Architecture
* Next.js Full Stack Development
* Docker
* TypeScript
* Modern Frontend Development



