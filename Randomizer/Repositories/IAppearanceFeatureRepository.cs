using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IAppearanceFeatureRepository
    {
        List<AppearanceFeature> GetAllAppearanceFeatures();
    }
}