import express from 'express'
import { concatName }  from '@monorepo/library'

export const application: express.Express = express()

application.get('/', (req, res) => {
  const name = req.query.name as string;
  const surname = req.query.surname as string;
  res.send(`Hello ${concatName(name, surname)}!`)
})

export function start() {
  return application.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })
} 
