insert into "users" (
  "userName")
values (
  'UserOne'
);

-- INSERT INTO CHATROOMS
insert into "chatRooms" (
  "chatRoomName")
  values
  ('rc1022');

-- INSERT INTO USERSINCHAT
insert into "usersInChat" ("userId", "chatRoomId")
values (1, 1);

-- INSERT INTO MESSAGES
insert into "messages" ("newMessage", "chatRoomId", "userId")
values ('this is a test message', 1, 1);
