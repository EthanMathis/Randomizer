using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IInteractionTraitRepository
    {
        List<InteractionTrait> GetAllInteractionTraits();
    }
}