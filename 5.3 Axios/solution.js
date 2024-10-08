import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Declaring a function as async tells JavaScript that the function will return a promise, regardless of what's returned inside the function.If the function returns a value, JavaScript wraps it in a resolved promise.i.e resolve(value)
// If the function throws an error, it wraps it in a rejected promise. i.e reject(error)

app.get("/", async (req, res) => {
  try {
//     await can only be used inside an async function.
// It pauses the execution of the async function until the promise is resolved or rejected.
// Once the promise is resolved, it returns the result (the value passed to resolve).
// If the promise is rejected, it throws the error, which you can handle using try/catch. E.G 
// async function fetchData() {
//   const data = await someAsyncCall();
//   console.log(data); // Only runs after someAsyncCall is resolved
// }
// Remember that await can only be used inside an async function, and that AXIOS returns a promise.
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
