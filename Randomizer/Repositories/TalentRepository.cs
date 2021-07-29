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
    public class TalentRepository : BaseRepository, ITalentRepository
    {
        public TalentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Talent> GetAllTalents()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Description
                            FROM Talent";

                    var reader = cmd.ExecuteReader();

                    var talents = new List<Talent>();

                    while (reader.Read())
                    {
                        talents.Add(NewTalentFromReader(reader));
                    }
                    reader.Close();

                    return talents;
                }
            }
        }

        private Talent NewTalentFromReader(SqlDataReader reader)
        {
            return new Talent()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Description = DbUtils.GetString(reader, "Description")
            };
        }

    }
}
