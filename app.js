const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const cors = require('cors');


app.use(express.static("frontend"));

app.use(cors({
  origin: 'http://localhost:4200'
}));

// Allow specific methods and headers
app.use(cors({
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send("hola")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
async function authenticationArtsy() {
    const url = 'https://api.artsy.net/api/tokens/xapp_token'
    const data = {'client_id': '280c0b1ebf3cb0bd3767', 
    'client_secret': 'b97113d9063a573004c0620fd40517ce'}
    const res = await axios.post(url, data);
    const token = res.data.token;
  return token;
}
app.get('/search',(req, res) =>  {
  authenticationArtsy().then((token) => {
    axios.get("https://api.artsy.net/api/search", {params : {"q": req.query.name, size: 10}, 
    headers:{'X-XAPP-Token' : token}}).then((search) => {
      res.send(search.data._embedded.results);
    }).catch(error => {
      // Handle the error
      console.error(error);
    });
  })   
})
app.get('/artist',(req, res) =>  {
  authenticationArtsy().then((token) => {
    axios.get("https://api.artsy.net/api/artists/" + req.query.id, 
    {headers:{'X-XAPP-Token' : token}}).then((artist) => {
      res.send(artist.data);
    }).catch(error => {
      // Handle the error
      console.error(error);
    });
  })   
})
app.get('/artworks',(req, res) =>  {
  authenticationArtsy().then((token) => {
    axios.get("https://api.artsy.net/api/artworks", 
    {params : {"artist_id": req.query.id, size: 10}, 
    headers:{'X-XAPP-Token' : token}}).then((artworks) => {
      res.send(artworks.data._embedded.artworks);
    }).catch(error => {
      // Handle the error
      console.error(error);
    });
  })   
})
app.get('/genes',(req, res) =>  {
  authenticationArtsy().then((token) => {
    axios.get("https://api.artsy.net/api/genes", 
    {params : {"artwork_id": req.query.id, size: 10}, 
    headers:{'X-XAPP-Token' : token}}).then((genes) => {
      res.send(genes.data._embedded.genes);
    }).catch(error => {
      // Handle the error
      console.error(error);
    });
  })   
})

async function genesArtsy() {
  id = "515b0f9338ad2d78ca000554"
  url = "https://api.artsy.net/api/genes"
  //const token = await authenticationArtsy();
  await axios.get(url, {params : {"artwork_id": id}, headers:{'X-XAPP-Token' : token}}).then(function(response) {
    console.log("success", response.data._embedded.genes);
  })
  .catch(function(error) {
    console.log("error occurred", error);
  })
}
async function artistsArtsy() {
  id = "4d8b928b4eb68a1b2c0001f2"
  url = "https://api.artsy.net/api/artists/" + id
  //const token = await authenticationArtsy();
  await axios.get(url, {headers:{'X-XAPP-Token' : token}}).then(function(response) {
    console.log("success", response.data);
  })
  .catch(function(error) {
    console.log("error occurred", error);
  })
}
async function artworksArtsy() {
  id = "4d8b928b4eb68a1b2c0001f2"
  url = "https://api.artsy.net/api/artworks"
  //const token = await authenticationArtsy();
  await axios.get(url, {params : {"artist_id": id, size: 10}, headers:{'X-XAPP-Token' : token}}).then(function(response) {
    console.log("success", response.data._embedded.artworks);
  })
  .catch(function(error) {
    console.log("error occurred", error);
  })
}





