using System;

namespace FinalProject.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }   // Primary key (auto increment)

        public int ProjectId { get; set; }    // Foreign key -> Projects table
        public Project? Project { get; set; } // Navigation property to Project

        public string? FeedbackText { get; set; }  // Feedback content
        public DateTime FeedbackDate { get; set; } = DateTime.UtcNow; // Store full date & time automatically

        // 🔹 New part: connect feedback to registered user
        public int UserId { get; set; }       // Foreign key -> Users table
        public User? User { get; set; }       // Navigation property to User
    }
}
