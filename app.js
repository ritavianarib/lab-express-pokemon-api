const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();
app.use(express.json())
// -- Define your route listeners here! --

app.get('/pokemon', (req, res) => {

    return res.status(200).json(allPokemon)
})

app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params
    console.log(typeof id) //string

    const onePokemon = allPokemon.find((currentElement) => currentElement.id === Number(id))

    return res.status(200).json(onePokemon)
})

app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params

    const pokemonToDelete = allPokemon.find((currentElement) => currentElement.id === Number(id))
    const index = allPokemon.indexOf(pokemonToDelete)
    allPokemon.splice(index, 1)

    return res.status(200).json(pokemonToDelete)
})

app.post('/pokemon/create', (req, res) => {
    const newPokemon = {
        ...req.body,
        id: 400
    }

    allPokemon.push(newPokemon)

    return res.status(201).json(newPokemon)
})

app.put('/pokemon/:id', (req, res) => {
    const { id } = req.params

    let putPokemon = allPokemon.find((currentElement) => currentElement.id === Number(id))

    const index = allPokemon.indexOf(putPokemon)
    allPokemon[index] = {
        ...putPokemon,
        ...req.body
    }

    return res.status(200).json(allPokemon.find((currentElement) => currentElement.id === Number(id)))
})

app.get('/search/:search', (req, res) => {
    const { search } = req.params
    const pokemon = allPokemon.find((element) => element.name === search)

    return res.status(200).json(pokemon)
})

app.get('/search', (req, res) => {
    console.log(req.query)



    return 
})


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
