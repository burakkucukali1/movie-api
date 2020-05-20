const express = require('express');
const router = express.Router();

// Models 
const Movie = require('../models/Movie')


router.get('/', (req, res, next) => {
     const promise = Movie.find({});
     promise.then((data) => {
          res.json(data);
     }).catch((err) => {
          res.json(err)
     })
})

// Between

router.get('/between/:start_year/:end_year', (req, res, next) => {
     const {start_year,end_year} = req.params
     const promise = Movie.find(
          {
               year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year) } //gte deki e yi silersen aynı tarihleri vermez graterthan anlamında littlethen 

          })
     promise.then((data) => {
          res.json(data)
     }).catch((err) => {
          res.json(err)
     })
})


// Top 10 list
// top10 kısmını :movie_id olarak algıuladığı için hata verebilir bunu düzeltmek için bu route u üste almak gerekir.
router.get('/top10', (req, res, next) => {
     const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 })
     promise.then((data) => {
          res.json(data)
     }).catch((err) => {
          res.json(err)
     })
})

router.put('/:movie_id', (req, res, next) => {
     const { movie_id } = req.params
     const promise = Movie.findByIdAndUpdate(movie_id, req.body, { new: true })
     promise.then((updatedData) => {
          res.json(updatedData)

     }).catch((err) => {
          res.json(err)
     })


})
router.delete('/:movie_id', (req, res, next) => {
     const { movie_id } = req.params
     const promise = Movie.findByIdAndRemove(movie_id)
     promise.then((data) => {
          res.json("Deleted")
          console.log(data + " deleted")
     }).catch((err) => {
          res.json(err)
     })
})

router.get('/:movie_id', (req, res, next) => {
     const { movie_id } = req.params
     const promise = Movie.findById(movie_id)
     promise.then((data) => {
          res.json(data)
     }).catch((err) => {
          res.json(err)
     })
})

router.post('/', (req, res, next) => {
     const { title, imdb_score, year, country, category } = req.body;

     const movie = new Movie({ //req.body diyere bütün data gönderilebilir.
          title: title,
          imdb_score: imdb_score,
          category: category,
          year: year,
          country: country
     })
     // movie.save((err, data) => {
     //      if (err)
     //           res.json(err);
     //      res.json(data)

     // }) Alttaki gösterimle aynı anlamada ama bu gösterim daha ilkeldir.
     const promise = movie.save();
     promise.then((data) => {
          res.json(data);
     }).catch((err) => {
          res.json(err)
     })
})



module.exports = router;