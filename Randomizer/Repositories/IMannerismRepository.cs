using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IMannerismRepository
    {
        List<Mannerism> GetAllMannerisms();
    }
}