require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgresql://dev:dev@localhost/fuzeChat',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleWare = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleWare);

// GET REQUEST
app.get('/api/users', (req, res, next) => {
  const sql = `
    select *
    from "users"
  `;

  db.query(sql)
    .then(result => {
      const usersList = result.rows;
      res.json(usersList);
    })
    .catch(err => next(err));
});

// POST REQUEST
app.post('/api/users', (req, res, next) => {
  const { userName } = req.body;
  // console.log('req body: ', req.body);
  // console.log('userName: ', userName);

  if (!userName) {
    throw new ClientError(400, 'Invalid input');
  }

  const sql = `
    insert into "users" ("userName", "createdAt")
    values ($1, CURRENT_TIMESTAMP)
    returning *
  `;

  const params = [userName];

  db.query(sql, params)
    .then(result => {
      const newUser = result.rows[0];
      res.status(201).json(newUser);
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
