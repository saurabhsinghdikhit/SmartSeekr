﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.DAL.Aggregate.Jobs
{
    public class JobType
    {
        public Guid Id { get; set; }
        public string? TypeName { get; set; }
        public string? ShortName { get; set; }
    }
}
