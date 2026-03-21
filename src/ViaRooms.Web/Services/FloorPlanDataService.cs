using System.Text.Json;
using ViaRooms.Web.Models;

namespace ViaRooms.Web.Services;

public sealed class FloorPlanDataService(IWebHostEnvironment environment, ILogger<FloorPlanDataService> logger)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    private readonly string _dataPath = Path.Combine(environment.WebRootPath, "data", "floor-plans.json");

    public async Task<IReadOnlyList<FloorPlanDefinition>> GetFloorPlansAsync(CancellationToken cancellationToken = default)
    {
        if (!File.Exists(_dataPath))
        {
            logger.LogWarning("Floor plan data file not found at {Path}", _dataPath);
            return [];
        }

        await using var stream = File.OpenRead(_dataPath);
        return await JsonSerializer.DeserializeAsync<List<FloorPlanDefinition>>(stream, JsonOptions, cancellationToken) ?? [];
    }
}
