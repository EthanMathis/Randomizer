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
    public class AppearanceFeatureController : ControllerBase
    {
        private readonly IAppearanceFeatureRepository _appearanceFeatureRepository;

        public AppearanceFeatureController(IAppearanceFeatureRepository appearanceFeatureRepository)
        {
            _appearanceFeatureRepository = appearanceFeatureRepository;
        }

        //GET: api/<AlignmentController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var appearanceFeatures = _appearanceFeatureRepository.GetAllAppearanceFeatures();
            return Ok(appearanceFeatures);
        }

    }
}
