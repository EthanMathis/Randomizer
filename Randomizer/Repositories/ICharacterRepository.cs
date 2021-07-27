using Randomizer.Models;
using System.Collections.Generic;

namespace Randomizer.Repositories
{
    public interface ICharacterRepository
    {
        void AddCharacter(Character character);
        void DeleteCharacter(int id);
        List<Character> GetAllCharactersByUserId(string firebaseUserId);
        Character GetCharacterById(int id);
        void UpdateCharacter(Character character);
        Character RandomCharacter();
    }
}