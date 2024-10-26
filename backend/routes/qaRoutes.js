const express = require("express");
const { getAnswer } = require("../controllers/qaController");
const router = express.Router(); //creates new router instance for handling requests

router.post("/ask", async (req, res) => {
  try {
    console.log("inside qaRoute.js");
    
    if (!req.body.question) {
      return res.status(400).json({ error: "Question is required." });
    }
    const question = req.body.question; // Get 'question' from the request body
    const answer = await getAnswer(question); 
    res.json({ answer });

  } catch (error) {
    console.error("Error retrieving answer:", error);
    res.status(500).json({ answer: "An error occurred while searching for an answer." });
  }
});

module.exports = router;
