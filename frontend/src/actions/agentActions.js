// import axios from 'axios';
// import { addToCart } from './cartActions'; // Import your existing action
// // import { useDispatch } from 'react-redux';

// export const handleUserRequest = async (userInput) => {
//   // const dispatch = useDispatch();
//   // console.log(userInput);
//   try {
//     // Send the user input to the backend
//     const { data } = await axios.post('/api/agent', { userInput });
//     console.log(data);
//     //Check the intent and perform actions accordingly
//     if (data.intent === 'search') {
//       // Handle search intent
//       console.log('Search Results:', data.productIds);
//       // You can display the product IDs or fetch more details about them for display
//     } else if (data.intent === 'add_products_to_cart') {
//       // Handle add to cart intent
//       if (data.productIds && data.productIds.length > 0) {
//         data.productIds.forEach(productId => {
//           addToCart(productId, 1); // Assuming quantity is always 1
//         });

//         // Redirect to the cart page
//         if (data.path) {
//           window.location.href = data.path;
//         }
//       } else {
//         console.log('No products found to add to cart.');
//       }

//     } else if (data.intent === 'navigate') {
//       // Handle navigation intent
//       if (data.path) {
//         window.location.href = data.path;
//       } else {
//         console.log('Navigation path not provided.');
//       }

//     } else {
//       console.log('Unknown intent or action.');
//     }
//   } catch (error) {
//     console.error('Error processing request:', error.message);
//   }
// };



// import axios from 'axios';
// import { addToCart } from './cartActions'; // Import your existing action

// export const handleUserRequest = async (userInput, dispatch) => {
//   try {
//     // Send the user input to the backend
//     const { data } = await axios.post('/api/agent', { userInput });
//     console.log(data);
//     console.log(data.productIds);
//     // Check the intent and perform actions accordingly
//     if (data.intent === 'search') {
//       console.log('Search Results:', data.productIds);
//     } else if (data.intent === 'add_products_to_cart') {
//       if (data.productIds && data.productIds.length > 0) {
//         data.productIds.forEach(productId => {
//           console.log(productId);
//           setTimeout(dispatch(addToCart(productId, 1)),5000); // Pass dispatch to addToCart
//         });

//         if (data.path) {
//           window.location.href = data.path;
//         }
//       } else {
//         console.log('No products found to add to cart.');
//       }
//     } else if (data.intent === 'navigate') {
//       if (data.path) {
//         window.location.href = data.path;
//       } else {
//         console.log('Navigation path not provided.');
//       }
//     } else {
//       console.log('Unknown intent or action.');
//     }
//   } catch (error) {
//     console.error('Error processing request:', error.message);
//   }
// };



// import axios from 'axios';
// import { addToCart } from './cartActions';
// import { listProducts } from './productActions';
// export const handleUserRequest = async (userInput, dispatch) => {
//   try {
//     // Send the user input to the backend
//     const { data } = await axios.post('/api/agent', { userInput });
//     console.log(data);
//     // console.log(data.productIds);

//     // Check the intent and perform actions accordingly
//     if (data.intent === 'search') {
//       // if (keyword.trim()) {
//       //   history.push(`/products/search/${keyword}/${filter.toLowerCase()}`);
//       //   setKeyword("");
//       // } else {
//       //   history.push("/products");
//       // }
//       console.log('Search Results:', data.productIds);
//     } else if (data.intent === 'add_products_to_cart') {
//       if (data.productIds && data.productIds.length > 0) {
//         // Wait for all addToCart actions to complete
//         await Promise.all(
//           data.productIds.map(productId => {
//             console.log(productId);
//             return dispatch(addToCart(productId, 1));
//           })
//         );

//         // Navigate to the path after adding items to the cart
//         if (data.path) {
//           window.location.href = data.path;
//         }
//       } else {
//         console.log('No products found to add to cart.');
//       }
//     } else if (data.intent === 'navigate') {
//       if (data.path) {
//         window.location.href = data.path;
//       } else {
//         console.log('Navigation path not provided.');
//       }
//     } else {
//       console.log('Unknown intent or action.');
//     }
//   } catch (error) {
//     console.error('Error processing request:', error.message);
//   }
// };




