USE [master]

IF db_id('Randomizer') IS NULL
	CREATE DATABASE [Randomizer]
GO

use [Randomizer]
GO

DROP TABLE IF EXISTS UserProfile;
DROP TABLE IF EXISTS Character;
DROP TABLE IF EXISTS AppearanceFeature;
DROP TABLE IF EXISTS Gender;
DROP TABLE IF EXISTS Race;
DROP TABLE IF EXISTS Alignment;
DROP TABLE IF EXISTS Talent;
DROP TABLE IF EXISTS Mannerism;
DROP TABLE IF EXISTS InteractionTrait;
DROP TABLE IF EXISTS PlotHook;


CREATE TABLE [UserProfile] (
  [Id] INTEGER NOT NULL IDENTITY PRIMARY KEY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [DisplayName] NVARCHAR(50) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(50) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [AppearanceFeature] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Description] NVARCHAR(MAX) NOT NULL
)
GO

CREATE TABLE [Gender] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(25) NOT NULL
)
GO

CREATE TABLE [Race] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(255) NOT NULL
)
GO

CREATE TABLE [Alignment] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(255) NOT NULL
)
GO

CREATE TABLE [Talent] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Description] NVARCHAR(MAX) NOT NULL,
)
GO

CREATE TABLE [Mannerism] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Description] NVARCHAR(MAX) NOT NULL,
)
GO


CREATE TABLE [InteractionTrait] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Name] NVARCHAR(25) NOT NULL,
)
GO

CREATE TABLE [PlotHook] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [Description] NVARCHAR(MAX) NOT NULL,
)
GO


CREATE TABLE [Character] (
  [Id] INTEGER NOT NULL PRIMARY KEY IDENTITY,
  [UserId] INTEGER NOT NULL,
  [Name] NVARCHAR(55) NOT NULL,
  [Age] INTEGER NOT NULL,
  [GenderId] INTEGER NOT NULL,
  [RaceId] INTEGER NOT NULL,
  [AppearanceFeatureId] INTEGER NOT NULL,
  [AlignmentId] INTEGER NOT NULL,
  [InteractionTraitId] INTEGER NOT NULL,
  [TalentId] INTEGER NOT NULL,
  [MannerismId] INTEGER NOT NULL,
  [PlotHookId] INTEGER NOT NULL,
  [Notes] NVARCHAR(MAX) NOT NULL,

  CONSTRAINT FK_Character_UserProfile FOREIGN KEY (UserId) REFERENCES UserProfile(Id),
  CONSTRAINT FK_Character_Gender FOREIGN KEY (GenderId) REFERENCES Gender(Id),
  CONSTRAINT FK_Character_Race FOREIGN KEY (RaceId) REFERENCES Race(Id),
  CONSTRAINT FK_Character_AppearanceFeature FOREIGN KEY (AppearanceFeatureId) REFERENCES AppearanceFeature(Id),
  CONSTRAINT FK_Character_Alignment FOREIGN KEY (AlignmentId) REFERENCES Alignment(Id),
  CONSTRAINT FK_Character_InteractionTrait FOREIGN KEY (InteractionTraitId) REFERENCES InteractionTrait(Id),
  CONSTRAINT FK_Character_Talent FOREIGN KEY (TalentId) REFERENCES Talent(Id),
  CONSTRAINT FK_Character_Mannerism FOREIGN KEY (MannerismId) REFERENCES Mannerism(Id),
  CONSTRAINT FK_Character_PlotHook FOREIGN KEY (PlotHookId) REFERENCES PlotHook(Id),
)
GO
