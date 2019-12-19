const express = require('express');
const accountRouter = require('./accounts/accountsRouter')
const db = require('./data/dbConfig');

const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());
// server.use('/api/accounts',)

server.get("/", (req, res) => {
    res.json({ message: "Let's get going!" })
  })

  server.get("/api/accounts", async (req, res, next) => {
    try{
        res.json(await db.select('*').from('accounts'))
    } catch (err){
        next(err)
    }

})

server.get('/api/accounts/:id', async (req, res, next) => {
  try{
    res.json(await db
            .first('*')
            .from('accounts')
            .where('id', req.params.id))
  } catch (err){
    next(err)
}
})

server.post('/api/accounts', async (req, res, next) => {
    try{
      const payload = {
        name: req.body.name,
        budget: req.body.budget
      }
      const [id] = await db('accounts').insert(payload)
      res.json(await db('accounts').where('id', id).first())

    } catch (err){
      next(err)
  }
})

  server.use((err, req, res, next) => {
      console.log(err)
      res.status(500).json({
          message: 'Oh man the internet is broken.'
      })
  })




server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});