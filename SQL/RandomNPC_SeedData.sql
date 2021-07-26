SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseUserId], [Email], [DisplayName], [FirstName], [LastName])
VALUES
  (5, '1OLa3ATuIeaOtIq7JSbDgHbbbDr2', 'ethan@me.com', 'thatOneGuy', 'Ethan', 'Mathis'),
  (6, '4BT4CoZyzySQWqrlJfxOHKMZ2F22', 'ryan@me.com', 'Nerd', 'Ryan', 'Mathis');
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [AppearanceFeature] ON
INSERT INTO [AppearanceFeature]
  ([Id], [Description])
VALUES
  (1, 'Distinctive jewelry: earrings, necklace, circlet, bracelets'),
  (2, 'Piercings'),
  (3, 'Flamboyant or outlandish clothes'),
  (4, 'Formal, clean clothes'),
  (5, 'Ragged, dirty clothes'),
  (6, 'Pronounced scar'),
  (7, 'Missing teeth'),
  (8, 'Has a pet or familiar'),
  (9, 'Unusual eye color (or two different colors)'),
  (10, 'Tattoos'),
  (11, 'Birthmark'),
  (12, 'Bald'),
  (13, 'Braided beard and/or hair'),
  (14, 'Unusual hair color'),
  (15, 'Nervous eye twitch'),
  (16, 'Distinctive posture (crooked or rigid)'),
  (17, 'Exceptionally beautiful'),
  (18, 'Exceptionally ugly');
SET IDENTITY_INSERT [AppearanceFeature] OFF


SET IDENTITY_INSERT [Gender] ON
INSERT INTO [Gender]
  ([Id], [Name])
VALUES
  (1, 'Male'),
  (2, 'Female'),
  (3, 'Other');
SET IDENTITY_INSERT [Gender] OFF


SET IDENTITY_INSERT [Race] ON
INSERT INTO [Race]
  ([Id], [Name])
VALUES
  (1, 'Aasimar'),
  (2, 'Dragonborn'),
  (3, 'Dwarf'),
  (4, 'Elf'),
  (5, 'Gnome'),
  (6, 'Half-Elf'),
  (7, 'Half-Orc'),
  (8, 'Halfling'),
  (9, 'Human'),
  (10, 'Tiefling'),
  (11, 'Goliath'),
  (12, 'Tabaxi'),
  (13, 'Genasi'),
  (14, 'Goblin');
SET IDENTITY_INSERT [Race] OFF


SET IDENTITY_INSERT [Alignment] ON
INSERT INTO [Alignment]
  ([Id], [Name])
VALUES
  (1, 'Lawful Good'),
  (2, 'Lawful Neutral'),
  (3, 'Lawful Evil'),
  (4, 'True Neutral'),
  (5, 'Chaotic Good'),
  (6, 'Chaotic Neutral'),
  (7, 'Chaotic Evil');
SET IDENTITY_INSERT [Alignment] OFF


SET IDENTITY_INSERT [Talent] ON
INSERT INTO [Talent]
  ([Id], [Description])
VALUES
  (1, 'Plays a musical instrument'),
  (2, 'Speaks several languages fluently'),
  (3, 'Unbelievably lucky'),
  (4, 'Perfect memory'),
  (5, 'Great with animals'),
  (6, 'Great at solving puzzles'),
  (7, 'Great at impersonations'),
  (8, 'Draws beautifully'),
  (9, 'Paints beautifully'),
  (10, 'Sings beautifully'),
  (11, 'Drinks everyone under the table'),
  (12, 'Skilled actor and master of disguise'),
  (13, 'Knows thieves’ cant'),
  (14, 'Skilled dancer'),
  (15, 'Knows a cantrip (Thaumaturgy, Prestidigitation or Druidcraft'),
  (16, 'Exceptional storyteller'),
  (17, 'Expert with a longbow');
SET IDENTITY_INSERT [Talent] OFF


SET IDENTITY_INSERT [Mannerism] ON
INSERT INTO [Mannerism]
  ([Id], [Description])
VALUES
  (1, 'Prone to singing, whistling, or humming quietly'),
  (2, 'Speaks in rhyme or some other peculiar way'),
  (3, 'Particularly low or high voice'),
  (4, 'Slurs words, lisps, or stutters'),
  (5, 'Enunciates overly clearly'),
  (6, 'Speaks loudly'),
  (7, 'Whispers'),
  (8, 'Uses flowery speech or long words'),
  (9, 'Frequently forgets what they are talking about'),
  (10, 'Uses colorful oaths and exclamations'),
  (11, 'Makes constant jokes or puns'),
  (12, 'Prone to predictions of doom'),
  (13, 'Constantly fidgets'),
  (14, 'Always squints'),
  (15, 'Periodically stares into the distance'),
  (16, 'Paces'),
  (17, 'Twirls hair or tugs beard');
SET IDENTITY_INSERT [Mannerism] OFF


SET IDENTITY_INSERT [InteractionTrait] ON
INSERT INTO [InteractionTrait]
  ([Id], [Name])
VALUES
  (1, 'Argumentative'),
  (2, 'Arrogant'),
  (3, 'Blustering'),
  (4, 'Rude'),
  (5, 'Curious'),
  (6, 'Friendly'),
  (7, 'Honest'),
  (8, 'Hot tempered'),
  (9, 'Irritable'),
  (10, 'Ponderous'),
  (11, 'Quiet'),
  (12, 'Suspicious'),
  (13, 'Polite');
SET IDENTITY_INSERT [InteractionTrait] OFF
