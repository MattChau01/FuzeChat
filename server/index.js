require('dotenv/config');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const socketEvents = require('./socket-events');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const pg = require('pg');

const db = new pg.Pool({
  connectionString: `${process.env.DATABASE_URL}`,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleWare = express.json();
const server = http.Server(app);

app.use(staticMiddleware);
app.use(jsonMiddleWare);
app.use(errorMiddleware);

const io = socket(server);
socketEvents(io);

io.on('connection', socket => {

  socket.on('chat', chat => {
    io.emit('chat', chat);
  });

});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// app.get('/api/messages', (req, res) => {
//   req.io.emit('message', {
//     type: 'text',
//     text: 'messaged sent'
//   });
//   res.json({
//     msg: 'msg endpoint'
//   });
// });

// Retrieves timestamp ( THIS ONE WORKING )
app.get('/api/messages', (req, res, next) => {

  const pst = '"createdAt" at time zone \'America/Los_Angeles\'';

  const sql = `
    select "newMessage", (to_char(${pst}, 'HH24:MI')) as timestamp, "userId"
      from "messages"
    where "createdAt" = (
      select max("createdAt")
      from "messages"
    )
  `;

  db.query(sql)
    .then(result => {
      const message = result.rows;
      res.json(message);
    })
    .catch(err => next(err));
});

// TEST: RETRIEVE TIMESTAMP WHERE MESSAGE = 'STRING'
// app.get('/api/messages/:message', (req, res, next) => {

//   const { message } = req.body;
// const pst = '"createdAt" at time zone \'America/Los_Angeles\'';
// (to_char(${pst}, 'HH24:MI')) as timestamp

//   const sql = `
//     select "createdAt", "userId"
//       from "messages"
//     where "newMessage" = $1
//   `;

//   const params = [message];

//   db.query(sql, params)
//     .then(result => {
//       const message = result.rows;
//       res.json(message);
//     })
//     .catch(err => next(err));
// });

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

app.get('/api/chatRooms', (req, res, next) => {
  const sql = `
    select *
    from "chatRooms"
  `;

  db.query(sql)
    .then(result => {
      const roomsList = result.rows;
      res.json(roomsList);
    })
    .catch(err => next(err));
});

app.get('/api/usersInChat', (req, res, next) => {
  const sql = `
    select "joinedChatAt" from "usersInChat"
    order by "numberOfUsers" desc
    limit 1
  `;

  db.query(sql)
    .then(result => {
      const joinedAt = result.rows[0];
      res.json(joinedAt);
    })
    .catch(err => next(err));
});

app.post('/api/messages', (req, res, next) => {
  const { newMessage, chatRoomName, userName } = req.body;

  if (!newMessage || !chatRoomName || !userName) {
    throw new ClientError(400, 'Invalid input');
  }

  const sql = `
    insert into "messages" ("newMessage", "chatRoomId", "userId")
    values (
      $1,
      (select "chatRoomId" from "chatRooms" where "chatRoomName" = $2),
      (select "userId" from "users" where "userName" = $3)
    )
  `;

  const params = [newMessage, chatRoomName, userName];

  db.query(sql, params)
    .then(result => {

      res.status(201).json(result);
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

app.post('/api/usersInChat', (req, res, next) => {
  const { chatRoomName, userName } = req.body;

  if (!chatRoomName || !userName) {
    throw new ClientError(400, 'Invalid input!');
  }

  const sql = `
    insert into "usersInChat" ("chatRoomId", "userId")
      values (
      (select "chatRoomId" from "chatRooms" where "chatRoomName" = $1),
      (select "userId" from "users" where "userName" = $2))
    returning *
  `;

  const params = [chatRoomName, userName];

  db.query(sql, params)
    .then(result => {
      const active = result.rows[0];
      res.status(201).json(active);
    })
    .catch(err => next(err));

});

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

server.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
