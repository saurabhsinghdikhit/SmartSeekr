using System.ComponentModel.DataAnnotations;

namespace JobSeekr.Entities.Models
{
    public class UserModel
    {
        [Key]
        public Guid? ID { get; set; }
        public Guid? UserType { get; set; }

        [Required(ErrorMessage = "Please enter Email")]
        [DataType(DataType.EmailAddress)]
        [MaxLength(100)]
        [RegularExpression(@"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}", ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Please enter Password")]
        [StringLength(maximumLength: 30, MinimumLength = 6, ErrorMessage = "Password length shoud be between 6 to 30 characters")]
        [DataType(DataType.Password)]
        [MaxLength(50)]
        public string? Password { get; set; }
        public string? UserTypeValue { get; set; }
        public EmployeeModel? Employee { get; set; }
        public EmployerModel? Employer { get; set; }
        public EmployeeResumeModel? EmployeeResume { get; set; }
    }
}
