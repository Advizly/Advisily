**do later:**

1. check freuqently searched data and add indexes.
2. protect against injection.
3. do something for the courses with variable number of credits.

**Aletered tables**

1.  ALTER TABLE users ADD COLUMN advisingSessionId INT NULL;
2.  CREATE TABLE standings(
    standingId INT NOT NULL,
    standing varchar(127) NOT NULL,
    PRIMARY KEY(standingId)
    )ENGINE = InnoDB;

ALTER TABLE users ADD COLUMN standingId INT NULL;

ALTER TABLE users ADD CONSTRAINT fk_users_standing_1 FOREIGN KEY (`standingId`)
REFERENCES advisily.standings(`standingId`)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE users ADD COLUMN semesterNumber INT NULL;
