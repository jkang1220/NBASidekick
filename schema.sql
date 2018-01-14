DROP DATABASE IF EXISTS nbasidekick;

CREATE DATABASE nbasidekick;

USE nbasidekick;

CREATE TABLE teams (
  id int  NOT NULL AUTO_INCREMENT,
  city varchar(50),
  teamname varchar(50),
  logo varchar(255),
  abbreviation varchar(10),
  teamID int NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (1, 'ATLANTA', 'HAWKS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/ATL.svg', 'ATL', '91');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (2, 'BOSTON', 'CELTICS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/BOS.svg', 'BOS', '82');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (3, 'BROOKLYN', 'NETS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/BKN.svg', 'BRO', '84');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (4, 'CHARLOTTE', 'HORNETS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/CHA.svg', 'CHA', '93');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (5, 'CHICAGO', 'BULLS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/CHI.svg', 'CHI', '89');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (6, 'CLEVELAND', 'CAVALIERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/CLE.svg', 'CLE', '86');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (7, 'DALLAS', 'MAVERICKS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/DAL.svg', 'DAL', '108');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (8, 'DENVER', 'NUGGETS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/DEN.svg', 'DEN', '99');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (9, 'DETROIT', 'PISTONS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/DET.svg', 'DET', '88');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (10, 'GOLDEN STATE', 'WARRIORS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/GSW.svg', 'GSW', '101');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (11, 'HOUSTON', 'ROCKETS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/HOU.svg', 'HOU', '109');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (12, 'INDIANA', 'PACERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/IND.svg', 'IND', '87');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (13, 'LOS ANGELES', 'CLIPPERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/LAC.svg', 'LAC', '102');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (14, 'LOS ANGELES', 'LAKERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/LAL.svg', 'LAL', '105');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (15, 'MEMPHIS', 'GRIZZLIES','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/MEM.svg', 'MEM', '107');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (16, 'MIAMI', 'HEAT','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/MIA.svg', 'MIA', '92');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (17, 'MILWAUKEE', 'BUCKS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/MIL.svg', 'MIL', '90');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (18, 'MINNESOTA', 'TIMBERWOLVES','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/MIN.svg', 'MIN', '100');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (19, 'NEW ORLEANS', 'PELICANS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/NOP.svg', 'NOP', '110');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (20, 'NEW YORK', 'KNICKS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/NYK.svg', 'NYK', '83');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (21, 'ORLANDO', 'MAGIC','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/ORL.svg', 'ORL', '95');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (22, 'OKLAHOMA CITY', 'THUNDER','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/OKC.svg', 'OKL', '96');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (23, 'PHILADELPHIA', '76ERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/PHI.svg', 'PHI', '85');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (24, 'PHOENIX', 'SUNS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/PHX.svg', 'PHX', '104');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (25, 'PORTLAND', 'TRAIL BLAZERS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/POR.svg', 'POR', '97');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (26, 'SACRAMENTO', 'KINGS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/SAC.svg', 'SAC', '103');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (27, 'SAN ANTONIO', 'SPURS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/SAS.svg', 'SAS', '106');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (28, 'TORONTO', 'RAPTORS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/TOR.svg', 'TOR', '81');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (29, 'UTAH', 'JAZZ','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/UTA.svg', 'UTA', '98');
INSERT INTO teams (id, city, teamname, logo, abbreviation, teamID) VALUES (30, 'WASHINGTON', 'WIZARDS','http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/WAS.svg', 'WAS', '94');




