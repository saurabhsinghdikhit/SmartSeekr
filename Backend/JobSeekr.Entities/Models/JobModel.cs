using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSeekr.Entities.Models
{
    [Table("Job")]
    public class JobModel
    {
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "Employer id is required!")]
        public Guid? EmployerId { get; set; }
        [Required(ErrorMessage = "Title is required!")]
        [MaxLength(255, ErrorMessage = "First name should not be more than 255 characters")]
        public string? Title { get; set; }
        [Required(ErrorMessage = "Description is required!")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "Salary is required!")]
        [Range(1,float.MaxValue)]
        public decimal? Salary { get; set; }
        [Required(ErrorMessage = "Address is required!")]
        public string? Address { get; set; }
        [Required(ErrorMessage = "City is required!")]
        public string? City { get; set; }
        [Required(ErrorMessage = "Province is required!")]
        public string? Province { get; set; }
        public string? Country { get; set; }
        
        public string? SalaryBasedOn { get; set; }
        public int NoOfPeople { get; set; }
        [Required(ErrorMessage = "Pincode is required!")]
        public string? Pincode { get; set; }
        public DateTime? Created_At { get; set; }
        public string? JobType { get; set; }

        public string? Schedule { get; set; }
        public EmployerModel? Employer { get; set; }
    }
}