//agentActions.js
import axios from 'axios';
import { addToCart } from './cartActions';

export const handleUserRequest = async (userInput, dispatch) => {
  try {
    // Send the user input to the backend
    const { data } = await axios.post('/api/agent', { userInput });
    console.log(data);

    // Voice synthesis setup
    const synth = window.speechSynthesis;

    let messageToSpeak = '';

    // Check the intent and perform actions accordingly
    if (data.intent === 'search') {
      console.log('Search Results:', data.productIds);
      messageToSpeak = 'Here are your search results.';
    } else if (data.intent === 'add_products_to_cart') {
      if (data.productIds && data.productIds.length > 0) {
        // Wait for all addToCart actions to complete
        await Promise.all(
          data.productIds.map(productId => {
            console.log(productId);
            return dispatch(addToCart(productId, 1));
          })
        );
        messageToSpeak = 'Sweater has been added to your cart.';

        // Navigate to the path after adding items to the cart
        if (data.path) {
          window.location.href = data.path;
        }
      } else {
        console.log('No products found to add to cart.');
        messageToSpeak = 'No products found to add to your cart.';
      }
    } else if (data.intent === 'navigate') {
      if (data.path) {
        messageToSpeak = `Okay, opening ${data.path.replace(/\//g, ' ')} page`;
        window.location.href = data.path;
      } else {
        console.log('Navigation path not provided.');
        messageToSpeak = 'Sorry, no navigation path was provided.';
      }
    } else {
      console.log('Unknown intent or action.');
      messageToSpeak = 'Sorry, I did not understand that.';
    }

    // Speak the message
    if (messageToSpeak) {
      const utterance = new SpeechSynthesisUtterance(messageToSpeak);
      synth.speak(utterance);
    }

  } catch (error) {
    console.error('Error processing request:', error.message);
  }
};

// import axios from 'axios';
// import { addToCart } from './cartActions';
// import { listProducts } from './productActions';

// export const handleUserRequest = async (userInput, dispatch, navigate) => {
//   try {
//     // Send the user input to the backend
//     const { data } = await axios.post('/api/agent', { userInput });
//     console.log(data);

//     // Voice synthesis setup
//     const synth = window.speechSynthesis;

//     let messageToSpeak = '';

//     // Check the intent and perform actions accordingly
//     if (data.intent === 'search') {
//       console.log('Search Results:', data.productIds);
//       messageToSpeak = 'Here are your search results.';
//     } else if (data.intent === 'add_products_to_cart') {
//       if (data.productIds && data.productIds.length > 0) {
//         // Wait for all addToCart actions to complete
//         await Promise.all(
//           data.productIds.map(productId => {
//             console.log(productId);
//             return dispatch(addToCart(productId, 1));
//           })
//         );
//         messageToSpeak = 'Products have been added to your cart.';

//         // Navigate to the path after adding items to the cart
//         if (data.path) {
//           // Delay navigation to allow the animation to complete
//           setTimeout(() => {
//             navigate(data.path); // Use client-side navigation
//           }, 5000); // Delay by 5 seconds (adjust this as necessary)
//         }
//       } else {
//         console.log('No products found to add to cart.');
//         messageToSpeak = 'No products found to add to your cart.';
//       }
//     } else if (data.intent === 'navigate') {
//       if (data.path) {
//         messageToSpeak = `Okay, opening ${data.path.replace(/\//g, ' ')}`;

//         // Delay navigation to allow the animation to complete
//         setTimeout(() => {
//           navigate(data.path); // Use client-side navigation
//         }, 5000); // Delay by 5 seconds (adjust this as necessary)
//       } else {
//         console.log('Navigation path not provided.');
//         messageToSpeak = 'Sorry, no navigation path was provided.';
//       }
//     } else {
//       console.log('Unknown intent or action.');
//       messageToSpeak = 'Sorry, I did not understand that.';
//     }

//     // Speak the message
//     if (messageToSpeak) {
//       const utterance = new SpeechSynthesisUtterance(messageToSpeak);
//       synth.speak(utterance);
//     }

//   } catch (error) {
//     console.error('Error processing request:', error.message);
//   }
// };
