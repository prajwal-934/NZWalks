using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NZWalks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            string[] students = new string[] { "John" , "Sunny" , "Dwane" , "Robert" };
            return Ok(students);
        }
    }
}
