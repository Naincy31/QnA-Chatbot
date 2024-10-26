const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js'); // Import Fuse.js

// Define the path to the scrapedData.json file
const dataPath = path.join(__dirname, '../data/scrapedData.json');

// Load the scraped data into memory once at server startup
let scrapedData = [];
let fuse; // Declare a variable to hold the Fuse.js instance

const loadData = () => {
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    scrapedData = JSON.parse(jsonData);
    
    // Configure Fuse.js
    const options = {
      includeScore: true, // Include the score in results for additional info
      threshold: 0.3, // Set the threshold for fuzzy matching (0-1)
      keys: ['text'], // Define the keys to search in (adjust based on your JSON structure)
    };

    // Initialize Fuse.js with the scraped data
    fuse = new Fuse(scrapedData.map(line => ({ text: line })), options);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Implement the search function using Fuse.js
const searchAnswers = (question) => {
  const results = fuse.search(question);
  console.log(results);
  
  const matchingAnswers = results.map(result => result.item.text);

  return matchingAnswers.length > 0 
    ? matchingAnswers.join('\n') 
    : "I'm sorry, I don't have an answer for that.";
};

// Function to get the most relevant answer
const getAnswer = (question) => {
  if (!question) {
    throw new Error("No question provided");
  }

  return searchAnswers(question);
};

// Load the data when the controller is initialized
loadData();

// Export the function to get answers
module.exports = { getAnswer };
