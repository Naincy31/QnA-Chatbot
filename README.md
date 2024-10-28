# Project Overview

This project is a **Q&A Chatbot** built using **React** for the frontend and **Node.js** for the backend, designed to scrape website data, store it in **Elasticsearch**, and use the **BM25 search algorithm** to respond to user queries.

---

## **Dependencies**

The following dependencies were installed for this project:

- **@elastic/elasticsearch**: ^8.15.1 — Used to connect to and query Elasticsearch.
- **axios**: ^1.7.7 — A library for making HTTP requests to APIs.
- **cors**: ^2.8.5 — Enables cross-origin resource sharing for API calls.
- **express**: ^4.21.1 — A web framework for setting up the backend server.
- **fuse.js**: ^7.0.0 — Used for client-side fuzzy search as a fallback.
- **node-cron**: ^3.0.3 — Schedules automated tasks (such as refreshing scraped data).
- **puppeteer**: ^23.6.0 — Headless browser for scraping website data.

---

## **Project Setup**

1. **Frontend Setup**:

   - The frontend was created using **Create React App**:
     ```bash
     npx create-react-app chat-widget
     ```
   - A **chat widget** component was built to provide a simple and interactive interface for users to ask questions.
   - React **hooks** (e.g., `useState`, `useEffect`) were used to manage the chat component’s state and API calls.

2. **Backend Setup**:

   - The backend was built using **Express** to create API endpoints for data scraping and search functionality.
   - **Puppeteer** was used in the backend to scrape data from the specified website.
   - **node-cron** was added to schedule daily data refreshes, so the scraped data remains up-to-date.

3. **Data Storage in Elasticsearch**:
   - **Elasticsearch** was installed locally on the system.
   - The scraped data was processed and stored in **Elasticsearch** for fast and efficient querying.

---

## **How It Works**

1. **Scraping the Data**:

   - Using **Puppeteer**, the backend scrapes relevant information from the target website, including sections, titles, URLs, and content.
   - The scraped data is then stored in **Elasticsearch** to create an index for efficient querying.

2. **Querying Data with BM25**:
   - When a user asks a question in the frontend chat widget, the backend performs a **search** on Elasticsearch using its **BM25 search algorithm**.
   - **BM25** ranks the results based on relevance, helping the system find the most appropriate answer from the indexed data.

---

## **Running the Project**

1. Install the necessary dependencies in both the frontend and backend folders:
   ```bash
   npm install
   ```
2. **Run Elasticsearch** locally by starting the service on your system.

3. **Run the backend** server to initialize the Express API:
   ```bash
   node backend/app.js
   ```
4. **Start the React frontend**:
   ```bash
   npm start
   ```

---

## **Usage**

- When the frontend chat widget is loaded, users can type questions related to the scraped website content.
- The backend uses **Elasticsearch’s BM25 algorithm** to find the best match and returns relevant snippets from the indexed content.

---
