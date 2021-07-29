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
    public class TalentController : ControllerBase
    {
        private readonly ITalentRepository _talentRepository;

        public TalentController(ITalentRepository talentRepository)
        {
            _talentRepository = talentRepository;
        }

        //GET: api/<TalentController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var talents = _talentRepository.GetAllTalents();
            return Ok(talents);
        }

    }
}
