using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Randomizer.Models;
using Randomizer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Randomizer.Repositories
{
    public class CharacterRepository : BaseRepository, ICharacterRepository
    {
        public CharacterRepository(IConfiguration configuration) : base(configuration) { }

        public List<Character> GetAllCharactersByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id, c.UserId, c.Name AS CharacterName, c.Age, c.GenderId, c.RaceId, c.AppearanceFeatureId,
                                   c.AlignmentId, c.InteractionTraitId, c.TalentId, c.MannerismId, c.PlotHookId, c.Notes,
                                   up.FirebaseUserId, up.Email, up.DisplayName, up.FirstName, up.LastName,
                                   g.Name AS GenderName, r.Name AS RaceName, af.Description AS AppearanceFeatureDescription,
                                   a.Name AS AlignmentName, it.Name AS InteractionTraitName, 
                                   t.Description AS TalentDescription, m.Description AS MannerismDescription, 
                                   ph.Description AS PlotHookDescription 
                            FROM Character c
                                   LEFT JOIN UserProfile up on up.Id = c.UserId
                                   LEFT JOIN Gender g on g.Id = c.GenderId
                                   LEFT JOIN Race r on r.Id = c.RaceId
                                   LEFT JOIN AppearanceFeature af on af.Id = c.AppearanceFeatureId
                                   LEFT JOIN Alignment a on a.Id = c.AlignmentId
                                   LEFT JOIN InteractionTrait it on it.Id = c.InteractionTraitId
                                   LEFT JOIN Talent t on t.Id = c.TalentId
                                   LEFT JOIN Mannerism m on m.Id = c.MannerismId
                                   LEFT JOIN PlotHook ph on ph.Id = c.PlotHookId
                            WHERE up.FirebaseUserId = @firebaseUserId";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();

                    var characters = new List<Character>();

                    while (reader.Read())
                    {
                        characters.Add(NewCharacterFromReader(reader));
                    }
                    reader.Close();

                    return characters;
                }
            }
        }

        public Character GetCharacterById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id, c.UserId, c.Name AS CharacterName, c.Age, c.GenderId, c.RaceId, c.AppearanceFeatureId,
                                   c.AlignmentId, c.InteractionTraitId, c.TalentId, c.MannerismId, c.PlotHookId, c.Notes,
                                   up.FirebaseUserId, up.Email, up.DisplayName, up.FirstName, up.LastName,
                                   g.Name AS GenderName, r.Name AS RaceName, af.Description AS AppearanceFeatureDescription,
                                   a.Name AS AlignmentName, it.Name AS InteractionTraitName, 
                                   t.Description AS TalentDescription, m.Description AS MannerismDescription, 
                                   ph.Description AS PlotHookDescription 
                            FROM Character c
                                   LEFT JOIN UserProfile up on up.Id = c.UserId
                                   LEFT JOIN Gender g on g.Id = c.GenderId
                                   LEFT JOIN Race r on r.Id = c.RaceId
                                   LEFT JOIN AppearanceFeature af on af.Id = c.AppearanceFeatureId
                                   LEFT JOIN Alignment a on a.Id = c.AlignmentId
                                   LEFT JOIN InteractionTrait it on it.Id = c.InteractionTraitId
                                   LEFT JOIN Talent t on t.Id = c.TalentId
                                   LEFT JOIN Mannerism m on m.Id = c.MannerismId
                                   LEFT JOIN PlotHook ph on ph.Id = c.PlotHookId
                            WHERE c.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var character = new Character();

                    if (reader.Read())
                    {
                        character = NewCharacterFromReader(reader);
                    }
                    reader.Close();

                    return character;
                }
            }
        }

        public Character RandomCharacter()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Alignment.Id AS AlignmentId, Alignment.Name AS AlignmentName
	                                           FROM Alignment 
	                                           WHERE Alignment.Id = FLOOR(RAND()*(7)+1);

                                        SELECT Race.Id AS RaceId, Race.Name AS RaceName
	                                           FROM Race 
	                                           WHERE Race.Id = FLOOR(RAND()*(14)+1);

                                        SELECT Gender.Id AS GenderId, Gender.Name AS GenderName
	                                           FROM Gender 
	                                           WHERE Gender.Id = FLOOR(RAND()*(2)+1);

                                        SELECT AppearanceFeature.Id AS AppearanceFeatureId, AppearanceFeature.Description AS AppearanceFeatureDescription
	                                           FROM AppearanceFeature 
	                                           WHERE AppearanceFeature.Id = FLOOR(RAND()*(18)+1);

                                        SELECT InteractionTrait.Id AS InteractionTraitId, InteractionTrait.Name AS InteractionTraitName
	                                           FROM InteractionTrait 
	                                           WHERE InteractionTrait.Id = FLOOR(RAND()*(13)+1);

                                        SELECT Mannerism.Id AS MannerismId, Mannerism.Description AS MannerismDescription
	                                           FROM Mannerism 
	                                           WHERE Mannerism.Id = FLOOR(RAND()*(16)+1);

                                        SELECT Talent.Id AS TalentId, Talent.Description AS TalentDescription
	                                           FROM Talent 
	                                           WHERE Talent.Id = FLOOR(RAND()*(17)+1);

                                        SELECT PlotHook.Id AS PlotHookId, PlotHook.Description AS PlotHookDescription
                                               FROM PlotHook
                                               WHERE PlotHook.Id = FLOOR(RAND()*(21)+1);";

                            

                    var reader = cmd.ExecuteReader();

                    var character = new Character();

                    while (reader.Read())
                    {
                        character.AlignmentId = DbUtils.GetInt(reader, "AlignmentId");
                        character.Alignment = new Alignment()
                        {
                            Id = DbUtils.GetInt(reader, "AlignmentId"),
                            Name = DbUtils.GetString(reader, "AlignmentName")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.RaceId = DbUtils.GetInt(reader, "RaceId");
                        character.Race = new Race()
                        {
                            Id = DbUtils.GetInt(reader, "RaceId"),
                            Name = DbUtils.GetString(reader, "RaceName")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.GenderId = DbUtils.GetInt(reader, "GenderId");
                        character.Gender = new Gender()
                        {
                            Id = DbUtils.GetInt(reader, "GenderId"),
                            Name = DbUtils.GetString(reader, "GenderName")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.AppearanceFeatureId = DbUtils.GetInt(reader, "AppearanceFeatureId");
                        character.AppearanceFeature = new AppearanceFeature()
                        {
                            Id = DbUtils.GetInt(reader, "AppearanceFeatureId"),
                            Description = DbUtils.GetString(reader, "AppearanceFeatureDescription")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.InteractionTraitId = DbUtils.GetInt(reader, "InteractionTraitId");
                        character.InteractionTrait = new InteractionTrait()
                        {
                            Id = DbUtils.GetInt(reader, "InteractionTraitId"),
                            Name = DbUtils.GetString(reader, "InteractionTraitName")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.MannerismId = DbUtils.GetInt(reader, "MannerismId");
                        character.Mannerism = new Mannerism()
                        {
                            Id = DbUtils.GetInt(reader, "MannerismId"),
                            Description = DbUtils.GetString(reader, "MannerismDescription")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.TalentId = DbUtils.GetInt(reader, "TalentId");
                        character.Talent = new Talent()
                        {
                            Id = DbUtils.GetInt(reader, "TalentId"),
                            Description = DbUtils.GetString(reader, "TalentDescription")
                        };
                    }
                    reader.NextResult();
                    while (reader.Read())
                    {
                        character.PlotHookId = DbUtils.GetInt(reader, "PlotHookId");
                        character.PlotHook = new PlotHook()
                        {
                            Id = DbUtils.GetInt(reader, "PlotHookId"),
                            Description = DbUtils.GetString(reader, "PlotHookDescription")
                        };
                    }
                    reader.Close();
                    return character;
                }
            }
        }

        public void AddCharacter(Character character)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO Character ( 
                                            UserId, Name, Age, GenderId, RaceId, AppearanceFeatureId,
                                            AlignmentId, InteractionTraitId, TalentId, MannerismId, PlotHookId, Notes )
                                OUTPUT INSERTED.ID
                                VALUES (
                                            @UserId, @Name, @Age, @GenderId, @RaceId, @AppearanceFeatureId,
                                            @AlignmentId, @InteractionTraitId, @TalentId, @MannerismId, @PlotHookId, @Notes )";
                    DbUtils.AddParameter(cmd, "@UserId", character.UserId);
                    DbUtils.AddParameter(cmd, "@Name", character.Name);
                    DbUtils.AddParameter(cmd, "@Age", character.Age);
                    DbUtils.AddParameter(cmd, "@GenderId", character.GenderId);
                    DbUtils.AddParameter(cmd, "@RaceId", character.RaceId);
                    DbUtils.AddParameter(cmd, "@AppearanceFeatureId", character.AppearanceFeatureId);
                    DbUtils.AddParameter(cmd, "@AlignmentId", character.AlignmentId);
                    DbUtils.AddParameter(cmd, "@InteractionTraitId", character.InteractionTraitId);
                    DbUtils.AddParameter(cmd, "@TalentId", character.TalentId);
                    DbUtils.AddParameter(cmd, "@MannerismId", character.MannerismId);
                    DbUtils.AddParameter(cmd, "@PlotHookId", character.PlotHookId);
                    DbUtils.AddParameter(cmd, "@Notes", character.Notes);


                    character.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public void UpdateCharacter(Character character)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Character
                                SET 
                                    Name = @Name,
                                    Age = @Age,
                                    GenderId = @GenderId,
                                    RaceId = @RaceId,
                                    AppearanceFeatureId = @AppearanceFeatureId,
                                    AlignmentId = @AlignmentId,
                                    InteractionTraitId = @InteractionTraitId,
                                    TalentId = @TalentId,
                                    MannerismId = @MannerismId,
                                    PlotHookId = @PlotHookId,
                                    Notes = @Notes
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Name", character.Name);
                    DbUtils.AddParameter(cmd, "@Age", character.Age);
                    DbUtils.AddParameter(cmd, "@GenderId", character.GenderId);
                    DbUtils.AddParameter(cmd, "@RaceId", character.RaceId);
                    DbUtils.AddParameter(cmd, "@AppearanceFeatureId", character.AppearanceFeatureId);
                    DbUtils.AddParameter(cmd, "@AlignmentId", character.AlignmentId);
                    DbUtils.AddParameter(cmd, "@InteractionTraitId", character.InteractionTraitId);
                    DbUtils.AddParameter(cmd, "@TalentId", character.TalentId);
                    DbUtils.AddParameter(cmd, "@MannerismId", character.MannerismId);
                    DbUtils.AddParameter(cmd, "@PlotHookId", character.PlotHookId);
                    DbUtils.AddParameter(cmd, "@Notes", character.Notes);
                    DbUtils.AddParameter(cmd, "@id", character.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCharacter(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                DELETE FROM Character 
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Character NewCharacterFromReader(SqlDataReader reader)
        {
            return new Character()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                    Email = DbUtils.GetString(reader, "Email"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName")
                },
                Name = DbUtils.GetString(reader, "CharacterName"),
                Age = DbUtils.GetInt(reader, "Age"),
                GenderId = DbUtils.GetInt(reader, "GenderId"),
                Gender = new Gender()
                {
                    Id = DbUtils.GetInt(reader, "GenderId"),
                    Name = DbUtils.GetString(reader, "GenderName")
                },
                RaceId = DbUtils.GetInt(reader, "RaceId"),
                Race = new Race()
                {
                    Id = DbUtils.GetInt(reader, "RaceId"),
                    Name = DbUtils.GetString(reader, "RaceName")
                },
                AppearanceFeatureId = DbUtils.GetInt(reader, "AppearanceFeatureId"),
                AppearanceFeature = new AppearanceFeature()
                {
                    Id = DbUtils.GetInt(reader, "AppearanceFeatureId"),
                    Description = DbUtils.GetString(reader, "AppearanceFeatureDescription")
                },
                AlignmentId = DbUtils.GetInt(reader, "AlignmentId"),
                Alignment = new Alignment()
                {
                    Id = DbUtils.GetInt(reader, "AlignmentId"),
                    Name = DbUtils.GetString(reader, "AlignmentName")
                },
                InteractionTraitId = DbUtils.GetInt(reader, "InteractionTraitId"),
                InteractionTrait = new InteractionTrait()
                {
                    Id = DbUtils.GetInt(reader, "InteractionTraitId"),
                    Name = DbUtils.GetString(reader, "InteractionTraitName")
                },
                TalentId = DbUtils.GetInt(reader, "TalentId"),
                Talent = new Talent()
                {
                    Id = DbUtils.GetInt(reader, "TalentId"),
                    Description = DbUtils.GetString(reader, "TalentDescription")
                },
                MannerismId = DbUtils.GetInt(reader, "MannerismId"),
                Mannerism = new Mannerism()
                {
                    Id = DbUtils.GetInt(reader, "MannerismId"),
                    Description = DbUtils.GetString(reader, "MannerismDescription")
                },
                PlotHookId = DbUtils.GetInt(reader, "PlotHookId"),
                PlotHook = new PlotHook()
                {
                    Id = DbUtils.GetInt(reader, "PlotHookId"),
                    Description = DbUtils.GetString(reader, "PlotHookDescription")
                },
                Notes = DbUtils.GetString(reader, "Notes")
            };
        }
    }
}
