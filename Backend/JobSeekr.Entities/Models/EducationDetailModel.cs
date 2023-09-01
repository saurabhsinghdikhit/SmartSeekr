using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Entities.Models
{
    public class EducationDetailModel
    {
        public Guid? Id { get; set; }
        [Required(ErrorMessage ="User id is required")]
        public Guid UserId { get; set; }
        [Required(ErrorMessage = "Degree is required")]
        [MaxLength(50, ErrorMessage = "Degree should not be more than 50 character")]
        public string DegreeName { get; set; }
        [Required(ErrorMessage = "University is required")]
        [MaxLength(100, ErrorMessage = "University name should not be more than 100 character")]
        public string UniversityName { get; set; }
        [Required(ErrorMessage = "Starting date is required")]
        public DateTime StartingDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public decimal CGPA { get; set; }
        public bool IsPursuing { get; set; }
        public bool IsDeleted { get; set; }
    }
}
