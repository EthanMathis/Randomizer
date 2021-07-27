using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Models;
using Randomizer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Randomizer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly ICharacterRepository _characterRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CharacterController(ICharacterRepository characterRepository, 
                                   IUserProfileRepository userProfileRepository)
        {
            _characterRepository = characterRepository;
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<CharacterController>
        [HttpGet]
        public IActionResult GetAllFromUser()
        {
            string currentUserProfileId = GetCurrentFirebaseUserProfileId();
            var characters = _characterRepository.GetAllCharactersByUserId(currentUserProfileId);
            if (characters == null)
            {
                return NotFound();
            }

            return Ok(characters);
        }

        // GET api/<CharacterController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var character = _characterRepository.GetCharacterById(id);
            if (character == null)
            {
                return NotFound();
            }
            return Ok(character);
        }

        [HttpGet("random/")]
        public IActionResult GetRandomCharacter()
        {
            var character = _characterRepository.RandomCharacter();
            return Ok(character);
        }

        // POST api/<CharacterController>
        [HttpPost]
        public IActionResult SaveCharacter(Character character)
        {
            var currentUserProfile = GetCurrentUserProfile();
            character.UserId = currentUserProfile.Id;

            _characterRepository.AddCharacter(character);
            return CreatedAtAction(nameof(GetAllFromUser), new { id = character.Id }, character);
        }

        // PUT api/<CharacterController>/5
        [HttpPut("{id}")]
        public IActionResult EditCharacter(int id, Character character)
        {
            if (id != character.Id)
            {
                return BadRequest();
            }
            _characterRepository.UpdateCharacter(character);
            return NoContent();
        }

        // DELETE api/<CharacterController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _characterRepository.DeleteCharacter(id);
            return NoContent();
        }

        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
