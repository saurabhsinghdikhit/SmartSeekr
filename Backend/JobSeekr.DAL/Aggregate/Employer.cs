using System.ComponentModel.DataAnnotations.Schema;
using JobSeekr.DAL.Aggregate.Jobs;

namespace JobSeekr.DAL.Aggregate
{
    public class Employer
    {
        public Guid Id { get; set; }

        [ForeignKey("user_id")]
        public Guid UserId { get; set; }

        public string? CompanyName { get; set; }
        public string? CompanyEmail { get; set; }
        public string? CompanyNumber { get; set; }
        public string? CompanyLogo { get; set; }
        public string? CompanyIndustry { get; set; }
        public string? CompanyDescription { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Province { get; set; }
        public string? Country { get; set; }
        public string? Pincode { get; set; }
        public bool IsDeleted { get; set; }
        public User? User { get; set; }
        public List<Job>? Jobs { get; set; }
    }
}