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
-- Table `advisily`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students` (
  `student_id` INT NOT NULL,
  `fname` VARCHAR(125) NOT NULL,
  `lname` VARCHAR(125) NOT NULL,
  `email` VARCHAR(125) NOT NULL,
  `catalog_year` YEAR NULL,
  PRIMARY KEY (`student_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `student_id_UNIQUE` ON `advisily`.`students` (`student_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `email_UNIQUE` ON `advisily`.`students` (`email` ASC) VISIBLE;


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
  CONSTRAINT `fk_majors_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_majors_1_idx` ON `advisily`.`majors` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`minors` (
  `minor_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(125) NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`minor_id`),
  CONSTRAINT `fk_minors_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalogs` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalogs` (
  `catalog_id` INT NOT NULL AUTO_INCREMENT,
  `major_id` INT NOT NULL,
  `season` VARCHAR(15) NOT NULL,
  `year` YEAR NOT NULL,
  `core_credits` INT NULL,
  `conc_req_credits` INT NULL,
  `conc_elec_credits` INT NULL,
  `collateral_credits` INT NULL,
  `general_elec_credits` INT NULL,
  PRIMARY KEY (`catalog_id`),
  CONSTRAINT `fk_catalogs_1`
    FOREIGN KEY (`major_id`)
    REFERENCES `advisily`.`majors` (`major_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_catalogs_1_idx` ON `advisily`.`catalogs` (`major_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`students_majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_majors` (
  `student_id` INT NOT NULL,
  `major_id` INT NOT NULL,
  `catalog_id` INT NOT NULL,
  CONSTRAINT `fk_students_majors_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_majors_2`
    FOREIGN KEY (`major_id`)
    REFERENCES `advisily`.`majors` (`major_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_majors_3`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `advisily`.`catalogs` (`catalog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`students_majors` (`student_id` ASC) VISIBLE;

CREATE INDEX `major_id_idx` ON `advisily`.`students_majors` (`major_id` ASC) VISIBLE;

CREATE INDEX `fk_students_majors_3_idx` ON `advisily`.`students_majors` (`catalog_id` ASC) VISIBLE;

CREATE UNIQUE INDEX `student_id_UNIQUE` ON `advisily`.`students_majors` (`student_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`students_minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_minors` (
  `student_id` INT NOT NULL,
  `minor_id` INT NOT NULL,
  `catalog_id` INT NULL,
  CONSTRAINT `fk_students_minors_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_minors_2`
    FOREIGN KEY (`minor_id`)
    REFERENCES `advisily`.`minors` (`minor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_minors_3`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `advisily`.`catalogs` (`catalog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`students_minors` (`student_id` ASC) VISIBLE;

CREATE INDEX `minor_id_idx` ON `advisily`.`students_minors` (`minor_id` ASC) VISIBLE;

CREATE INDEX `fk_students_minors_3_idx` ON `advisily`.`students_minors` (`catalog_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses` (
  `course_id` INT NOT NULL AUTO_INCREMENT,
  `course_code` INT NOT NULL,
  `department_id` INT NOT NULL,
  `title` VARCHAR(125) NULL,
  `credits` TINYINT NULL,
  PRIMARY KEY (`course_id`),
  CONSTRAINT `fk_courses_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `department_id_idx` ON `advisily`.`courses` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`courses_prerequisites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses_prerequisites` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses_prerequisites` (
  `course_id` INT NULL,
  `prerequisite_course_id` INT NULL,
  CONSTRAINT `fk_courses_prerequisites_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `advisily`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_courses_prerequisites_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `advisily`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_courses_prerequisites_1_idx` ON `advisily`.`courses_prerequisites` (`course_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`course_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`course_types` ;

CREATE TABLE IF NOT EXISTS `advisily`.`course_types` (
  `course_type_id` INT NOT NULL AUTO_INCREMENT,
  `course_type` VARCHAR(45) NULL,
  PRIMARY KEY (`course_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalog_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalog_courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalog_courses` (
  `catalog_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `course_type_id` INT NULL,
  `semester_number` TINYINT NOT NULL,
  CONSTRAINT `fk_catalog_courses_1`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `advisily`.`catalogs` (`catalog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_catalog_courses_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `advisily`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_catalog_courses_3`
    FOREIGN KEY (`course_type_id`)
    REFERENCES `advisily`.`course_types` (`course_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_catalog_courses_2_idx` ON `advisily`.`catalog_courses` (`course_id` ASC) VISIBLE;

CREATE INDEX `fk_catalog_courses_3_idx` ON `advisily`.`catalog_courses` (`course_type_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`student_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`student_courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`student_courses` (
  `student_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  CONSTRAINT `fk_student_courses_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_courses_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `advisily`.`courses` (`course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_student_courses_2_idx` ON `advisily`.`student_courses` (`course_id` ASC) VISIBLE;

CREATE INDEX `fk_student_courses_1_idx` ON `advisily`.`student_courses` (`student_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`student_advising`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`student_advising` ;

CREATE TABLE IF NOT EXISTS `advisily`.`student_advising` (
  `student_advising_id` INT NOT NULL AUTO_INCREMENT,
  `overloading_credits` TINYINT NULL DEFAULT 0,
  `summer_credits` TINYINT NULL DEFAULT 0,
  `winter_credits` TINYINT NULL DEFAULT 0,
  `student_id` INT NULL,
  PRIMARY KEY (`student_advising_id`),
  CONSTRAINT `fk_student_advising_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_student_advising_1_idx` ON `advisily`.`student_advising` (`student_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
