using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Employees
{
    public class EducationDetail
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string DegreeName { get; set; }
        public string UniversityName { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public decimal CGPA { get; set; }
        public bool IsPursuing { get; set; }
        public bool IsDeleted { get; set; }
    }
}
