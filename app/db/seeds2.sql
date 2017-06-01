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
VALUES ('Fido', 'Poodle','https://www.dropbox.com/s/4xkmx052t7veiim/dog1.jpg?raw=1','Fido chases cats', TRUE, 1),
  ('Snoopy', 'Beagle','https://www.dropbox.com/s/397qjlmynz21emd/dog2.jpg?raw=1','Snoopy is calm',TRUE, 2),
  ('Max', 'Labrador','https://www.dropbox.com/s/a4zatzyddn7dhgj/dog3.jpg?raw=1','Max needs lots of love',FALSE, 3),
  ('Sassy', 'Puggle','https://www.dropbox.com/s/mynczq3twdd396g/dog4.jpg?raw=1','Sassy is scared of people',TRUE, 4),
  ('Rover', 'Pug','https://www.dropbox.com/s/v81xs9h3kt0xa4l/dog5.jpg?raw=1','Rover eats grass',FALSE, 5);

INSERT INTO `events` (`event_type`,`notes`,`img_link`, `pets_id`)
VALUES ('Exercise', '10 minute walk outside','https://placehold.it/300x300/', 1),
  ('Exercise', '10 minute walk outside','https://placehold.it/300x300/', 2),
  ('Exercise', '10 minute walk outside','https://placehold.it/300x300/', 3),
  ('Exercise', '10 minute walk outside','https://placehold.it/300x300/', 4),
  ('Exercise', '10 minute walk outside','https://placehold.it/300x300/', 5),
  ('Eat', 'Science Diet - Large Breed','https://placehold.it/300x300/', 1),
  ('Eat', 'Science Diet - Puppy','https://placehold.it/300x300/', 2),
  ('Eat', 'Science Diet - Large Breed','https://placehold.it/300x300/', 3),
  ('Eat', 'Science Diet - Small Breed','https://placehold.it/300x300/', 4),
  ('Eat', 'Science Diet - Small Breed','https://placehold.it/300x300/', 5),
  ('Check In/Out', 'Check In/Out','https://placehold.it/300x300/', 1),
  ('Check In/Out', 'Check In/Out','https://placehold.it/300x300/', 2),
  ('Check In/Out', 'Check In/Out','https://placehold.it/300x300/', 3),
  ('Check In/Out', 'Check In/Out','https://placehold.it/300x300/', 4),
  ('Check In/Out', 'Check In/Out','https://placehold.it/300x300/', 5),
  ('Potty', 'Potty break outside','https://placehold.it/300x300/', 3),
  ('Medication', 'Anxiety medicine','https://placehold.it/300x300/', 4),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!','https://placehold.it/300x300/', 2),
  ('Incident', 'One of our friends got over excited while playing outside. There were no injuries, but we had to separate your pet from another friend during play time.','https://placehold.it/300x300/', 5),
  ('Photo', 'We made new friends today!','https://placehold.it/300x300/', 1);

