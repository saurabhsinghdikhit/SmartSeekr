using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobSeekr.DAL.Aggregate.Employees;
using JobSeekr.DAL.Aggregate.Jobs;

namespace JobSeekr.DAL.Aggregate
{
    public class User
    {
        [Key]
        public Guid ID { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public Guid UserTypeId { get; set; }
        public UserType? UserType { get; set; }
        public Employee? Employee { get; set; }
        public Employer? Employer { get; set; }
        public AppliedJob? AppliedJob { get; set; }
        public EmployeeResume EmployeeResume { get; set; }
    }
}
