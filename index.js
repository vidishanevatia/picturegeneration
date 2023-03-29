// This is for an express server -
// it is for my backend server 
// where the api requests will be coming 
// and will be responding back with a json object, 
// it will user body parser as well as cors.  

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const configuration = new Configuration({
    organization: "YOUR_ORG_KEY",
    apiKey: "YOUR_API_KEY",
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.post('/', async (req,res) => {
    const { message } = req.body;
    const response = await openai.createImage({
        prompt: `${message}`,
        n: 1,
        size: "512x512",
      });
      console.log(response.data)
        if(response.data.data[0].url) {
            res.json({
                message: response.data.data[0].url
            });
        }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




