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
    public class MannerismController : ControllerBase
    {
        private readonly IMannerismRepository _mannerismRepository;

        public MannerismController(IMannerismRepository mannerismRepository)
        {
            _mannerismRepository = mannerismRepository;
        }

        //GET: api/<InteractionTraitController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var mannerisms = _mannerismRepository.GetAllMannerisms();
            return Ok(mannerisms);
        }

    }
}
