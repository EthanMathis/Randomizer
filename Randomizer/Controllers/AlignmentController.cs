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
    public class AlignmentController : ControllerBase
    {
        private readonly IAlignmentRepository _alignmentRepository;

        public AlignmentController(IAlignmentRepository alignmentRepository)
        {
            _alignmentRepository = alignmentRepository;
        }

        //GET: api/<AlignmentController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var alignments = _alignmentRepository.GetAllAlignments();
            return Ok(alignments);
        }
    }
}
