import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // return res.status(500).json();

  const fileContent = await fs.readFile("./data/places.json");
 
  // marim data body ne kete form: [{},{},...,{}]
  const placesData = JSON.parse(fileContent);


  // duke e bashkagjitur body ne response 200 ne formen: { places: [{},{},...,{}] }
  res.status(200).json({ places: placesData });
});

// get array data i cili ne fillim eshte bosh: like []
app.get("/user-places", async (req, res) => { 
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
 
  const placeId = req.body.placeId; // marim id nga placeId: place.id,

  //  return res.status(500).json();

  // marim array nga places.json i cili mbart te dhena 
  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent); // e kthejme ne json body

  // i bejme nje filter id, sepse places.json jan te njeta data qe i dergojme ne front, ku useri shtyp nje foto,
  // e cila perfaqeson nje objekte ku ne e testojme ketu, nese objekti ka te njejten id. 
  // eshte thjesht nje kontroll 
  const place = placesData.find((place) => place.id === placeId);

  // user-places.json premban nje array, i cili updeton te dhena sa here qe shtojme objektet brenda tij ose i fshim
  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent); 

  let updatedUserPlaces = userPlacesData;

  // nese place.id ekzizton ne id objet te array userPlacesData nuk e shtojme.
  // sepse nuk duam qe te shtojme objekte te njejta ne array userPlacesData
  if (!userPlacesData.some((p) => p.id === place.id)) {  // duam qe array userPlacesData ti ket objektet unike
    updatedUserPlaces = [...userPlacesData, place]; 
  }

 await fs.writeFile("./data/user-places.json",JSON.stringify(updatedUserPlaces)); // updetojme array 'user-places.json' me vlera

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id; // marim id 

  // return res.status(500).json();

  // marim array i cili updetohet atomatikisht nga te objektet qe shtojme ose fshim 
  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  // gjejme objektin nga id 
  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {// nese array.length eshte me i madh se zero lexojme loop in
    updatedUserPlaces.splice(placeIndex, 1); // vshim objektin nga array i updetushem 
  }

   await fs.writeFile("./data/user-places.json",JSON.stringify(updatedUserPlaces)); // updetojme array 'user-places.json' duke fshir vlerat

  // dhe e bejme response ne front
  res.status(200).json({ userPlaces: updatedUserPlaces }); 
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
