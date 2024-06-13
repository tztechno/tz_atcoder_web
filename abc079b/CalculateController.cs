using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculateController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] CalculationRequest request)
        {
            // Perform calculations
            int result = CalculateLucasNumber(request.N);

            // Return result
            return Ok(new
            {
                Result = result,
                ProcessTime = 100 // Example process time in milliseconds
            });
        }

        private int CalculateLucasNumber(int n)
        {
            // Implement your calculation logic here
            // This is just a placeholder example
            if (n == 0)
                return 2;
            else if (n == 1)
                return 1;
            else
                return CalculateLucasNumber(n - 1) + CalculateLucasNumber(n - 2);
        }

        public class CalculationRequest
        {
            public int N { get; set; }
        }
    }
}
