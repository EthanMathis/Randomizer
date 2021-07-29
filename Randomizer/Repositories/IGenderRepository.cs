using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IGenderRepository
    {
        List<Gender> GetAllGenders();
    }
}