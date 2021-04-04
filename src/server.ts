import express from "express";
import rateLimiter from "../middlewares/rateLimiter";

const app = express();

app.use(rateLimiter);

app.get("/", (request, response) => {
  return response.json({message: "This is a DDoS prevention test"});
});

app.listen(3333, () => {
  console.log("Server is running!");
})