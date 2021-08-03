using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Randomizer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlotHookController : ControllerBase
    {
        private readonly IPlotHookRepository _plotHookRepository;

        public PlotHookController(IPlotHookRepository plotHookRepository)
        {
            _plotHookRepository = plotHookRepository;
        }

        //GET: api/<PlotHookController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var plotHooks = _plotHookRepository.GetAllPlotHooks();
            return Ok(plotHooks);
        }
    }
}
