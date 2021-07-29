using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface ITalentRepository
    {
        List<Talent> GetAllTalents();
    }
}