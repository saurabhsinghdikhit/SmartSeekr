using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace JobSeekr.Entities.Models
{
    public class EmployeeResumeModel
    {
        public Guid? ID { get; set; }
        public Guid UserId { get; set; }
        public string? FileName { get; set; }
        public string? ResumeUrl { get; set; }
    }
}
