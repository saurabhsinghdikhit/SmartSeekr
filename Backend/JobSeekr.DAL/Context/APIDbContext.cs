using JobSeekr.DAL.Aggregate;
using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.DAL.Aggregate.Jobs;
using Microsoft.EntityFrameworkCore;

namespace JobSeekr.DAL.Context
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<EducationDetail> EducationDetails { get; set; }
        public DbSet<ProfessionalDetail> ExperienceDetails { get; set; }
        public DbSet<EmployeeResume> EmployeeResumes { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<JobSchedule> JobSchedules { get; set; }
        public DbSet<JobBasicEducation> JobBasicRequiredEducation { get; set; }
        public DbSet<AppliedJob> AppliedJobs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Job>()
                            .HasOne(j => j.Employer)
                            .WithMany(e => e.Jobs)
                            .HasForeignKey(j => j.EmployerId);
        }
    }
}