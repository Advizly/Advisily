-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `advisily` ;

-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `advisily` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `advisily` ;

-- -----------------------------------------------------
-- Table `advisily`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses` (
  `courseId` INT NOT NULL AUTO_INCREMENT,
  `courseCode` INT NOT NULL,
  `courseTitle` VARCHAR(125) NULL DEFAULT NULL,
  `credits` TINYINT NULL DEFAULT '3',
  `prefix` VARCHAR(10) NOT NULL DEFAULT 'XXXX',
  PRIMARY KEY (`courseId`),
  UNIQUE INDEX `courseCode_departmendId_UNIQUE` (`courseCode` ASC, `prefix` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2346
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`standings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`standings` ;

CREATE TABLE IF NOT EXISTS `advisily`.`standings` (
  `standingId` INT NOT NULL AUTO_INCREMENT,
  `standing` VARCHAR(127) NOT NULL,
  `creditHrs` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`standingId`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`users` ;

CREATE TABLE IF NOT EXISTS `advisily`.`users` (
  `userId` INT NOT NULL,
  `firstName` VARCHAR(125) NOT NULL,
  `lastName` VARCHAR(125) NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isVerified` TINYINT(1) NOT NULL DEFAULT '0',
  `verificationToken` VARCHAR(225) NULL DEFAULT NULL,
  `passwordResetToken` VARCHAR(225) NULL DEFAULT NULL,
  `resetTokenExpire` TIMESTAMP NULL DEFAULT NULL,
  `isAdmin` TINYINT(1) NOT NULL DEFAULT '0',
  `standingId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `verificationToken_UNIQUE` (`verificationToken` ASC) VISIBLE,
  UNIQUE INDEX `passwordResetToken_UNIQUE` (`passwordResetToken` ASC) VISIBLE,
  INDEX `fk_users_standings1_idx` (`standingId` ASC) VISIBLE,
  CONSTRAINT `fk_users_standings1`
    FOREIGN KEY (`standingId`)
    REFERENCES `advisily`.`standings` (`standingId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`paces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`paces` ;

CREATE TABLE IF NOT EXISTS `advisily`.`paces` (
  `paceId` INT NOT NULL AUTO_INCREMENT,
  `paceTitle` VARCHAR(225) NULL DEFAULT NULL,
  PRIMARY KEY (`paceId`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`advisingsessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingsessions` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingsessions` (
  `advisingSessionId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL DEFAULT NULL,
  `overloadingCredits` TINYINT NULL DEFAULT '0',
  `summerCredits` TINYINT NULL DEFAULT '0',
  `winterCredits` TINYINT NULL DEFAULT '0',
  `sessionDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `generalElecCredits` INT NULL DEFAULT '0',
  `paceId` INT NULL DEFAULT '2',
  `semestersToPlan` INT NULL DEFAULT '1',
  `semesterNumber` INT NULL DEFAULT NULL,
  `exemptedCredits` INT NULL DEFAULT NULL,
  PRIMARY KEY (`advisingSessionId`),
  UNIQUE INDEX `advisingSessionId_UNIQUE` (`advisingSessionId` ASC) VISIBLE,
  UNIQUE INDEX `student_id_UNIQUE` (`userId` ASC) VISIBLE,
  INDEX `fk_advising_session_1_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_advising_sessions_2_idx` (`paceId` ASC) VISIBLE,
  CONSTRAINT `fk_advising_session_1`
    FOREIGN KEY (`userId`)
    REFERENCES `advisily`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_advising_sessions_2`
    FOREIGN KEY (`paceId`)
    REFERENCES `advisily`.`paces` (`paceId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1857
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`advisingresults`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingresults` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingresults` (
  `advisingSessionId` INT NOT NULL,
  `isLate` TINYINT(1) NULL DEFAULT '0',
  `shouldTakeWinter` TINYINT(1) NULL DEFAULT '0',
  `shouldTakeSummer` TINYINT(1) NULL DEFAULT '0',
  `isVerified` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`advisingSessionId`),
  INDEX `fk_AdvisingResults_advisingSessions1_idx` (`advisingSessionId` ASC) VISIBLE,
  CONSTRAINT `fk_AdvisingResults_advisingSessions1`
    FOREIGN KEY (`advisingSessionId`)
    REFERENCES `advisily`.`advisingsessions` (`advisingSessionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`advisingresultsemesters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingresultsemesters` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingresultsemesters` (
  `advisingSessionId` INT NOT NULL,
  `semesterNumber` INT NOT NULL,
  `generalElecCredits` INT NULL DEFAULT '0',
  `planType` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`advisingSessionId`, `semesterNumber`, `planType`),
  CONSTRAINT `fk_advisingResultSemesters_advisingResults2`
    FOREIGN KEY (`advisingSessionId`)
    REFERENCES `advisily`.`advisingresults` (`advisingSessionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`advisingresultcourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingresultcourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingresultcourses` (
  `courseId` INT NOT NULL,
  `semesterNumber` INT NOT NULL,
  `advisingSessionId` INT NOT NULL,
  `planType` INT NOT NULL DEFAULT '0',
  INDEX `fk_advising_result_courses_2_idx` (`courseId` ASC) VISIBLE,
  INDEX `fk_advisingResultCourses_advisingResultSemesters1_idx` (`advisingSessionId` ASC) VISIBLE,
  INDEX `planType` (`planType` ASC) VISIBLE,
  CONSTRAINT `fk_advising_result_courses_3`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_advisingResultCourses_advisingResultSemesters2`
    FOREIGN KEY (`advisingSessionId`)
    REFERENCES `advisily`.`advisingresultsemesters` (`advisingSessionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`majors` (
  `majorId` INT NOT NULL AUTO_INCREMENT,
  `majorTitle` VARCHAR(125) NULL DEFAULT NULL,
  `majorPrefix` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`majorId`))
ENGINE = InnoDB
AUTO_INCREMENT = 149
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`catalogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalogs` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalogs` (
  `catalogId` INT NOT NULL AUTO_INCREMENT,
  `majorId` INT NOT NULL,
  `year` VARCHAR(50) NOT NULL,
  `coreCredits` INT NULL DEFAULT NULL,
  `concReqCredits` INT NULL DEFAULT NULL,
  `concElecCredits` INT NULL DEFAULT NULL,
  `collateralCredits` INT NULL DEFAULT NULL,
  `generalElecCredits` INT NULL DEFAULT NULL,
  `engCoreCredits` INT NULL DEFAULT NULL,
  PRIMARY KEY (`catalogId`),
  UNIQUE INDEX `majorId_season_year` (`majorId` ASC, `year` ASC) VISIBLE,
  INDEX `fk_catalogs_1_idx` (`majorId` ASC) VISIBLE,
  CONSTRAINT `fk_catalogs_1`
    FOREIGN KEY (`majorId`)
    REFERENCES `advisily`.`majors` (`majorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 123457
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`coursetypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`coursetypes` ;

CREATE TABLE IF NOT EXISTS `advisily`.`coursetypes` (
  `courseTypeId` INT NOT NULL AUTO_INCREMENT,
  `courseType` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`courseTypeId`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`catalogcourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalogcourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalogcourses` (
  `catalogId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `courseTypeId` INT NULL DEFAULT NULL,
  INDEX `fk_catalog_courses_1` (`catalogId` ASC) VISIBLE,
  INDEX `fk_catalog_courses_2_idx` (`courseId` ASC) VISIBLE,
  INDEX `fk_catalog_courses_3_idx` (`courseTypeId` ASC) VISIBLE,
  CONSTRAINT `fk_catalog_courses_1`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_courses_2`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_courses_3`
    FOREIGN KEY (`courseTypeId`)
    REFERENCES `advisily`.`coursetypes` (`courseTypeId`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`courserequisites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courserequisites` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courserequisites` (
  `courseId` INT NOT NULL,
  `setId` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`setId`),
  UNIQUE INDEX `courseId_setId_UNIQUE` (`courseId` ASC, `setId` ASC) VISIBLE,
  INDEX `fk_courses_prerequisites_1_idx` (`courseId` ASC) VISIBLE,
  CONSTRAINT `fk_courses_prerequisites_1`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 85
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`minors` (
  `minorId` INT NOT NULL AUTO_INCREMENT,
  `minorTitle` VARCHAR(125) NULL DEFAULT NULL,
  PRIMARY KEY (`minorId`))
ENGINE = InnoDB
AUTO_INCREMENT = 53
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`plancourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`plancourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`plancourses` (
  `catalogId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `semesterNumber` INT NOT NULL,
  INDEX `fk_planCourses_2` (`catalogId` ASC) VISIBLE,
  INDEX `fk_planCourses_1_idx` (`courseId` ASC) VISIBLE,
  CONSTRAINT `fk_planCourses_1`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_planCourses_2`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`requisitetypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`requisitetypes` ;

CREATE TABLE IF NOT EXISTS `advisily`.`requisitetypes` (
  `requisiteTypeId` INT NOT NULL AUTO_INCREMENT,
  `requisiteType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`requisiteTypeId`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `advisily`.`requisitesets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`requisitesets` ;

CREATE TABLE IF NOT EXISTS `advisily`.`requisitesets` (
  `setId` INT NOT NULL,
  `requisiteId` INT NULL DEFAULT NULL,
  `requisiteTypeId` INT NULL DEFAULT NULL,
  INDEX `fk_requisiteSets_1_idx` (`requisiteId` ASC) VISIBLE,
  INDEX `fk_requisiteSets_3_idx` (`setId` ASC) VISIBLE,
  INDEX `fk_requisiteSets_2_idx` (`requisiteTypeId` ASC) VISIBLE,
  CONSTRAINT `fk_requisiteSets_1`
    FOREIGN KEY (`requisiteId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_requisiteSets_2`
    FOREIGN KEY (`requisiteTypeId`)
    REFERENCES `advisily`.`requisitetypes` (`requisiteTypeId`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_requisiteSets_3`
    FOREIGN KEY (`setId`)
    REFERENCES `advisily`.`courserequisites` (`setId`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`usercourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`usercourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`usercourses` (
  `userId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `finishedCredits` INT NOT NULL DEFAULT '3',
  INDEX `fk_user_courses_2_idx` (`courseId` ASC) VISIBLE,
  INDEX `fk_user_courses_1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_student_courses_2`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_courses_1`
    FOREIGN KEY (`userId`)
    REFERENCES `advisily`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`usermajors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`usermajors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`usermajors` (
  `userId` INT NOT NULL,
  `majorId` INT NOT NULL,
  `catalogId` INT NOT NULL,
  UNIQUE INDEX `studentId_majorId_UNIQUE` (`userId` ASC, `majorId` ASC) VISIBLE,
  INDEX `student_id_idx` (`userId` ASC) VISIBLE,
  INDEX `major_id_idx` (`majorId` ASC) VISIBLE,
  INDEX `fk_user_majors_3_idx` (`catalogId` ASC) VISIBLE,
  CONSTRAINT `fk_users_majors_1`
    FOREIGN KEY (`userId`)
    REFERENCES `advisily`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_majors_2`
    FOREIGN KEY (`majorId`)
    REFERENCES `advisily`.`majors` (`majorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_majors_3`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `advisily`.`userminors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`userminors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`userminors` (
  `userId` INT NOT NULL,
  `minorId` INT NOT NULL,
  `catalogId` INT NULL DEFAULT NULL,
  UNIQUE INDEX `studentId_minorId_UNIQUE` (`userId` ASC, `minorId` ASC) VISIBLE,
  INDEX `student_id_idx` (`userId` ASC) VISIBLE,
  INDEX `minor_id_idx` (`minorId` ASC) VISIBLE,
  INDEX `fk_user_minors_3_idx` (`catalogId` ASC) VISIBLE,
  CONSTRAINT `fk_user_minors_1`
    FOREIGN KEY (`userId`)
    REFERENCES `advisily`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_minors_2`
    FOREIGN KEY (`minorId`)
    REFERENCES `advisily`.`minors` (`minorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_minors_3`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
