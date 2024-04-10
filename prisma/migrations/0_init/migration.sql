-- CreateTable
CREATE TABLE "patient" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "body_temperatures" TEXT NOT NULL
);

