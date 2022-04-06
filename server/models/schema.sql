DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"chapter_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("email")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "chapter_items";
CREATE TABLE "chapter_items" (
	"_id" serial NOT NULL,
	"chapter_id" integer NOT NULL,
	"item_id" integer NOT NULL UNIQUE,
	"total_received" integer NOT NULL,
	CONSTRAINT "chapter_items_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "chapters";
CREATE TABLE "chapters" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" integer NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"latitude" DECIMAL NOT NULL,
	CONSTRAINT "chapters_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "items";
CREATE TABLE "items" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"total_needed" integer,
	"total_received" integer NOT NULL,
	"category" varchar(255) NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id");
ALTER TABLE "chapter_items" ADD CONSTRAINT "chapter_items_fk0" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id");
ALTER TABLE "chapter_items" ADD CONSTRAINT "chapter_items_fk1" FOREIGN KEY ("item_id") REFERENCES "items"("id");




