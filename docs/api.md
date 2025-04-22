# Brandbook API Documentation

## Base URL

All endpoints are prefixed with `/brandbook`

## Authentication

All endpoints require JWT authentication using Bearer token in the Authorization header.

## Endpoints

### 1. Create Brandbook

```
POST api/brandbook
```

Creates a new brandbook with company information and generates brand guidelines using AI.

**Request**

- Content-Type: `multipart/form-data`
- Required fields:
  - `companyName` (string): Company name
  - `industry` (string): Company industry
  - `description` (string): Company description
  - `authorName` (string): Author's name
  - `authorRole` (string): Author's role
  - `authorEmail` (string): Author's email
  - `logo` (file): Company logo (PNG/JPG)
- Optional fields:
  - `tagline` (string): Company tagline
  - `preferredColor` (string): Preferred brand color (hex)
  - `preferredFont` (string): Preferred font family

**Response**

```json
{
	"id": "string",
	"companyName": "string",
	"logoUrl": "string",
	"pdfUrl": "string",
	"createdAt": "2024-03-21T12:00:00Z"
}
```

### 2. List Brandbooks

```
GET /brandbook
```

Retrieves all brandbooks created by the authenticated user.

**Response**

```json
[
	{
		"id": "string",
		"companyName": "string",
		"logoUrl": "string",
		"createdAt": "2024-03-21T12:00:00Z"
	}
]
```

### 3. Get Brandbook

```
GET /brandbook/:id
```

Retrieves a specific brandbook by ID.

**Response**

```json
{
	"id": "string",
	"companyName": "string",
	"tagline": "string",
	"industry": "string",
	"description": "string",
	"logoUrl": "string",
	"pdfUrl": "string",
	"generatedHtml": "string",
	"createdAt": "2024-03-21T12:00:00Z"
}
```

### 4. Update Brandbook

```
PATCH /brandbook/:id
```

Updates a specific brandbook with new information.

**Request**

- Content-Type: `multipart/form-data`
- Optional fields:
  - All fields from create endpoint
  - `logo` (file): New company logo

**Response**

```json
{
	"id": "string",
	"companyName": "string",
	"logoUrl": "string",
	"updatedAt": "2024-03-21T12:00:00Z"
}
```

### 5. Delete Brandbook

```
DELETE /brandbook/:id
```

Deletes a specific brandbook and its associated files.

**Response**

- Status: 200 OK

### 6. Get PDF

```
GET /brandbook/:id/pdf
```

Returns the URL of the generated PDF for a specific brandbook.

**Response**

```json
{
	"pdfUrl": "/pdfs/brandbook-123.pdf"
}
```

### 7. Regenerate Content

```
POST /brandbook/:id/regenerate
```

Regenerates the brandbook content using AI and creates a new PDF.

**Response**

```json
{
	"id": "string",
	"pdfUrl": "string",
	"updatedAt": "2024-03-21T12:00:00Z"
}
```

## Error Responses

### Unauthorized (401)

```json
{
	"statusCode": 401,
	"message": "Unauthorized"
}
```

### Not Found (404)

```json
{
	"statusCode": 404,
	"message": "Brandbook not found"
}
```

### Bad Request (400)

```json
{
	"statusCode": 400,
	"message": "Logo file is required"
}
```

## Notes

- All endpoints require authentication
- File uploads are limited to images (PNG/JPG)
- Each user can only access their own brandbooks
- Generated PDFs and logos are stored in the public directory
- The AI regeneration feature can be used to create new variations of the brand guidelines
