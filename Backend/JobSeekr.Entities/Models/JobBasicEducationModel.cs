using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Entities.Models
{
    public class JobBasicEducationModel
    {
        public Guid Id { get; set; }
        public string? BasicEducation { get; set; }
        public string? ShortBasicEducationName { get; set; }
    }
}
