using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IAlignmentRepository
    {
        List<Alignment> GetAllAlignments();
    }
}