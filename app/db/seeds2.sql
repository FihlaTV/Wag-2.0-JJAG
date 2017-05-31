INSERT INTO `users` (`email`,`password`,`isAdmin`)
VALUES ('themer@verizon.net','12345678',0),
  ('yomamma@hotmail.com','12345678',0),
  ('ajoker@aol.com','12345678',0),
  ('avalon@aol.com','12345678',0),
  ('admin@admin.com','admin',1);

INSERT INTO `owners` (`first_name`,`last_name`,`address`, `email`, `phone`, `users_id`)

VALUES ('Ron', 'Gamache','9104 Theatre St. Orlando, FL 32801', 'test@email.com', "4073244759", 1),
  ('Darlene', 'Bridgett','449 Rocky River St. Clermont, FL 34711', 'test@email.com', "4073244759", 2),
  ('Wendie', 'Cothern','479 Saxton Street Belle Isle, FL 32809', 'test@email.com', "4072325032", 3),
  ('Joey', 'Makuch','889 South High Dr. Orlando, FL 32806', 'test@email.com', "4073244759", 4),
  ('Admin', 'Smith','889 South High Dr. Orlando, FL 32806', 'test@email.com', "4073244759", 5);

INSERT INTO `pets` (`pet_name`,`pet_type`,`img_link`, `notes`, `checkedIn`, `owners_id`)
VALUES ('Fido', 'Poodle','https://www.google.com/','Fido chases cats', FALSE, 1),
  ('Snoopy', 'Beagle','https://www.google.com/','Snoopy is calm',FALSE, 2),
  ('Max', 'Labrador','https://www.google.com/','Max needs lots of love',FALSE, 3),
  ('Sassy', 'Kitten','https://www.google.com/','Sassy is scared of people',FALSE, 4),
  ('Rover', 'Pug','https://www.google.com/','Rover eats grass',FALSE, 5);

INSERT INTO `events` (`event_type`,`notes`,`img_link`, `pets_id`)
VALUES ('Walk', '10 minute walk outside','https://www.google.com/', 1),
  ('Food', 'Ate 1 scoop kibble','https://www.google.com/', 2),
  ('Potty', 'Potty break outside','https://www.google.com/', 3),
  ('Grooming', 'Bath and coat brush','https://www.google.com/', 4),
  ('Picture', 'We made new friends today!','https://www.google.com/', 5);

