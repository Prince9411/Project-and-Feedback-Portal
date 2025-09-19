namespace FinalProject.DTO
{
    public class FeedbackDTO
    {
        public int ProjectId { get; set; }        // Link to the project
        public int UserId { get; set; }           // Link to the user giving feedback
        public required string FeedbackText { get; set; }  // Actual feedback content
    }
}
