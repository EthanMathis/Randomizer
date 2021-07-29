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
    public class InteractionTraitRepository : BaseRepository, IInteractionTraitRepository
    {
        public InteractionTraitRepository(IConfiguration configuration) : base(configuration) { }

        public List<InteractionTrait> GetAllInteractionTraits()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name
                            FROM InteractionTrait";

                    var reader = cmd.ExecuteReader();

                    var traits = new List<InteractionTrait>();

                    while (reader.Read())
                    {
                        traits.Add(NewInteractionTraitFromReader(reader));
                    }
                    reader.Close();

                    return traits;
                }
            }
        }

        private InteractionTrait NewInteractionTraitFromReader(SqlDataReader reader)
        {
            return new InteractionTrait()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }

    }
}
