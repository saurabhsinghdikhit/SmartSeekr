using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Entities.Models
{
    public class ProfessionalDetailsModel
    {
        public Guid? Id { get; set; }
        [Required(ErrorMessage ="User Id is required")]
        public Guid UserId { get; set; }
        [Required(ErrorMessage = "Job title is required")]
        [MaxLength(50, ErrorMessage = "Job title should not be more than 50 character")]
        public string? JobTitle { get; set; }
        [Required(ErrorMessage = "Company name is required")]
        [MaxLength(100, ErrorMessage = "Company name should not be more than 100 character")]
        public string? CompanyName { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "Start date is required")]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsWorking { get; set; }
        public bool IsDeleted { get; set; }

    }
}
