using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbacksController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public FeedbacksController(ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/Feedbacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetFeedbacks()
        {
            var feedbacks = await _context.Feedbacks
                .Include(f => f.User)
                .Include(f => f.Project)
                .Select(f => new
                {
                    f.FeedbackId,
                    f.FeedbackText,
                    f.FeedbackDate,
                    Username = f.User.Username,
                    ProjectName = f.Project.Title
                })
                .ToListAsync();

            return Ok(feedbacks);
        }

        // GET: api/Feedbacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetFeedback(int id)
        {
            var feedback = await _context.Feedbacks
                .Include(f => f.User)
                .Include(f => f.Project)
                .Where(f => f.FeedbackId == id)
                .Select(f => new
                {
                    f.FeedbackId,
                    f.FeedbackText,
                    f.FeedbackDate,
                    Username = f.User.Username,
                    ProjectName = f.Project.Title
                })
                .FirstOrDefaultAsync();

            if (feedback == null) return NotFound();
            return Ok(feedback);
        }

        // POST: api/Feedbacks
        [HttpPost]

        public async Task<ActionResult<object>> PostFeedback(FeedbackDTO feedbackDto)
        {
            var user = await _context.Users.FindAsync(feedbackDto.UserId);
            if (user == null) return BadRequest("User not found.");

            var project = await _context.Projects.FindAsync(feedbackDto.ProjectId);
            if (project == null) return BadRequest("Project not found.");

            var feedback = new Feedback
            {
                UserId = feedbackDto.UserId,
                ProjectId = feedbackDto.ProjectId,
                FeedbackText = feedbackDto.FeedbackText,
                FeedbackDate = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            // Return minimal info to avoid cycles
            return CreatedAtAction(nameof(GetFeedback), new { id = feedback.FeedbackId }, new
            {
                feedback.FeedbackId,
                feedback.FeedbackText,
                feedback.FeedbackDate,
                feedback.UserId,
                feedback.ProjectId
            });
        }


        // PUT: api/Feedbacks/5
        [HttpPut("{id}")]

        public async Task<IActionResult> PutFeedback(int id, FeedbackDTO feedbackDto)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound();

            // Validate User
            var user = await _context.Users.FindAsync(feedbackDto.UserId);
            if (user == null) return BadRequest("User not found.");

            // Validate Project
            var project = await _context.Projects.FindAsync(feedbackDto.ProjectId);
            if (project == null) return BadRequest("Project not found.");

            feedback.UserId = feedbackDto.UserId;
            feedback.ProjectId = feedbackDto.ProjectId;
            feedback.FeedbackText = feedbackDto.FeedbackText;

            _context.Entry(feedback).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Feedbacks/5
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound();

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
