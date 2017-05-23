-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------

-- Schema wagr_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wagr_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wagr_db` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema wagr_db
-- -----------------------------------------------------
USE `wagr_db` ;

-- -----------------------------------------------------
-- Table `wagr_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr_db`.`users` (

  `idusers` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`idusers`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------

-- Table `wagr_db`.`owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr_db`.`owners` (
  `idowners` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` INT NOT NULL,
  `users_idusers` INT NOT NULL,
  PRIMARY KEY (`idowners`, `users_idusers`),
  INDEX `fk_owners_users1_idx` (`users_idusers` ASC),
  CONSTRAINT `fk_owners_users1`
  FOREIGN KEY (`users_idusers`)
  REFERENCES `wagr_db`.`users` (`idusers`)

    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------

-- Table `wagr_db`.`pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr_db`.`pets` (
  `idpets` INT NOT NULL,
  `pet_name` VARCHAR(255) NOT NULL,
  `pet_type` VARCHAR(255) NOT NULL,
  `img_link` VARCHAR(500) NULL,
  `notes` VARCHAR(1000) NULL,
  `owners_idowners` INT NOT NULL,
  PRIMARY KEY (`idpets`, `owners_idowners`),
  INDEX `fk_pets_owners_idx` (`owners_idowners` ASC),
  CONSTRAINT `fk_pets_owners`
  FOREIGN KEY (`owners_idowners`)
  REFERENCES `wagr_db`.`owners` (`idowners`)

    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------

-- Table `wagr_db`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr_db`.`events` (
  `idevents` INT NOT NULL,
  `event_type` VARCHAR(255) NOT NULL,
  `notes` VARCHAR(1000) NULL,
  `img_link` VARCHAR(500) NULL,
  `pets_idpets` INT NOT NULL,
  `pets_owners_idowners` INT NOT NULL,
  PRIMARY KEY (`idevents`, `pets_idpets`, `pets_owners_idowners`),
  INDEX `fk_events_pets1_idx` (`pets_idpets` ASC, `pets_owners_idowners` ASC),
  CONSTRAINT `fk_events_pets1`
  FOREIGN KEY (`pets_idpets` , `pets_owners_idowners`)
  REFERENCES `wagr_db`.`pets` (`idpets` , `owners_idowners`)

    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

