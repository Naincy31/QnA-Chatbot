const puppeteer = require('puppeteer');
const { indexData } = require('./elasticsearch'); // Ensure this file exists and is configured correctly

async function scrapeData() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Replace with the actual URL of the website you want to scrape
  await page.goto('https://docs.ozonetel.com/docs/overview-1');
  
  // Wait for the main content to load
  await page.waitForSelector('#ssr-main');

  // Extract data
  const sections = await page.evaluate(() => {
    const results = [];
    const main = document.querySelector('#ssr-main div.App main.rm-Guides');
    console.log("main: ", main);
    
    
    if (main) {
      const sectionElements = main.querySelectorAll('div.rm-Container nav.rm-Sidebar div.hub-sidebar-content section.Sidebar-listWrapper6Q9_yUrG906C.rm-Sidebar-section');
      console.log("sectionElements: ", sectionElements);

      sectionElements.forEach(section => {
        const sectionTitle = section.querySelector('h2') ? section.querySelector('h2').innerText : '';
        const link = section.querySelector('ul li a');
        const linkData = link ? {
          title: link.innerText.trim(),
          href: link.href
        } : null;
        results.push({ sectionTitle, link: linkData });

      });
    }
    
    return results;
  });

  console.log("Sections and Links Extracted:", sections);

  // Loop through each section and follow links to scrape page content
  for (const section of sections) {
    if (section.link) {
      console.log(`Scraping content from ${section.link.href}`);
      await page.goto(section.link.href, { waitUntil: 'domcontentloaded' });

      // Extract content of the page
      const pageContent = await page.evaluate(() => {
        return document.body.innerText || '';  // Adjust this selector if necessary
      });

      // Index the data in Elasticsearch
      await indexData('web_content', {
        section: section.sectionTitle,
        title: section.link.title,
        url: section.link.href,
        content: pageContent
      });
    }
  }

  await browser.close();
  console.log("Scraping and indexing completed.");
}

scrapeData().catch(console.error);
