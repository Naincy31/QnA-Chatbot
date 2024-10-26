const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://docs.ozonetel.com/docs/overview-1');

  const data = await page.evaluate(() => {
    return document.querySelector("#ssr-main").textContent;
  });

  const scrapedData = data.split('\n').filter(line => line.trim()); // Store paragraphs or lines as separate entries-Clean up empty lines

  console.log(scrapedData);
  

  // Define the path to save the JSON file
  const filePath = path.join('backend', 'data', 'scrapedData.json');
  
  // Write scraped data to a JSON file
  fs.writeFileSync(filePath, JSON.stringify(scrapedData, null, 2));
  
  await browser.close();
}

// Run scrapeData when server starts
scrapeData();
