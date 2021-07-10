-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema advisily
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `advisily` ;
USE `advisily` ;

-- -----------------------------------------------------
-- Table `advisily`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students` (
  `student_id` INT NOT NULL,
  `fname` VARCHAR(125) NOT NULL,
  `lname` VARCHAR(125) NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `catalog_year` YEAR NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE INDEX `student_id_UNIQUE` (`student_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`departments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`departments` ;

CREATE TABLE IF NOT EXISTS `advisily`.`departments` (
  `department_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(125) NOT NULL,
  `prefix` VARCHAR(15) NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`majors` (
  `major_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(125) NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`major_id`),
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`minors` (
  `major_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(125) NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`major_id`),
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id0`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`students_majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_majors` (
  `student_id` INT NULL,
  `major_id` INT NULL,
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `major_id_idx` (`major_id` ASC) VISIBLE,
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `major_id`
    FOREIGN KEY (`major_id`)
    REFERENCES `advisily`.`majors` (`major_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`students_minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_minors` (
  `student_id` INT NULL,
  `minor_id` INT NULL,
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `minor_id_idx` (`minor_id` ASC) VISIBLE,
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `minor_id`
    FOREIGN KEY (`minor_id`)
    REFERENCES `advisily`.`minors` (`major_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses` (
  `course_number` INT NOT NULL,
  `title` VARCHAR(125) NULL,
  `department_id` INT NULL,
  `credits` INT NULL,
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`courses_prerequisites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses_prerequisites` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses_prerequisites` (
  `course_number` INT NULL,
  `prerequisite_course_number` INT NULL,
  INDEX `course_number_idx` (`course_number` ASC) VISIBLE,
  INDEX `prerequisite_course_number_idx` (`prerequisite_course_number` ASC) VISIBLE,
  CONSTRAINT `course_number`
    FOREIGN KEY (`course_number`)
    REFERENCES `advisily`.`courses` (`course_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `prerequisite_course_number`
    FOREIGN KEY (`prerequisite_course_number`)
    REFERENCES `advisily`.`courses` (`course_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalog_plans`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalog_plans` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalog_plans` (
  `catalog_year` YEAR NOT NULL,
  `semester_number` INT NULL,
  `department_id` INT NULL,
  `course_number` INT NULL,
  PRIMARY KEY (`catalog_year`),
  INDEX `course_number_idx` (`course_number` ASC) VISIBLE,
  INDEX `department_id_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `course_number`
    FOREIGN KEY (`course_number`)
    REFERENCES `advisily`.`courses` (`course_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `department_id`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
