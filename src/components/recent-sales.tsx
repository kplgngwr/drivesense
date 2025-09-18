import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  const activities = [
    {
      id: 1,
      avatar: "/avatars/01.png",
      fallback: "RK",
      title: "Rakesh Kumar",
      description: "Delivered items using Tata Bolero",
      timestamp: "5 mins ago"
    },
    {
      id: 2,
      avatar: "/avatars/02.png",
      fallback: "NB",
      title: "New Vehicle Added",
      description: "Mahindra Scorpio added to fleet",
      timestamp: "30 mins ago"
    },
    {
      id: 3,
      avatar: "/avatars/03.png",
      fallback: "AK",
      title: "Ajay Kapoor",
      description: "Joined as a new driver",
      timestamp: "1 hour ago"
    },
    {
      id: 4,
      avatar: "/avatars/04.png",
      fallback: "VR",
      title: "Vehicle Repair",
      description: "Tata Ace sent for maintenance",
      timestamp: "2 hours ago"
    },
    {
      id: 5,
      avatar: "/avatars/05.png",
      fallback: "DL",
      title: "Delivery Completed",
      description: "John Smith delivered items using Ashok Leyland",
      timestamp: "3 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.avatar} alt={`${activity.title} Avatar`} />
            <AvatarFallback>{activity.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{activity.timestamp}</div>
        </div>
      ))}
    </div>
  );
}

export default RecentSales;
