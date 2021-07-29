﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Randomizer.Models;
using Randomizer.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Randomizer.Repositories
{
    public class AlignmentRepository : BaseRepository, IAlignmentRepository
    {
        public AlignmentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Alignment> GetAllAlignments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Name
                            FROM Alignment";

                    var reader = cmd.ExecuteReader();

                    var alignments = new List<Alignment>();

                    while (reader.Read())
                    {
                        alignments.Add(NewAlignmentFromReader(reader));
                    }
                    reader.Close();

                    return alignments;
                }
            }
        }

        private Alignment NewAlignmentFromReader(SqlDataReader reader)
        {
            return new Alignment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }

    }
}
