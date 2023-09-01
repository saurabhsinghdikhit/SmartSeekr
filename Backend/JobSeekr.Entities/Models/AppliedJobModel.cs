using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSeekr.Entities.Models
{
    [Table("AppliedJobs")]
    public class AppliedJobModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobId { get; set; }
        public DateTime AppliedOn { get; set; }
        public JobModel Job { get; set; } = new JobModel();
        public UserModel User { get; set; } = new UserModel();
    }
}