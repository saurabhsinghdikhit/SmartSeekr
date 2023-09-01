using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Jobs
{
    public class JobSchedule
    {
        public Guid Id { get; set; }
        public string? ScheduleName { get; set; }
        public string? ShortName { get; set; }
    }
}
