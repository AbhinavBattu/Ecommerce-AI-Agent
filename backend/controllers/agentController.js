// import Product from '../models/productModel.js'; // Adjust the path as necessary
// import { processUserInput } from './agent.js'; // Import the LangChain logic

// // Controller function executed when the `/agent` route is hit
// export const handleAgentRequest = async (req, res) => {
//   console.log("Hello");
//   const { userInput } = req.body;

//   try {
//     const { intent, products, query, page, product } = await processUserInput(userInput);

//     if (intent === 'add_products_to_cart' || intent === 'search') {
//       // Find products in the database based on identified products or search query
//       const searchCriteria = intent === 'add_products_to_cart' ? { name: { $in: products } } : { name: new RegExp(query, 'i') };
//       const foundProducts = await Product.find(searchCriteria).select('_id'); // Only select the product IDs
//       console.log(foundProducts);
//       if (foundProducts.length > 0) {
//         // Extract product IDs from the found products
//         const productIds = foundProducts.map(prod => prod._id);

//         // Send product IDs and intent to the frontend
//         return res.json({ productIds, intent, path: intent === 'add_products_to_cart' ? '/cart' : '/' });
//       } else {
//         return res.json({ message: 'No products found for your request.' });
//       }
//     } else if (intent === 'navigate') {
//       // Handle navigation
//       return res.json({ action: `navigate_to_${page}`, path: `/${page}` });
//     } else if (intent === 'add_specific_product') {
//       // Find and return the specific product ID to be added to the cart
//       const specificProduct = await Product.findOne({ name: new RegExp(product, 'i') }).select('_id');
//       if (specificProduct) {
//         return res.json({ productIds: [specificProduct._id], intent: 'add_specific_product', path: '/cart' });
//       } else {
//         return res.json({ message: 'Product not found.' });
//       }
//     } else {
//       res.status(400).json({ message: 'Unknown action.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error processing request', error: error.message });
//   }
// };





import Product from '../models/productModel.js'; // Adjust the path as necessary
import { processUserInput } from './agent.js'; // Import the Gemini logic

// Controller function executed when the `/agent` route is hit
export const handleAgentRequest = async (req, res) => {

  try {
    const userInput = req.body.userInput; // Expecting input from req.body
    console.log('User Input:', userInput);
    // Process user input using the Gemini logic
    const { intent, products, query, page } = await processUserInput(userInput);
    // const temp = await processUserInput(userInput);
    // console.log(te);
    // console.log(products);
    if (intent === 'add_products_to_cart') {
      // Find products in the database based on identified products
      const foundProducts = await Promise.all(
        products.map(async (productName) => {
          // console.log(productName);
          // Create a RegExp that matches any word in the product name
          const regex = new RegExp(productName.split(' ').join('|'), 'i');
          return await Product.findOne({ name: regex }).select('_id');
        })
      );
      // console.log(foundProducts.length);
      // Filter out any null results (i.e., products not found)
      const validProducts = foundProducts.filter(prod => prod !== null);

      if (validProducts.length > 0) {
        // Extract product IDs from the found products
        const productIds = validProducts.map(prod => prod._id);
        // console.log(productIds);
        // Send product IDs, intent, and path to the frontend
        return res.json({ productIds, intent, path: '/cart' });
      } else {
        return res.json({ message: 'No products found for your request.' });
      }
    } else if (intent === 'search') {
      // Return the identified product name, intent, and path
      return res.json({ product: products[0], intent, path: '/' });
    } else if (intent === 'navigate') {
      // Handle navigation
      console.log(page);
      return res.json({ intent: `navigate`, path: `/${page}` });
    } else {
      res.status(400).json({ message: 'Unknown action.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
};


// handleAgentRequest(re/q);