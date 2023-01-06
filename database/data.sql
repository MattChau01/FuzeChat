insert into "users" (
  "userName")
values (
  'UserOne'
);

-- INSERT INTO CHATROOMS
insert into "chatRooms" (
  "chatRoomName")
  values
  ('rc1022'),
  ('lfz2022'),
  ('zoomuni');

-- INSERT INTO USERSINCHAT
insert into "usersInChat" ("userId", "chatRoomId")
values (1, 3);

-- INSERT INTO MESSAGES
insert into "messages" ("newMessage", "chatRoomId", "userId")
values ('this is a test message', 1, 1);
