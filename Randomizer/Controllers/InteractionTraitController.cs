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
    public class InteractionTraitController : ControllerBase
    {
        private readonly IInteractionTraitRepository _interactionTraitRepository;

        public InteractionTraitController(IInteractionTraitRepository interactionTraitRepository)
        {
            _interactionTraitRepository = interactionTraitRepository;
        }

        //GET: api/<InteractionTraitController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var interactionTraits = _interactionTraitRepository.GetAllInteractionTraits();
            return Ok(interactionTraits);
        }

    }
}
