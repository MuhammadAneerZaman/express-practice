import express from "express";

const app = express();
app.use(express.json());

const port = 3000;

let teaData = [];
let id = 1;

// add tea method
app.post("/teas", async (req, res) => {
  try {
    const { name, price } = await req.body;
    let newTeaData = { id: id++, name, price };
    teaData.push(newTeaData);
    return res.status(200).send(newTeaData);
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).send("Something went wrong");
  }
});
// Get tea method
app.get("/teas", (req, res) => {
  return res.json(teaData);
});

// Get a tea method
app.get("/teas/:id", (req, res) => {
  try {
   const tea = teaData.find(tea => tea.id === parseInt(req.params.id));
   if(!tea) return res.status(404).send("Teas not found")
    return res.json(tea);
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).send("Something went wrong");
  }
});

// update the tea Data
app.put("/teas/:id", (req, res) => {
    
  try {
    const id = req.params.id;
    console.log(id);
    console.log(teaData);
    
    const newTeaData = teaData.find((item) => {
        console.log(item);
        
      return item.id === parseInt(id);
    });
    if (!newTeaData) {
      return res.status(404).send("Tea not found");
    }
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).send("Please provide name and price");
    }
    newTeaData.name = name;
    newTeaData.price = price;

    return res.status(200).send("Updated Tea Data");
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).send("Something went wrong");
  }
});

// Delete tea method
app.delete("/teas/:id", (req, res) => {
  try {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id));
    if(index === -1){
      return res.status(404).send("Tea not found");
    };
    teaData.splice(index, 1);
    return res.status(200).send("Tea deleted successfully");
  } catch (error) {
    console.log("Something went wrong", error);
    return res.status(500).send("Something went wrong");
    
  }
});

app.listen(port, () => {
  console.log(`Serving on ${port}`);
});

