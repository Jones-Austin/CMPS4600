# TrailBuddy - Final Project

## Project Overview
TrailBuddy is a Progressive Web App (PWA) built with React. It is designed for hikers to track their history, view statistics, and log new trail adventures.

## Features
- **Dashboard**: View total distance and elevation gain.
- **Log Hike**: Add new hikes via a simple form.
- **Recent Activity**: See a history of your latest trails.
- **PWA**: Can be installed on mobile devices and works offline.

## How to Run
1. Clone the repository.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000` in your browser.

## Technologies Used
- React.js
- Vanilla CSS
- Lucide-React (Icons)
- Service Workers (PWA)

## Project Architecture
```mermaid
graph TD
    App[App.js] --> Nav[Navbar Component]
    App --> Hero[Hero Stats Section]
    App --> List[Recent Activity List]
    App --> FAB[Log Hike Button]
    
    FAB --> Modal[Hike Entry Modal]
    
    DataFlow((Local State)) -.-> Hero
    DataFlow -.-> List
    
    subgraph Browser Storage
        SW[Service Worker]
        Cache[(Cache Storage)]
    end
    
    SW --- Cache
```
