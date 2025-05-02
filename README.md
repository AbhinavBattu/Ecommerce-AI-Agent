# 🧠 AI-Powered Website Agent for the Visually Impaired

This project was developed during the **Walmart Hackathon** to enable visually impaired users to interact with e-commerce websites entirely through voice commands. The system allows users to **browse pages, search for products, and manage their shopping cart**, all without needing to use a keyboard or mouse—replicating the convenience and guidance of an in-store experience.

Powered by a custom **Named Entity Recognition (NER)** model for intelligent input parsing and **Gemini AI** for executing context-aware actions, this solution offers an inclusive, real-time shopping assistant.

---

## 🎥 Video Demonstration

Watch the complete walkthrough of the voice-based shopping assistant in action:

📺 **[Click here to watch the demo](https://youtu.be/w8aktuhUlwk)**  
---

## ✨ Key Features

- 🎙️ **Voice-Driven Interaction** – Navigate the website, search products, and control the cart using natural spoken language.  
- 🔍 **Custom NER Model** – Extracts intent and key entities (e.g., product names, categories) from user input for accurate action mapping.  
- 🧠 **Gemini-Powered Logic** – Executes actions such as browsing, searching, or adding to cart based on interpreted voice commands.  
- 🛒 **Cart Management** – Add, remove, or view items in your cart without manual input.  
- 🔊 **Real-Time Feedback** – Voice and visual responses guide users at each step to ensure accessibility and clarity.

---

## 🛠️ Tech Stack

| Technology          | Purpose                                      |
|---------------------|----------------------------------------------|
| **React.js**         | Frontend for UI interaction                  |
| **Node.js + Express**| Backend API and action controller            |
| **Python**           | NER model for speech entity extraction       |
| **Gemini API**       | Natural language processing & action mapping |
| **Web Speech API**   | Voice input and speech recognition           |
| **MongoDB**          | Product and session data storage             |
| **Tailwind CSS**     | Accessible, responsive design styling        |

---

## 🧪 Sample Use Cases

**🗣 "Search for Bournvita"**  
→ The assistant opens the search page with Bournvita results.

**🗣 "Add Parle-G to my cart"**  
→ The system locates the product and adds it to the cart.

**🗣 "Go to my cart"**  
→ Redirects the user to the cart page.

---

## 🧰 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/YourUsername/ai-website-agent.git
cd ai-website-agent

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

# Run development environment
npm run dev
