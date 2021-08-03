using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Randomizer.Models
{
    public class Character
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }

        public string Name { get; set; }
        public int Age { get; set; }

        public int GenderId { get; set; }
        public Gender Gender { get; set; }

        public int RaceId { get; set; }
        public Race Race { get; set; }

        public int AppearanceFeatureId { get; set; }
        public AppearanceFeature AppearanceFeature { get; set; }

        public int AlignmentId { get; set; }
        public Alignment Alignment { get; set; }

        public int InteractionTraitId { get; set; }
        public InteractionTrait InteractionTrait { get; set; }

        public int TalentId { get; set; }
        public Talent Talent { get; set; }

        public int MannerismId { get; set; }
        public Mannerism Mannerism { get; set; }

        public int PlotHookId { get; set; }
        public PlotHook PlotHook { get; set; }

        public string Notes { get; set; }
    }
}
