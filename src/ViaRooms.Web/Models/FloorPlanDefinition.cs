namespace ViaRooms.Web.Models;

public sealed class FloorPlanDefinition
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Src { get; set; } = string.Empty;
    public double? ReferenceWidth { get; set; }
    public double? ReferenceHeight { get; set; }
    public List<FloorPlanRoomDefinition> Rooms { get; set; } = [];
}

public sealed class FloorPlanRoomDefinition
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public double X { get; set; }
    public double Y { get; set; }
}
