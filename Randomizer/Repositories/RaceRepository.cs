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
    public class RaceRepository : BaseRepository, IRaceRepository
    {
        public RaceRepository(IConfiguration configuration) : base(configuration) { }

        public List<Race> GetAllRaces()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name
                            FROM Race";

                    var reader = cmd.ExecuteReader();

                    var races = new List<Race>();

                    while (reader.Read())
                    {
                        races.Add(NewRaceFromReader(reader));
                    }
                    reader.Close();

                    return races;
                }
            }
        }

        private Race NewRaceFromReader(SqlDataReader reader)
        {
            return new Race()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }

    }
}
