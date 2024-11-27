# Chatbot Inventory Management System

This Chatbot Inventory Management System allows users to perform CRUD operations on products through a chatbot interface, making it easier to manage your inventory interactively. You can add, update, delete, and view products in stock using simple conversational commands.

# Front end repository
https://github.com/Aturkii/chatbot-interface


---

## Table of Contents
1. [Overview](#overview)
2. [How Inventory Works](#how-inventory-works)
3. [Usage Instructions](#usage-instructions)
4. [Commands List](#commands-list)
5. [Architecture](#architecture)
6. [Deployment](#deployment)
7. [Troubleshooting Guide](#troubleshooting-guide)

---

## Overview

This system leverages **Dialogflow** for natural language understanding, allowing users to interact with an AI-powered chatbot. The backend handles the storage of product data in a database, and the chatbot interface facilitates easy product management without requiring users to access a traditional admin panel. Users can manage their inventory with simple conversational commands.

---

## How Inventory Works

The inventory management system stores product data including:
- **Product Name**
- **Quantity**
- **Price**

Whenever the user adds, updates, or deletes a product, the inventory is updated accordingly in the database. The bot interacts with the backend API to perform CRUD operations (Create, Read, Update, Delete) on the inventory based on the user's input.

---

## Usage Instructions

Once deployed, the chatbot can be accessed through your preferred messaging platform (e.g., Facebook Messenger, Slack, etc.), where users will interact by typing simple commands.

1. **Start a conversation with the bot**.
2. **Use the commands listed below** to perform actions like adding, viewing, updating, or deleting products.

---

## Commands List

### 1. Add a Product
To add a product to your inventory, type:
Add a product
The chatbot will ask for the following information:
- **Product Name**: You provide the name of the product.
- **Quantity**: You provide the quantity.
- **Price**: You provide the price.

Once all information is received, the chatbot will confirm the product addition.

### 2. Get All Products in Stock
To view all products in stock, type:
What is in stock?
The chatbot will display a list of all products with their respective quantity and price.

### 3. Delete a Product
To remove a product from the inventory, type:
I want to delete a product
The chatbot will prompt you to specify the **product name** to be removed. After you provide the name, the product will be deleted from the inventory.

### 4. Update a Product
To update an existing product, type:
I want to update a product
The chatbot will ask:
- **Product Name**: You provide the name of the product.
- **Update Information**: Specify what details (e.g., quantity or price) you want to update.

Once the update details are provided, the chatbot will confirm the changes.

---

## Architecture

The architecture of the chatbot consists of the following components:

### 1. **Dialogflow (AI Layer)**:
- Dialogflow handles user inputs and processes natural language commands. It is integrated with the backend to trigger CRUD operations.
- **Intent Handling**: Each command (e.g., adding a product, updating, deleting) corresponds to an intent in Dialogflow, triggering different backend functions.

### 2. **Backend (API Layer)**:
- The backend is responsible for handling CRUD operations on the inventory. It communicates with a database (e.g., MongoDB, MySQL) to store product data.
- **Node.js / Express**: The backend is built with Node.js and Express for handling API requests.
- **Database**: A relational or NoSQL database stores product details.

### 3. **Frontend**:
- The frontend could be any messaging platform (e.g., Facebook Messenger, WhatsApp, Slack) that connects to Dialogflow for the user interface.
- Users interact with the chatbot through these platforms.

### 4. **Flow of Interaction**:
- **User Input**: The user sends a message (e.g., "Add a product").
- **Dialogflow**: Dialogflow processes the intent and asks for more details (e.g., product name, quantity).
- **Backend**: The backend processes the received data and updates the database accordingly.
- **Response**: The chatbot confirms the action (e.g., "Product added successfully").

---

## Deployment

Follow these steps to deploy the Chatbot Inventory Management System on **Heroku**:

1. **Clone the repository**:
git clone <repository-url> cd chatbot-inventory

2. **Set up environment variables**:
Create a `.env` file in the root directory with the necessary configuration such as:
- Dialogflow API credentials
- Database connection details

3. **Install dependencies**:
npm install

4. **Deploy to Heroku**:
- Create a new app on [Heroku](https://www.heroku.com/).
- Set up the **Heroku CLI** and login to your account:
  ```
  heroku login
  ```
- Create a new Heroku application:
  ```
  heroku create <app-name>
  ```
- Push the code to Heroku:
  ```
  git push heroku main
  ```

5. **Open the app**:
After deployment, open your app on Heroku:
heroku open

---

## Troubleshooting Guide

### 1. Common Setup Issues:
- **Missing Environment Variables**: Ensure all required variables (e.g., Dialogflow credentials, database URL) are set in the `.env` file.
- Check if **Dialogflow** is properly configured.
- Ensure the database is accessible from the Heroku app.

### 2. Integration Challenges:
- **Dialogflow Integration Issues**: If Dialogflow does not respond as expected, ensure that your webhook (backend API) is correctly configured in the Dialogflow console.
- **API Errors**: If the bot is not adding or updating products, check the backend logs for any issues related to database operations or API endpoints.

### 3. Resolving Database Connection Issues:
- Ensure that your **database URL** and credentials are correct.
- For MongoDB, check if you're using the correct connection string.
- If using MySQL, make sure the database tables exist and match the expected structure.

---

By following this README, you should be able to effectively use and deploy the **Chatbot Inventory Management System**. If you encounter any issues, please refer to the **Troubleshooting Guide** or check the **logs** for detailed error messages.
