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

app.post('/api/users', (req, res, next) => {
  const { userName } = req.body;

  if (!userName) {
    throw new ClientError(400, 'Invalid input');
  } else if (userName.length < 7 && userName.length >= 1) {
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

// ADDING A DELETE REQUEST

app.delete('/api/users/:userId', (req, res, next) => {
  const id = Number(req.params.userId);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      error: 'Invalid input'
    });
  } else {
    const sql = `
      delete
        from "users"
       where "userId" = $1
       returning *
    `;

    const params = [id];

    db.query(sql, params)
      .then(result => {
        const user = result.rows[0];

        if (!user) {
          res.status(404).json({
            error: 'Invalid input'
          });
        } else {
          res.status(204).json(user);
        }
      })
      .catch(err => next(err));
  }

});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
