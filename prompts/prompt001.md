Ok we have this code that makes a website that shows the study rooms availability in our university. So it shows when a room is available or not, in theory based on a real life motion sensor, but for now we are mocking it. 
This line: 
```csharp
private readonly int _tickMs = config.GetValue("Simulator:TickIntervalSeconds", 8) * 1000;
```
mocks it so if for 1 minute there is no activity, it randomly changes the status, but in real life it would be a motion sensor that if it wasn't triggered for 30 minutes it would change it to Available, but anyways.

## What I need you to do please:
We have a table view and a map view. But I want to add a new thing in the nav bar called Floor Plan. So we have some pictures with the floor plans, i put them in VIA Mapper/public somewhere (check the `./Hackathon-Sleep-404-team/src/ViaRooms.Web`), and on the pictures we want to have some dots, with the room name next to them, and the dots light up green or red, based on if they are available or not, just like it does now for the list and table view. 

We make this app (in VIA Mapper) that helps us map the rooms exactly to a png, so with this app we manually mapped the rooms exactly where they are with x and y coordinates to that png, to the real life locations. And we can export that as a json file. For now we only mapped a few rooms for this one png (floor3). Can you make it so that the dots on that Floor Mapper are exactly where we placed them according to the json? We might give you the json again in the future with the new rooms and maybe add more pngs too but for now just one png which represents a floor and some rooms on it.

How could we make that happen?


Oh and this is the json with the rooms we mapped so far, please check on `./Hackathon-Sleep-404-team/prompts/floor_plan_data.json`