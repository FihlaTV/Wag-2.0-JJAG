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
  ('Bear', 'Labrador','https://www.dropbox.com/s/a4zatzyddn7dhgj/dog3.jpg?raw=1','Bear is fierce',FALSE, 3),
  ('Max', 'Puggle','https://www.dropbox.com/s/mynczq3twdd396g/dog4.jpg?raw=1','Max needs lots of love',TRUE, 4),
  ('Cooper', 'Pug','https://www.dropbox.com/s/v81xs9h3kt0xa4l/dog5.jpg?raw=1','Cooper likes toys',FALSE, 1),
  ('Millie', 'Long-Haired Doxie','https://www.dropbox.com/s/0q7ilm2575187qf/dog6.jpg?raw=1','Millie is a diva',FALSE, 2),
  ('Oliver', 'Pug','https://www.dropbox.com/s/ujvzeaz87gxpo27/dog7.jpg?raw=1','Oliver likes to eat cat food',TRUE, 4),
  ('Leo', 'Lab','https://www.dropbox.com/s/flkrkjqf04h14zj/dog8.jpg?raw=1','Leo likes to chase cars',TRUE, 4),
  ('Scout', 'Bloodhound','https://www.dropbox.com/s/loerwlcvprl1szl/dog9.jpg?raw=1','Scout fancies himself a detective',TRUE, 4),
  ('Jackson', 'Dachshund','https://www.dropbox.com/s/1exx76iys83ypiu/dog10.jpg?raw=1','Jackson is a southern gentleman',TRUE, 1),
  ('Murphy', 'Greyhound','https://www.dropbox.com/s/xpast2od7kw0bio/dog11.jpg?raw=1','Murphy likes to sleep',FALSE, 2),
  ('Tucker', 'Husky','https://www.dropbox.com/s/09ria12wafmqfw1/dog12.jpg?raw=1','Tucker is a little shit',FALSE, 5),
  ('Honey', 'Golden Retriever','https://www.dropbox.com/s/vhft98vu9dyf31k/dog13.jpg?raw=1','Honey is the actual best dog in the world.',TRUE, 4),
  ('Winston', 'Weimaraner','https://www.dropbox.com/s/56v6ipa07vkn29z/dog14.jpg?raw=1','Winston needs to calm down',FALSE, 3);


INSERT INTO `events` (`event_type`,`notes`,`img_link`, `pets_id`)
VALUES ('Exercise', '10 minute walk outside', NULL, 1),
  ('Exercise', '10 minute walk outside', NULL, 2),
  ('Exercise', '10 minute walk outside', NULL, 3),
  ('Exercise', '10 minute walk outside', NULL, 4),
  ('Exercise', '10 minute walk outside', NULL, 5),
  ('Exercise', '10 minute walk outside', NULL, 6),
  ('Exercise', '10 minute walk outside', NULL, 7),
  ('Exercise', '10 minute walk outside', NULL, 8),
  ('Exercise', '10 minute walk outside', NULL, 9),
  ('Exercise', '10 minute walk outside', NULL, 10),
  ('Exercise', '10 minute walk outside', NULL, 11),
  ('Exercise', '10 minute walk outside', NULL, 12),
  ('Exercise', '10 minute walk outside', NULL, 13),
  ('Exercise', '10 minute walk outside', NULL, 14),
  ('Eat', 'Science Diet - Large Breed', NULL, 1),
  ('Eat', 'Science Diet - Puppy', NULL, 2),
  ('Eat', 'Science Diet - Large Breed', NULL, 3),
  ('Eat', 'Science Diet - Small Breed', NULL, 4),
  ('Eat', 'Science Diet - Small Breed', NULL, 5),
  ('Check In/Out', 'Check In/Out',NULL, 1),
  ('Check In/Out', 'Check In/Out',NULL, 2),
  ('Check In/Out', 'Check In/Out',NULL, 3),
  ('Check In/Out', 'Check In/Out',NULL, 4),
  ('Check In/Out', 'Check In/Out',NULL, 5),
  ('Check In/Out', 'Check In/Out',NULL, 6),
  ('Check In/Out', 'Check In/Out',NULL, 7),
  ('Check In/Out', 'Check In/Out',NULL, 8),
  ('Check In/Out', 'Check In/Out',NULL, 9),
  ('Check In/Out', 'Check In/Out',NULL, 10),
  ('Check In/Out', 'Check In/Out',NULL, 11),
  ('Check In/Out', 'Check In/Out',NULL, 12),
  ('Check In/Out', 'Check In/Out',NULL, 13),
  ('Check In/Out', 'Check In/Out',NULL, 14),
  ('Potty', 'Potty break outside',NULL, 5),
  ('Potty', 'Potty break outside',NULL, 6),
  ('Potty', 'Potty break outside',NULL, 7),
  ('Potty', 'Potty break outside',NULL, 8),
  ('Medication', 'Anxiety medicine',NULL, 9),
  ('Medication', 'Anxiety medicine',NULL, 10),
  ('Medication', 'Anxiety medicine',NULL, 11),
  ('Medication', 'Anxiety medicine',NULL, 12),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 13),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 14),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 1),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 2),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 3),
  ('Note', 'Please stop by the front desk today for a treat from our caretakers!',NULL, 4),
  ('Incident', 'One of our friends got over excited while playing outside.',NULL, 5),
  ('Incident', 'One of our friends got over excited while playing outside.',NULL, 4),
  ('Incident', 'One of our friends got over excited while playing outside.',NULL, 3),
  ('Incident', 'One of our friends got over excited while playing outside.',NULL, 2),
  ('Incident', 'One of our friends got over excited while playing outside.',NULL, 1),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog4playing.jpg', 1),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog4playing.jpg', 2),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog4playing.jpg', 3),
  ('Photo', 'We made new friends today!', '/assets/img/playing/dog4playing.jpg', 4),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog9playing.jpg', 5),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog6playing.jpg', 6),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog9playing.jpg', 7),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog9playing.jpg', 8),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog9playing.jpg', 9),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog13playing.jpg', 10),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog13playing.jpg', 11),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog13playing.jpg', 12),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog13playing.jpg', 13),
  ('Photo', 'We made new friends today!','/assets/img/playing/dog13playing.jpg', 14);

