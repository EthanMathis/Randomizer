using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IRaceRepository
    {
        List<Race> GetAllRaces();
    }
}