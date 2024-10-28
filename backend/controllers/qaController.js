const { searchIndex } = require("../services/elasticsearch");

async function getAnswer(question) {
  const results = await searchIndex("web_content", question);
  
  // Extract the best match from results based on score
  if (results.length > 0) {
    return results[0]._source.content; // The highest-scored result's content
  } else {
    return "I'm sorry, I couldn't find an answer to your question.";
  }
}

module.exports = { getAnswer };
