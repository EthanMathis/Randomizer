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
    public class CharacterRepository : BaseRepository
    {
        public CharacterRepository(IConfiguration configuration) : base(configuration) { }

        public List<Character> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id, c.UserId, c.Name AS CharacterName, c.Age, c.GenderId, c.RaceId, c.AppearanceFeatureId,
                                   c.InteractionTraitId, c.TalentId, c.MannerismId, c.Notes,
                                   up.FirebaseUserId, up.Email, up.DisplayName, up.FirstName, up.LastName,
                                   g.Name AS GenderName, r.Name AS RaceName, af.Description AS AppearanceFeatureDescription,
                                   it.Name AS InteractionTraitName, t.Description AS TalentDescription, m.Description AS MannerismDescription
                            FROM Character c
                                   LEFT JOIN UserProfile up on up.Id = c.UserId
                                   LEFT JOIN Gender g on g.Id = c.GenderId
                                   LEFT JOIN Race r on r.Id = c.RaceId
                                   LEFT JOIN AppearanceFeature af on af.Id = c.AppearanceFeatureId
                                   LEFT JOIN InteractionTrait it on it.Id = c.InteractionTraitId
                                   LEFT JOIN Talent t on t.Id = c.TalentId
                                   LEFT JOIN Mannerism m on m.Id = c.MannerismId
                            WHERE UserId = @userID";
                    DbUtils.AddParameter(cmd, "@userId", userId);

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
                Notes = DbUtils.GetString(reader, "Notes")
            };
        }
    }
}
