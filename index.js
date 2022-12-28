import puppeteer from "puppeteer";
import { Configuration, OpenAIApi } from "openai";
import {} from 'dotenv/config';

// Scraping
const URL = 'https://www.secondnature.com/company'

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(URL);

const paragraph = await page.$("#guys-behind p.paragraph");
const paragraphContent = await page.evaluate(body => body.innerHTML, paragraph);
await paragraph.dispose();

await browser.close();

console.log(paragraphContent);



// Open Ai
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = `Decide whether the following text is positive, neutral or negative. Text: ${paragraphContent}. Sentiment:`
 
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.6,
});

console.log(`\nSentiment:`, completion.data.choices[0].text);