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
    public class AppearanceFeatureRepository : BaseRepository, IAppearanceFeatureRepository
    {
        public AppearanceFeatureRepository(IConfiguration configuration) : base(configuration) { }

        public List<AppearanceFeature> GetAllAppearanceFeatures()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Description
                            FROM AppearanceFeature";

                    var reader = cmd.ExecuteReader();

                    var features = new List<AppearanceFeature>();

                    while (reader.Read())
                    {
                        features.Add(NewAppearanceFeatureFromReader(reader));
                    }
                    reader.Close();

                    return features;
                }
            }

        }

        private AppearanceFeature NewAppearanceFeatureFromReader(SqlDataReader reader)
        {
            return new AppearanceFeature()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Description = DbUtils.GetString(reader, "Description")
            };
        }

    }
}
