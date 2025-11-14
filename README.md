# FindMyLeak 🔍

A data breach detection application that helps users discover if their personal information has been compromised in data breaches.

## Features

- **Breach Detection**: Scan email addresses and phone numbers for data breaches
- **Data Deletion**: Request removal of compromised data
- **Real-time Results**: Instant breach detection with detailed information
- **Secure API**: Authentication-protected endpoints

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Spring Boot 3.5.7 + Java 21
- **Database**: MongoDB
- **UI Components**: shadcn/ui

## Quick Setup

### Backend
```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## Configuration

Create `.env` in frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_USERNAME=user
VITE_API_PASSWORD=pass
```

Configure `application-dev.properties` in backend:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/findmyleak
spring.security.user.name=user
spring.security.user.password=pass
leak.api.url=https://abc.com
leak.api.token=your_api_token_here
```

## API Endpoints

- `POST /api/scan` - Scan for data breaches
- `POST /api/delete-request` - Request data deletion
- `GET /api/delete-request` - List deletion requests

## Author

**Vikas Nagar** - [@vikas-nagar9001](https://github.com/vikas-nagar9001)