using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface IPlotHookRepository
    {
        List<PlotHook> GetAllPlotHooks();
    }
}