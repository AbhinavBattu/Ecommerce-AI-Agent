import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fetch, { Headers, Request, Response } from "node-fetch"; // Import required classes

dotenv.config();

// Polyfill fetch and related classes globally
globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;

const genAI = new GoogleGenerativeAI(API_KEY);

// Function to identify the intent using Google Gemini
const identifyIntent = async (user_input) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      The user has provided the following input: "${user_input}".
      Please determine the user's intent from the following options:
      1. Add products to cart or buy products
      2. Search for products
      3. Navigate to a page
      Return the intent in a simple format.
    `;

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Log the raw text output for debugging
    // console.log('Intent output from Gemini:', text);

    // Clean and return the identified intent
    return text.trim().toLowerCase();
  } catch (error) {
    console.error('Error identifying intent:', error.message);
    return 'unknown';
  }
};

// Function to identify pages from user input using a predefined list of known pages
const identifyPage = (user_input) => {
  const knownPages = ['profile', 'cart', 'home', 'products', 'checkout', 'search','login'];
  const lowerInput = user_input.toLowerCase();

  const page = knownPages.find(page => lowerInput.includes(page));
  return page ? page : 'unknown page';
};

// Function to identify products from user input using Google Gemini
const identifyProducts = async (user_input) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      The user wants to buy products. Please extract and return a list of product names mentioned in the following input.
      Input: "${user_input}"
      Please return only the product names as a list in JSON array format.
    `;

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // Log the raw text output for debugging
    // console.log('Product output from Gemini:', text);

    // Remove formatting markers if they exist
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse the JSON output to get the array of products
    const products = JSON.parse(text);

    return products;
  } catch (error) {
    console.error('Error identifying products:', error.message);
    return [];
  }
};

// Function to process user input based on intent
export const processUserInput = async (user_input) => {
  const intent = await identifyIntent(user_input);

  if (intent.includes('add products to cart') || intent.includes('buy products')) {
    const products = await identifyProducts(user_input);
    return { intent: 'add_products_to_cart', products: products };
  } else if (intent.includes('navigate to')) {
    const page = identifyPage(user_input);
    // console.log(page);
    return { intent: 'navigate', page: page };
  } else if (intent.includes('search for products')) {
    const product = await identifyProducts(user_input);
    return { intent: 'search', query: user_input, product: product[0] || 'unknown product' };
  } else {
    return { intent: 'unknown' };
  }
};
