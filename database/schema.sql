set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."chatRooms" (
	"chatRoomName" TEXT NOT NULL UNIQUE,
	"chatRoomId" serial NOT NULL,
	CONSTRAINT "chatRooms_pk" PRIMARY KEY ("chatRoomId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messages" (
	"newMessage" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	"entryId" serial NOT NULL,
	"chatRoomId" integer NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersInChat" (
	"numberOfUsers" serial NOT NULL,
	"joinedChatAt" timestamptz(6) NOT NULL default now(),
	"chatRoomId" integer NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("chatRoomId") REFERENCES "chatRooms"("chatRoomId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "usersInChat" ADD CONSTRAINT "usersInChat_fk0" FOREIGN KEY ("chatRoomId") REFERENCES "chatRooms"("chatRoomId");
ALTER TABLE "usersInChat" ADD CONSTRAINT "usersInChat_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
