require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

app.use( bodyParser.json() )
app.use( express.static(`${__dirname}/static`) )

app.get('/movies', getMovies)

async function getMovies(req,res) {
    const response = await axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.MOVIE_APP}`)
    
    const config_path = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.MOVIE_APP}`)
    
    const genre_data = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_APP}&language=en-US`)
    
    const result = {
        results: response.data.results,
        config_path: config_path.data.images,
        genre_data: genre_data.data.genres,
    }
    // console.log(result.results)
    if (response.status === 200) res.json(result);
    else res.json([]);
  }

const port = 3000
app.listen(port, () => console.log(`Service Running at: ${port}`))