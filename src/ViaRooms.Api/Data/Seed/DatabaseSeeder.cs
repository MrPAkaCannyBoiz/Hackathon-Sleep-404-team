using Microsoft.EntityFrameworkCore;
using ViaRooms.Shared.Models;

namespace ViaRooms.Api.Data.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var context = services.GetRequiredService<AppDbContext>();
        await context.Database.EnsureCreatedAsync();

        var rng = new Random();
        var desiredHubs = new List<Hub>
        {
            new() { HubId = "A", Name = "Hub A" },
            new() { HubId = "B", Name = "Hub B" },
            new() { HubId = "C", Name = "Hub C" },
        };

        var existingHubIds = await context.Hubs.Select(hub => hub.HubId).ToListAsync();
        var hubsToAdd = desiredHubs.Where(hub => !existingHubIds.Contains(hub.HubId)).ToList();
        if (hubsToAdd.Count > 0)
        {
            context.Hubs.AddRange(hubsToAdd);
            await context.SaveChangesAsync();
        }

        var hubFloors = new Dictionary<string, int[]>
        {
            ["A"] = [2, 3, 4, 5],
            ["B"] = [2, 3, 4, 5],
            ["C"] = [2, 3, 4, 5, 6],
        };

        var existingRoomIds = await context.StudyRooms
            .Select(room => room.RoomId)
            .ToListAsync();

        var existingRoomIdSet = existingRoomIds.ToHashSet(StringComparer.OrdinalIgnoreCase);
        var roomsToAdd = new List<StudyRoom>();

        foreach (var (hubId, floors) in hubFloors)
        {
            foreach (var floor in floors)
            {
                foreach (var roomId in GetRoomIds(hubId, floor))
                {
                    if (existingRoomIdSet.Contains(roomId))
                    {
                        continue;
                    }

                    roomsToAdd.Add(new StudyRoom
                    {
                        RoomId = roomId,
                        HubId = hubId,
                        FloorNumber = floor,
                        Status = rng.Next(2) == 0 ? RoomStatus.Available : RoomStatus.Occupied,
                        LastActivityTime = DateTime.UtcNow.AddMinutes(-rng.Next(0, 30)),
                        SensorId = ToSensorId(roomId),
                    });
                }
            }
        }

        if (roomsToAdd.Count > 0)
        {
            context.StudyRooms.AddRange(roomsToAdd);
            await context.SaveChangesAsync();
        }

        Console.WriteLine($"[Seeder] Ensured {desiredHubs.Count} hubs and added {roomsToAdd.Count} missing rooms.");
    }

    private static IEnumerable<string> GetRoomIds(string hubId, int floor)
    {
        if (hubId == "C" && floor == 3)
        {
            return
            [
                "C03.01",
                "C03.02",
                "C03.04",
                "C03.05",
                "C03.06",
                "C03.07",
                "C03.08a",
                "C03.08b",
                "C03.09",
                "C03.10",
                "C03.11",
                "C03.12",
                "C03.13",
                "C03.14",
                "C03.15",
                "C03.16",
                "C03.20",
                "C03.21",
                "C03.22",
                "C03.23",
            ];
        }

        return Enumerable.Range(1, 12).Select(roomNumber => $"{hubId}0{floor}.{roomNumber:D2}");
    }

    private static string ToSensorId(string roomId) =>
        $"sensor-{roomId.ToLowerInvariant().Replace('.', '-')}";
}
