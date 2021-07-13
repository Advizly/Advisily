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
-- Table `advisily`.`students_majors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_majors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_majors` (
  `student_id` INT NULL,
  `major_id` INT NULL,
  CONSTRAINT `fk_students_majors_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_majors_2`
    FOREIGN KEY (`major_id`)
    REFERENCES `advisily`.`majors` (`major_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`students_majors` (`student_id` ASC) VISIBLE;

CREATE INDEX `major_id_idx` ON `advisily`.`students_majors` (`major_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`students_minors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`students_minors` ;

CREATE TABLE IF NOT EXISTS `advisily`.`students_minors` (
  `student_id` INT NULL,
  `minor_id` INT NULL,
  CONSTRAINT `fk_students_minors_1`
    FOREIGN KEY (`student_id`)
    REFERENCES `advisily`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_minors_2`
    FOREIGN KEY (`minor_id`)
    REFERENCES `advisily`.`minors` (`minor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `student_id_idx` ON `advisily`.`students_minors` (`student_id` ASC) VISIBLE;

CREATE INDEX `minor_id_idx` ON `advisily`.`students_minors` (`minor_id` ASC) VISIBLE;


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
  `course_code` INT NULL,
  `course_department_id` INT NULL,
  `prerequisite_course_code` INT NULL,
  `prerequisite_department_id` INT NULL,
  CONSTRAINT `course_key`
    FOREIGN KEY (`course_code` , `course_department_id`)
    REFERENCES `advisily`.`courses` (`course_code` , `department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `prerequisite_key`
    FOREIGN KEY (`prerequisite_course_code` , `prerequisite_department_id`)
    REFERENCES `advisily`.`courses` (`course_code` , `department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `course_number_idx` ON `advisily`.`courses_prerequisites` (`course_code` ASC, `course_department_id` ASC) VISIBLE;

CREATE INDEX `prerequisite_course_number_idx` ON `advisily`.`courses_prerequisites` (`prerequisite_course_code` ASC, `prerequisite_department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`plan_concrete_coruses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`plan_concrete_coruses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`plan_concrete_coruses` (
  `catalog_year` YEAR NOT NULL,
  `course_code` INT NOT NULL,
  `department_id` INT NOT NULL,
  `semester_number` INT NULL,
  PRIMARY KEY (`catalog_year`, `course_code`, `department_id`),
  CONSTRAINT `course_number`
    FOREIGN KEY (`course_code`)
    REFERENCES `advisily`.`courses` (`course_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_plan_concrete_courses_1`
    FOREIGN KEY (`department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `course_number_idx` ON `advisily`.`plan_concrete_coruses` (`course_code` ASC) VISIBLE;

CREATE INDEX `department_id_idx` ON `advisily`.`plan_concrete_coruses` (`department_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `advisily`.`template_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`template_courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`template_courses` (
  `template_course_id` INT NOT NULL AUTO_INCREMENT,
  `template_courses_title` VARCHAR(45) NULL,
  PRIMARY KEY (`template_course_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advisily`.`plan_template_courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advisily`.`plan_template_courses` ;

CREATE TABLE IF NOT EXISTS `advisily`.`plan_template_courses` (
  `catalog_year` YEAR NOT NULL,
  `template_course_id` INT NOT NULL,
  `plan_department_id` INT NOT NULL,
  `semester_number` INT NULL,
  PRIMARY KEY (`template_course_id`, `catalog_year`, `plan_department_id`),
  CONSTRAINT `fk_plan_template_courses`
    FOREIGN KEY (`template_course_id`)
    REFERENCES `advisily`.`template_courses` (`template_course_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_plan_template_departments`
    FOREIGN KEY (`plan_department_id`)
    REFERENCES `advisily`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_plan_template_departments_idx` ON `advisily`.`plan_template_courses` (`plan_department_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
