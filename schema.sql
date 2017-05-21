-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema wagr-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wagr-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wagr-db` DEFAULT CHARACTER SET utf8 ;
USE `wagr-db` ;

-- -----------------------------------------------------
-- Table `wagr-db`.`owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr-db`.`owners` (
  `idowners` INT NOT NULL,
  `first-name` VARCHAR(45) NULL,
  `last-name` VARCHAR(45) NULL,
  `addr1` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `ownerscol` VARCHAR(45) NULL,
  PRIMARY KEY (`idowners`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wagr-db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr-db`.`users` (
  `idusers` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `owners_idowners` INT NOT NULL,
  `is-admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`idusers`),
  INDEX `fk_users_owners_idx` (`owners_idowners` ASC),
  CONSTRAINT `fk_users_owners`
  FOREIGN KEY (`owners_idowners`)
  REFERENCES `wagr-db`.`owners` (`idowners`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wagr-db`.`pets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr-db`.`pets` (
  `idpets` INT NOT NULL,
  `pet-name` VARCHAR(45) NULL,
  `pet-type` VARCHAR(45) NULL,
  `owners_idowners` INT NOT NULL,
  `notes` VARCHAR(45) NULL,
  `img-link` VARCHAR(45) NULL,
  PRIMARY KEY (`idpets`),
  INDEX `fk_pets_owners1_idx` (`owners_idowners` ASC),
  CONSTRAINT `fk_pets_owners1`
  FOREIGN KEY (`owners_idowners`)
  REFERENCES `wagr-db`.`owners` (`idowners`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wagr-db`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wagr-db`.`events` (
  `idevents` INT NOT NULL,
  `event-type` VARCHAR(45) NULL,
  `timestamp` VARCHAR(45) NULL,
  `pets_idpets` INT NOT NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`idevents`),
  INDEX `fk_events_pets1_idx` (`pets_idpets` ASC),
  CONSTRAINT `fk_events_pets1`
  FOREIGN KEY (`pets_idpets`)
  REFERENCES `wagr-db`.`pets` (`idpets`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
