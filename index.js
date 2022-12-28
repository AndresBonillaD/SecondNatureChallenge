import puppeteer from "puppeteer";
import { Configuration, OpenAIApi } from "openai";
import {} from 'dotenv/config';

// Scraping
const URL = 'https://www.secondnature.com/company'

// Initialize browser
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Go To URL
await page.goto(URL);

// Get HTML element and content using query selector
const paragraph = await page.$("#guys-behind p.paragraph");
const paragraphContent = await page.evaluate(body => body.innerHTML, paragraph);

// Closing instances
await paragraph.dispose();
await browser.close();

// Print results
console.log(paragraphContent);

// Open Ai
// Open Ai Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// OpenAi Instance
const openai = new OpenAIApi(configuration);
const prompt = `Decide whether the following text is positive, neutral or negative. Text: ${paragraphContent}. Sentiment:`
 
// Model Application
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.6,
});

// Print Sentiment
console.log(`\nSentiment:`, completion.data.choices[0].text);