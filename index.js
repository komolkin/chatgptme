// a express server, which will handle api requests coming in and respond back with a json object, it will use a body parser as well as cors

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-9WevQbvggItOcNJtMQyQhS4L",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 10,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
