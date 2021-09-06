-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `advisily` ;

-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `advisily` ;
USE `advisily` ;

-- -----------------------------------------------------
-- Table `advisily`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`users` ;

CREATE TABLE IF NOT EXISTS `advisily`.`users` (
  `studentId` INT NOT NULL,
  `firstName` VARCHAR(125) NOT NULL,
  `lastName` VARCHAR(125) NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isVerified` TINYINT(1) NOT NULL DEFAULT 0,
  `verificationToken` VARCHAR(225) NULL,
  `passwordResetToken` VARCHAR(225) NULL,
  `resetTokenExpire` TIMESTAMP NULL,
  PRIMARY KEY (`studentId`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `studentId_UNIQUE` ON `advisily`.`users` (`studentId` ASC) VISIBLE;

CREATE UNIQUE INDEX `email_UNIQUE` ON `advisily`.`users` (`email` ASC) VISIBLE;

CREATE UNIQUE INDEX `verificationToken_UNIQUE` ON `advisily`.`users` (`verificationToken` ASC) VISIBLE;

CREATE UNIQUE INDEX `passwordResetToken_UNIQUE` ON `advisily`.`users` (`passwordResetToken` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`majors` (
  `majorId` INT NOT NULL AUTO_INCREMENT,
  `majorTitle` VARCHAR(125) NULL,
  PRIMARY KEY (`majorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`minors` (
  `minorId` INT NOT NULL AUTO_INCREMENT,
  `minorTitle` VARCHAR(125) NULL,
  PRIMARY KEY (`minorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalogs` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalogs` (
  `catalogId` INT NOT NULL AUTO_INCREMENT,
  `majorId` INT NOT NULL,
  `year` VARCHAR(50) NOT NULL,
  `coreCredits` INT NULL,
  `concReqCredits` INT NULL,
  `concElecCredits` INT NULL,
  `collateralCredits` INT NULL,
  `generalElecCredits` INT NULL,
  `engCoreCredits` INT NULL,
  PRIMARY KEY (`catalogId`),
  CONSTRAINT `fk_catalogs_1`
    FOREIGN KEY (`majorId`)
    REFERENCES `advisily`.`majors` (`majorId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_catalogs_1_idx` ON `advisily`.`catalogs` (`majorId` ASC) VISIBLE;

CREATE UNIQUE INDEX `majorId_season_year` ON `advisily`.`catalogs` (`majorId` ASC, `year` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`userMajors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`userMajors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`userMajors` (
  `studentId` INT NOT NULL,
  `majorId` INT NOT NULL,
  `catalogId` INT NOT NULL,
  CONSTRAINT `fk_users_majors_1`
    FOREIGN KEY (`studentId`)
    REFERENCES `advisily`.`users` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_majors_2`
    FOREIGN KEY (`majorId`)
    REFERENCES `advisily`.`majors` (`majorId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_majors_3`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`userMajors` (`studentId` ASC) VISIBLE;

CREATE INDEX `major_id_idx` ON `advisily`.`userMajors` (`majorId` ASC) VISIBLE;

CREATE INDEX `fk_user_majors_3_idx` ON `advisily`.`userMajors` (`catalogId` ASC) VISIBLE;

CREATE UNIQUE INDEX `studentId_majorId_UNIQUE` ON `advisily`.`userMajors` (`studentId` ASC, `majorId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`userMinors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`userMinors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`userMinors` (
  `studentId` INT NOT NULL,
  `minorId` INT NOT NULL,
  `catalogId` INT NULL,
  CONSTRAINT `fk_user_minors_1`
    FOREIGN KEY (`studentId`)
    REFERENCES `advisily`.`users` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_minors_2`
    FOREIGN KEY (`minorId`)
    REFERENCES `advisily`.`minors` (`minorId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_minors_3`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`userMinors` (`studentId` ASC) VISIBLE;

CREATE INDEX `minor_id_idx` ON `advisily`.`userMinors` (`minorId` ASC) VISIBLE;

CREATE INDEX `fk_user_minors_3_idx` ON `advisily`.`userMinors` (`catalogId` ASC) VISIBLE;

CREATE UNIQUE INDEX `studentId_minorId_UNIQUE` ON `advisily`.`userMinors` (`studentId` ASC, `minorId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses` (
  `courseId` INT NOT NULL AUTO_INCREMENT,
  `courseCode` INT NOT NULL,
  `courseTitle` VARCHAR(125) NULL,
  `credits` TINYINT NULL,
  `prefix` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`courseId`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `courseCode_departmendId_UNIQUE` ON `advisily`.`courses` (`courseCode` ASC, `prefix` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`requisiteTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`requisiteTypes` ;

CREATE TABLE IF NOT EXISTS `advisily`.`requisiteTypes` (
  `requisiteTypeId` INT NOT NULL AUTO_INCREMENT,
  `requisiteType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`requisiteTypeId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`requisiteSets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`requisiteSets` ;

CREATE TABLE IF NOT EXISTS `advisily`.`requisiteSets` (
  `setId` INT NOT NULL,
  `requisiteId` INT NOT NULL,
  `requisiteTypeId` INT NULL,
  CONSTRAINT `fk_requisiteSets_1`
    FOREIGN KEY (`requisiteId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requisiteSets_2`
    FOREIGN KEY (`requisiteId`)
    REFERENCES `advisily`.`requisiteTypes` (`requisiteTypeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_requisiteSets_1_idx` ON `advisily`.`requisiteSets` (`requisiteId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`coursesRequisites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`coursesRequisites` ;

CREATE TABLE IF NOT EXISTS `advisily`.`coursesRequisites` (
  `courseId` INT NOT NULL,
  `setId` INT NOT NULL,
  CONSTRAINT `fk_courses_prerequisites_1`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_courses_prerequisites_2`
    FOREIGN KEY (`setId`)
    REFERENCES `advisily`.`requisiteSets` (`setId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_courses_prerequisites_1_idx` ON `advisily`.`coursesRequisites` (`courseId` ASC) VISIBLE;

CREATE UNIQUE INDEX `courseId_prerequisiteCourseId_UNIQUE` ON `advisily`.`coursesRequisites` (`courseId` ASC, `setId` ASC) VISIBLE;

CREATE INDEX `fk_courses_prerequisites_2_idx` ON `advisily`.`coursesRequisites` (`setId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`courseTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courseTypes` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courseTypes` (
  `courseTypeId` INT NOT NULL AUTO_INCREMENT,
  `courseType` VARCHAR(45) NULL,
  PRIMARY KEY (`courseTypeId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalogCourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalogCourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalogCourses` (
  `catalogId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `courseTypeId` INT NULL,
  CONSTRAINT `fk_catalog_courses_1`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_courses_2`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_catalog_courses_3`
    FOREIGN KEY (`courseTypeId`)
    REFERENCES `advisily`.`courseTypes` (`courseTypeId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_catalog_courses_2_idx` ON `advisily`.`catalogCourses` (`courseId` ASC) VISIBLE;

CREATE INDEX `fk_catalog_courses_3_idx` ON `advisily`.`catalogCourses` (`courseTypeId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`userCourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`userCourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`userCourses` (
  `studentId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `finishedCredits` INT NOT NULL DEFAULT 3,
  CONSTRAINT `fk_user_courses_1`
    FOREIGN KEY (`studentId`)
    REFERENCES `advisily`.`users` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_student_courses_2`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_courses_2_idx` ON `advisily`.`userCourses` (`courseId` ASC) VISIBLE;

CREATE INDEX `fk_user_courses_1_idx` ON `advisily`.`userCourses` (`studentId` ASC) VISIBLE;

CREATE UNIQUE INDEX `studentId_courseId_UNIQUE` ON `advisily`.`userCourses` (`studentId` ASC, `courseId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`paces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`paces` ;

CREATE TABLE IF NOT EXISTS `advisily`.`paces` (
  `paceId` INT NOT NULL AUTO_INCREMENT,
  `paceTitle` VARCHAR(225) NULL,
  PRIMARY KEY (`paceId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`advisingSessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingSessions` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingSessions` (
  `advisingSessionId` INT NOT NULL AUTO_INCREMENT,
  `studentId` INT NULL,
  `overloadingCredits` TINYINT NULL DEFAULT 0,
  `summerCredits` TINYINT NULL DEFAULT 0,
  `winterCredits` TINYINT NULL DEFAULT 0,
  `sessionDate` TIMESTAMP NULL DEFAULT current_timestamp,
  `generalElecCredits` INT NULL DEFAULT 0,
  `paceId` INT NULL DEFAULT 2,
  `semestersPlanned` INT NULL DEFAULT 1,
  PRIMARY KEY (`advisingSessionId`),
  CONSTRAINT `fk_advising_session_1`
    FOREIGN KEY (`studentId`)
    REFERENCES `advisily`.`users` (`studentId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_advising_sessions_2`
    FOREIGN KEY (`paceId`)
    REFERENCES `advisily`.`paces` (`paceId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_advising_session_1_idx` ON `advisily`.`advisingSessions` (`studentId` ASC) VISIBLE;

CREATE UNIQUE INDEX `student_id_UNIQUE` ON `advisily`.`advisingSessions` (`studentId` ASC) VISIBLE;

CREATE INDEX `fk_advising_sessions_2_idx` ON `advisily`.`advisingSessions` (`paceId` ASC) VISIBLE;

CREATE UNIQUE INDEX `advisingSessionId_UNIQUE` ON `advisily`.`advisingSessions` (`advisingSessionId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`advisingResultCourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`advisingResultCourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`advisingResultCourses` (
  `advisingSessionId` INT NULL,
  `courseId` INT NULL,
  CONSTRAINT `fk_advising_result_courses_1`
    FOREIGN KEY (`advisingSessionId`)
    REFERENCES `advisily`.`advisingSessions` (`advisingSessionId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_advising_result_courses_2`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_advising_result_courses_1_idx` ON `advisily`.`advisingResultCourses` (`advisingSessionId` ASC) VISIBLE;

CREATE INDEX `fk_advising_result_courses_2_idx` ON `advisily`.`advisingResultCourses` (`courseId` ASC) VISIBLE;

CREATE UNIQUE INDEX `advisingSessionId_courseId_UNIQUE` ON `advisily`.`advisingResultCourses` (`advisingSessionId` ASC, `courseId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`planCourses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`planCourses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`planCourses` (
  `catalogId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `semesterNumber` INT NOT NULL,
  CONSTRAINT `fk_planCourses_1`
    FOREIGN KEY (`courseId`)
    REFERENCES `advisily`.`courses` (`courseId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_planCourses_2`
    FOREIGN KEY (`catalogId`)
    REFERENCES `advisily`.`catalogs` (`catalogId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_planCourses_1_idx` ON `advisily`.`planCourses` (`courseId` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
