import express from 'express'
import { connectDB } from './DB/dbConnection.js'
import routers from './src/modules/product/product.routes.js';
import cors from 'cors';
import axios from "axios";
import bodyParser from 'body-parser';

const backendURL = process.env.BACKEND_URL || 'http://localhost:3000';
const app = express()
const port = process.env.PORT || 3000

app.use(cors());

app.use(express.json())
app.use(bodyParser.json());
connectDB()

app.use("/", routers)


app.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  try {
    //^ Fetching all products
    if (intentName === 'Get Products Intent') {
      const { data: products } = await axios.get(backendURL);

      if (products.length !== 0) {
        return res.status(200).json({
          fulfillmentText: `Here are the available products in stock: ${products.map(p => p.name).join(', ')}`,
        });
      } else {
        return res.status(404).json({
          fulfillmentText: "There are no products available in stock right now.",
        });
      }
    }

    //^ Adding a product
    if (intentName === 'Add Product Intent') {
      const { productName, quantity, price } = req.body.queryResult.parameters;

      const response = await axios.post(backendURL, { productName, quantity, price });

      if (response.status === 200) {
        return res.status(201).json({
          fulfillmentText: `Product "${productName}" has been added successfully with quantity ${quantity} and price ${price}.`,
        });
      } else {
        return res.status(409).json({
          fulfillmentText: "There was an error adding the product. Please try again.",
        });
      }
    }

    //^ Updating a product
    if (intentName === 'Update Product Intent') {
      const { productName, quantity, price } = req.body.queryResult.parameters;

      const response = await axios.put(`${backendURL}`, { productName, quantity, price });

      if (response.data.success) {
        return res.status(200).json({
          fulfillmentText: `The product "${productName}" has been successfully updated with quantity ${quantity} and price ${price}.`,
        });
      } else {
        return res.status(409).json({
          fulfillmentText: `Sorry, I couldn't update the product "${productName}". Please try again later.`,
        });
      }
    }

    //^ Deleting a product
    if (intentName === 'Delete Product Intent') {
      const { productName } = req.body.queryResult.parameters;

      if (!productName) {
        return res.json({
          fulfillmentText: "Please specify the product name to delete.",
        });
      }

      const response = await axios.delete(`${backendURL}`, { data: { productName } });

      if (response.data.success) {
        return res.json({
          fulfillmentText: `The product "${productName}" has been successfully deleted.`,
        });
      } else {
        return res.json({
          fulfillmentText: `Sorry, I couldn't delete the product "${productName}". Please try again later.`,
        });
      }
    }
  } catch (err) {
    console.error("Error in webhook:", err.message || err);
    return res.status(500).json({
      fulfillmentText: "An error occurred while processing your request. Please try again later.",
    });
  }
});


app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Invalid requests"
  })
})


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message })
})

app.listen(port, () => console.log(`chatbot listening on port ${port}!`))