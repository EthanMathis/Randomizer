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
    public class MannerismRepository : BaseRepository, IMannerismRepository
    {
        public MannerismRepository(IConfiguration configuration) : base(configuration) { }

        public List<Mannerism> GetAllMannerisms()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Description
                            FROM Mannerism";

                    var reader = cmd.ExecuteReader();

                    var mannerisms = new List<Mannerism>();

                    while (reader.Read())
                    {
                        mannerisms.Add(NewMannerismFromReader(reader));
                    }
                    reader.Close();

                    return mannerisms;
                }
            }
        }

        private Mannerism NewMannerismFromReader(SqlDataReader reader)
        {
            return new Mannerism()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Description = DbUtils.GetString(reader, "Description")
            };
        }

    }
}
