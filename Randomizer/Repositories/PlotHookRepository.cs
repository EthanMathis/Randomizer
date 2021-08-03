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
    public class PlotHookRepository : BaseRepository, IPlotHookRepository
    {
        public PlotHookRepository(IConfiguration configuration) : base(configuration) { }

        public List<PlotHook> GetAllPlotHooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, Description
                                        FROM PlotHook";
                    var reader = cmd.ExecuteReader();

                    var plotHooks = new List<PlotHook>();

                    while (reader.Read())
                    {
                        plotHooks.Add(NewPlotHookFromReader(reader));
                    }
                    reader.Close();

                    return plotHooks;
                }
            }
        }

        private PlotHook NewPlotHookFromReader(SqlDataReader reader)
        {
            return new PlotHook()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Description = DbUtils.GetString(reader, "Description")
            };
        }
    }
}
