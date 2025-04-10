using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace Intex2025.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AzureRecommendationsController : ControllerBase
    {
        [HttpPost("score")]
        public async Task<IActionResult> GetAzureRecommendations([FromBody] List<RatingInput> userRatings)
        {
            var azureUrl = "http://48c8d28e-b3a5-4106-a92f-f1aa805e87fd.eastus2.azurecontainer.io/score";
            var apiKey = "FjFfzvJQxhHXmq6og0qcGJtQjBqhcprz";

            var requestBody = new
            {
                Inputs = new
                {
                    input1 = userRatings
                },
                GlobalParameters = new { }
            };

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, azureUrl);
            request.Headers.Add("Authorization", $"Bearer {apiKey}");
            request.Content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

            var response = await client.SendAsync(request);
            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, json);

            var resultObj = JsonConvert.DeserializeObject<dynamic>(json);
            var output = resultObj?.Results?.WebServiceOutput0?[0];

            var recommendations = new List<string>();
            for (int i = 1; i <= 10; i++)
            {
                var key = $"Recommended Item {i}";
                recommendations.Add((string)output[key]);
            }

            return Ok(recommendations);
        }
    }

    public class RatingInput
    {
        public int user_id { get; set; }
        public string show_id { get; set; }
        public int rating { get; set; }
    }
}
