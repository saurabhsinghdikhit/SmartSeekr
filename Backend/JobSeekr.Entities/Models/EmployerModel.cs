using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Entities.Models
{
    public class EmployerModel
    {
        public Guid Id { get; set; }
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
    }
}
