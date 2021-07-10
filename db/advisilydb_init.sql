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
  PRIMARY KEY (`student_id`))
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
  CONSTRAINT `majors_fk1`
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
  `minor_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(125) NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`minor_id`),
  CONSTRAINT `minors_fk1`
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
  CONSTRAINT `students_majors_fk1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `students_majors_fk2`
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
  CONSTRAINT `students_minors_fk1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `students_minors_fk2`
    FOREIGN KEY (`minor_id`)
    REFERENCES `advisily`.`minors` (`minor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `advisily`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`courses` (
  `course_code` INT NOT NULL,
  `department_id` INT NOT NULL,
  `title` VARCHAR(125) NULL,
  `credits` INT NULL,
  PRIMARY KEY (`course_code`, `department_id`),
  CONSTRAINT `courses_fk1`
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
  `course_code` INT NULL,
  `course_department_id` INT NULL,
  `prerequisite_course_code` INT NULL,
  `prerequisite_department_id` INT NULL,
  CONSTRAINT `courses_prerequisites_fk1`
    FOREIGN KEY (`course_code` , `course_department_id`)
    REFERENCES `advisily`.`courses` (`course_code` , `department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `courses_prerequisites_fk2`
    FOREIGN KEY (`prerequisite_course_code` , `prerequisite_department_id`)
    REFERENCES `advisily`.`courses` (`course_code` , `department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`catalog_plan`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`catalog_plans` ;

CREATE TABLE IF NOT EXISTS `advisily`.`catalog_plans` (
  `catalog_year` YEAR NOT NULL,
  `semester_number` INT NULL,
  `department_id` INT NULL,
  `course_code` INT NULL,
  PRIMARY KEY (`catalog_year`),
CONSTRAINT `catalog_plans_fk1`
    FOREIGN KEY (`department_id`,`course_code`)
    REFERENCES `advisily`.`courses` (`course_code`,`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    )ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
