# Temperature Data API

A RESTful API for managing and querying temperature data by location. Built with **Express**, **TypeScript**, and **MongoDB**, this API supports efficient filtering of temperature data by date ranges and the last N days. Caching mechanisms are implemented to optimize data access.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Routes](#api-routes)

## Project Structure

```plaintext
src/
├── cache
│   ├── cacheCleanUp.ts
│   ├── cacheState.ts
│   ├── createCache.ts
│   ├── default
│   │   ├── getDefaultCache.ts
│   │   └── updateDefaultCache.ts
│   ├── lastNdaysQueryCache
│   │   ├── getLastNdaysQueryCacheData.ts
│   │   └── updateLastNdaysQueryCache.ts
│   └── queryByLastAndEndDate
│       ├── getQueryCachedData.ts
│       └── updateQueryCache.ts
├── config
│   └── constants.ts
├── databaseQuery
│   └── fetchData.ts
├── database.ts
├── events
│   └── handleDatabaseConnection.ts
├── index.ts
├── models
│   └── dailyTemperatureByLocationModel.ts
├── routes
│   ├── queryAll.ts
│   ├── queryByLastNdays.ts
│   └── queryByStartNEndDateRoutes.ts
├── transform
│   └── transformToPlotReadyData.ts
├── types
│   └── temperature.ts
└── utils
    ├── calculateStartAndEndDate.ts
    ├── dataImporter.ts
    └── temperatureData.json
```

## Installation

### Clone the repository:

```bash
git clone https://github.com/prabinkc2046/TemperatureDashboard_Backend_NodeJS_TypeScript_MongoDB.git
cd TemperatureDashboard_Backend_NodeJS_TypeScript_MongoDB
```

### Install dependencies:

```bash
npm install
```

## Configuration

### Set up environment variables

Create a .env file in the root directory with the following configuration:

```plaintext
PORT=3001
MONGO_URI=your_mongodb_connection_string
ALLOWED_ORIGIN=http://localhost:3000
```

## Compile TypeScript files:

```bash
npm run build
```

## Start the server:

```bash
npm start
```

## Usage

Once the server is running, you can use the following endpoints to interact with the API.

API Routes
GET /api/temperature
Retrieve all temperature data for all location

GET /api/temperature/range?startDate=2024-10-01&endDate=2024-10-20&location=Melbourne
Filter temperature data by a custom start and end date for all location unless location is provided

GET /api/temperature/last?last=7days&location=Dandenong
Filter temperature data for the last N days for all location unless location is provided
