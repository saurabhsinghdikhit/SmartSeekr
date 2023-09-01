using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Employees
{
    public class Employee
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Province { get; set; }
        public string? Country { get; set; }
        public string? Pincode { get; set; }
        public string? UserImage { get; set; }
        public bool IsDeleted { get; set; }
        public User? User { get; set; }
    }
}
