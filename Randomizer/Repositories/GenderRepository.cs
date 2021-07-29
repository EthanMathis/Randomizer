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
    public class GenderRepository : BaseRepository, IGenderRepository
    {
        public GenderRepository(IConfiguration configuration) : base(configuration) { }

        public List<Gender> GetAllGenders()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name
                            FROM Gender";

                    var reader = cmd.ExecuteReader();

                    var genders = new List<Gender>();

                    while (reader.Read())
                    {
                        genders.Add(NewGenderFromReader(reader));
                    }
                    reader.Close();

                    return genders;
                }
            }
        }

        private Gender NewGenderFromReader(SqlDataReader reader)
        {
            return new Gender()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }

    }
}
