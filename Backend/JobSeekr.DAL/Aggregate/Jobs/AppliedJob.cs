using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Jobs
{
    public class AppliedJob
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid JobId { get; set; }
        public DateTime AppliedOn { get; set; }
    }
}
