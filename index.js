import express from 'express'
import { connectDB } from './DB/dbConnection.js'
import routers from './src/modules/product/product.routes.js';
import cors from 'cors';
import aiWebhookRouts from './src/services/callAi.js';
const app = express()
const port = process.env.PORT || 3000

app.use(cors());

app.use(express.json())

connectDB()

app.use("/", routers)
app.use('/', aiWebhookRouts)

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Invalid requests"
  })
})


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message })
})

app.listen(port, () => console.log(`chatbot listening on port ${port}!`))