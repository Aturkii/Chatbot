import axios from "axios";
import { Router } from "express";
const backendURL = process.env.BACKEND_URL || 'http://localhost:3000';

const router = Router();
//& Google Cloud Ai Dialogflow API webhook

router.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  //* Fetching all products
  try {
    if (intentName === 'Get Products intent') {
      const { data } = await axios.get(backendURL);
      const products = data;

      if (products.length !== 0) {
        return res.status(200).json({
          fulfillmentText: `Here are the available products in stock.`,
          ...products
        });
      } else {
        return res.status(404).json({
          fulfillmentText: "There are no products available in stock right now."
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Error", err });
  }

  //* Adding a product
  try {
    if (intentName === 'Add Product intent') {
      const { productName, quantity, price } = req.body.queryResult.parameters;

      const response = await axios.post(backendURL, {
        productName,
        quantity,
        price
      });

      if (response.status === 200) {
        return res.status(201).json({
          fulfillmentText: `Product "${productName}" has been added successfully with quantity ${quantity} and price ${price}.`
        });
      } else {
        return res.status(409).json({
          fulfillmentText: "There was an error adding the product. Please try again."
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      fulfillmentText: "Sorry, there was an error while adding the product. Please try again later."
    });
  }

  //* Updating a product
  try {
    if (intentName === 'Update Product Intent') {
      const { productName, quantity, price } = req.body.queryResult.parameters;

      const response = await axios.put(`${backendURL}`, {
        productName,
        quantity,
        price
      });

      if (response.data.success) {
        return res.status(200).json({
          fulfillmentText: `The product "${productName}" has been successfully updated with quantity ${quantity} and price ${price}.`
        });
      } else {
        return res.status(409).json({
          fulfillmentText: `Sorry, I couldn't update the product "${productName}". Please try again later.`
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      fulfillmentText: "An error occurred while processing your request. Please try again later."
    });
  }

  //* Deleting a product
  try {
    if (intentName === 'Delete Product Intent') {
      const { productName } = req.body.queryResult.parameters;

      if (!productName) {
        return res.json({
          fulfillmentText: "Please specify the product name to delete."
        });
      }

      const response = await axios.delete(`${backendURL}`, {
        data: { productName }
      });

      if (response.data.success) {
        return res.json({
          fulfillmentText: `The product "${productName}" has been successfully deleted.`
        });
      } else {
        return res.json({
          fulfillmentText: `Sorry, I couldn't delete the product "${productName}". Please try again later.`
        });
      }
    }
  } catch (err) {
    console.error("Error in webhook:", err);
    return res.json({
      fulfillmentText: "An error occurred while processing your request. Please try again later."
    });
  }
});

export default router;