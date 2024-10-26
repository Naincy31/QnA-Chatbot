const fs = require('fs');
const path = require('path');
const Fuse = require('fuse.js');

const dataPath = path.join(__dirname, '../data/scrapedData.json');

// Load the scraped data into memory once at server startup
let scrapedData = [];
let fuse; 

const loadData = () => {
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    scrapedData = JSON.parse(jsonData);
    
    // Configure Fuse.js
    const options = {
      includeScore: true, 
      threshold: 0.3, 
      keys: ['text'], 
    };

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


const getAnswer = (question) => {
  if (!question) {
    throw new Error("No question provided");
  }

  return searchAnswers(question);
};

loadData();

module.exports = { getAnswer };
