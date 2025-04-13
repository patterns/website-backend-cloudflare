
-- seed data for tests

INSERT INTO roles (rawdata)
VALUES 
('{"name": "learner"}'),
('{"name": "instructor"}'),
('{"name": "adminstrator"}');

INSERT INTO users (rawdata)
VALUES 
('{"email": "example@davincirenaissance.org", "providerId": "placeholder", "userUuid": "ABCDEF123456789", "role": {name: "instructor"}}'),
('{"email": "learner@davincirenaissance.org", "providerId": "placeholder", "userUuid": "XYZABC789012345", "role": {name: "learner"}}');

