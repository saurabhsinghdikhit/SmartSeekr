using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Employees
{
    public class EmployeeResume
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string? ResumeUrl { get; set; }

    }
}
