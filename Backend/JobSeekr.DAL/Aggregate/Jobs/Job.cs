using System.ComponentModel.DataAnnotations.Schema;

namespace JobSeekr.DAL.Aggregate.Jobs
{
    public class Job
    {
        public Guid Id { get; set; }
        [ForeignKey("employer_id")]
        [Column("employer_id")]
        public Guid EmployerId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Salary { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Province { get; set; }
        public string? Pincode { get; set; }
        public string? Country { get; set; }
        public string? SalaryBasedOn { get; set; }
        public int? NoOfPeople { get; set; }
        public DateTime? Created_At { get; set; }
        public string? JobType { get; set; }
        public string? Schedule { get; set; }
        public Employer? Employer { get; set; }
    }
}