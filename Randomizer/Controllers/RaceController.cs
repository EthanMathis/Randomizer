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
    public class RaceController : ControllerBase
    {
        private readonly IRaceRepository _raceRepository;

        public RaceController(IRaceRepository raceRepository)
        {
            _raceRepository = raceRepository;
        }

        //GET: api/<RaceController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var races = _raceRepository.GetAllRaces();
            return Ok(races);
        }

    }
}
