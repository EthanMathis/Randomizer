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
    public class GenderController : ControllerBase
    {
        private readonly IGenderRepository _genderRepository;

        public GenderController(IGenderRepository genderRepository)
        {
            _genderRepository = genderRepository;
        }

        //GET: api/<GenderController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var genders = _genderRepository.GetAllGenders();
            return Ok(genders);
        }

    }
}
