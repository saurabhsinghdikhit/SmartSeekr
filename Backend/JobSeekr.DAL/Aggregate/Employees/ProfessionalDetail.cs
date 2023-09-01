namespace JobSeekr.DAL.Aggregate.Employees
{
    public class ProfessionalDetail
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? JobTitle { get; set; }
        public string? CompanyName { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsWorking { get; set; }
        public bool IsDeleted { get; set; }
    }
}
