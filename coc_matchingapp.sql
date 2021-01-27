-- College of Computing Student/Alumni Project Matching App
-- Database Initilization
-- Junior Design Team 356
-- Author(s): Aditya Sudarshan, Saket Shirsath


-- README: THIS IS A DB INITIALIZATION SCRIPT
-- ALL DATA WILL BE LOST IF THIS IS RUN AGAIN

DROP DATABASE IF EXISTS matchingapp;
CREATE DATABASE matchingapp;
USE matchingapp;

CREATE table Students(
    gtUsername varchar(50) NOT NULL,
    password varchar(100),
    email varchar(320) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    middleName varchar(50),
    bio TEXT,
    primary key (gtUsername)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Skills(
    id INT unsigned auto_increment,
    skill VARCHAR(150),
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentSkills(
    gtUsername varchar(50),
    skillId INT unsigned,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    FOREIGN KEY (skillId)
        REFERENCES Skills(id),
    PRIMARY KEY (gtUsername, skillId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Interests(
    id INT unsigned auto_increment,
    interest VARCHAR(150),
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentInterests(
    gtUsername varchar(50),
    interestId INT unsigned,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    FOREIGN KEY (interestId)
        REFERENCES Interests(id),
    PRIMARY KEY (gtUsername, interestId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Experience(
	id INT unsigned auto_increment,
    gtUsername varchar(50),
    expereinceDescription text,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (gtUsername)
		REFERENCES Students(gtUsername)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Majors(
    id INT unsigned auto_increment,
    major VARCHAR(150),
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentMajors(
    gtUsername varchar(50),
    majorId INT unsigned,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    FOREIGN KEY (majorId)
        REFERENCES Majors(id),
    PRIMARY KEY (gtUsername, majorId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Degrees(
    id INT unsigned auto_increment,
    degree VARCHAR(150),
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentDegrees(
    gtUsername varchar(50),
    degreeId INT unsigned,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    FOREIGN KEY (degreeId)
        REFERENCES Degrees(id),
    PRIMARY KEY (gtUsername, degreeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Skills(
    skillId INT unsigned auto_increment,
    skillText VARCHAR(150),
    primary key (skillId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentSkills(
    gtUsername varchar(50),
    skillId INT unsigned,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    FOREIGN KEY (skillId)
        REFERENCES Skills(skillId),
    PRIMARY KEY (gtUsername, skillId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table StudentLinks(
    gtUsername varchar(50),
    id INT unsigned auto_increment,
    label VARCHAR(150),
    address TEXT,
    FOREIGN KEY (gtUsername)
        REFERENCES Students(gtUsername)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table Alumni(
    id INT unsigned auto_increment NOT NULL,
    username varchar(50) NOT NULL,
    pwd varchar(100),
    email varchar(320) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    middleName varchar(50),
    bio TEXT,
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Projects(
    id INT unsigned auto_increment NOT NULL PRIMARY KEY,
    projectTitle varchar(150) NOT NULL,
    projectDescription TEXT,
    startDate DATE,
    endDate DATE,
    projectAlumni INT unsigned,
    createdAt datetime,
    viewable BOOLEAN,
    FOREIGN KEY (projectAlumni)
        REFERENCES Alumni(id)
        ON UPDATE CASCADE
);

CREATE TABLE ProjectSkills(
    projectId INT unsigned,
    skillId INT unsigned,
    FOREIGN KEY (projectId)
        REFERENCES Projects(id)
        ON DELETE CASCADE,
    FOREIGN KEY (skillId)
        REFERENCES Skills(id),
    PRIMARY KEY (projectId, skillId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ProjectInterests(
    projectId INT unsigned,
    interestId INT unsigned,
    FOREIGN KEY (projectId)
        REFERENCES Projects(id)
        ON DELETE CASCADE,
    FOREIGN KEY (interestId)
        REFERENCES Interests(id),
    PRIMARY KEY (projectId, interestId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE table ProjectLinks(
    projectId INT unsigned,
    id INT unsigned auto_increment,
    label VARCHAR(150),
    address TEXT,
    FOREIGN KEY (projectId)
        REFERENCES Projects(id)
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
