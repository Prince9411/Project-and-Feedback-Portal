using System.Collections.Generic;

namespace FinalProject.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string? Title { get; set; }
        public string? Supervisor { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }

        // Navigation property
        public List<Feedback>? Feedbacks { get; set; }
    }
}
