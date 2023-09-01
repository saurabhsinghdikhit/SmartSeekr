using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobSeekr.Entities.Models
{
    [Table("Employee")]
    public class EmployeeModel
    {
        public Guid? Id { get; set; }
        public Guid? UserId { get; set; }
        [MaxLength(50,ErrorMessage ="First name should not be more than 50 characters")]
        public string? FirstName { get; set; }
        [MaxLength(50, ErrorMessage = "Last name should not be more than 50 characters")]
        public string? LastName { get; set; }
        public string? ContactNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [MaxLength(100, ErrorMessage = "Address should not be more than 100 characters")]
        public string? Address { get; set; }
        [MaxLength(50, ErrorMessage = "City should not be more than 50 character")]
        public string? City { get; set; }
        [MaxLength(50, ErrorMessage = "Provice should not be more than 50 character")]
        public string? Province { get; set; }
        [MaxLength(50, ErrorMessage = "Country should not be more than 50 character")]
        public string? Country { get; set; }
        public string? Pincode { get; set; }
        public bool IsDeleted { get; set; }
        public string? UserImage { get; set; }
    }
}
