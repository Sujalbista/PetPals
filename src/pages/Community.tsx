
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumPostCard from "@/components/cards/ForumPostCard";
import { Search, Filter, MessageSquare, Calendar, Users, BookOpen } from "lucide-react";

// Sample forum post data
const forumPosts = [
  {
    id: "1",
    title: "How to introduce a new cat to my dog?",
    author: {
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100",
    },
    content: "I'm adopting a cat next week, but I already have a 2-year-old Golden Retriever. Any advice on how to make the introduction smooth and stress-free for both animals?",
    category: "Pet Behavior",
    timestamp: "2 hours ago",
    replyCount: 12,
    likeCount: 28,
    isPopular: true,
  },
  {
    id: "2",
    title: "Best reptile for beginners?",
    author: {
      name: "Jake Williams",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    },
    content: "I'm thinking about getting my first reptile pet. Looking for something relatively low maintenance but still interesting. Any recommendations?",
    category: "Pet Selection",
    timestamp: "Yesterday",
    replyCount: 23,
    likeCount: 15,
  },
  {
    id: "3",
    title: "Monthly pet meetup in Central Park",
    author: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    content: "We're organizing a monthly pet meetup in Central Park. All pets welcome! The first gathering will be this Saturday at 10 AM near the Great Lawn. Bring toys and treats!",
    category: "Events",
    timestamp: "2 days ago",
    replyCount: 45,
    likeCount: 72,
    isPopular: true,
  },
  {
    id: "4",
    title: "Dealing with separation anxiety post-lockdown",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
    },
    content: "My dog developed separation anxiety during the lockdown when I was home all the time. Now that I'm back at the office, he's having a hard time. Any tips?",
    category: "Pet Behavior",
    timestamp: "3 days ago",
    replyCount: 32,
    likeCount: 56,
    isPopular: true,
  },
  {
    id: "5",
    title: "Homemade treat recipes for dogs with allergies",
    author: {
      name: "Amanda Torres",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=100",
    },
    content: "My dog is allergic to wheat and chicken. I'm looking for some homemade treat recipes that would be safe for him. Has anyone tried making allergen-free treats?",
    category: "Pet Nutrition",
    timestamp: "1 week ago",
    replyCount: 19,
    likeCount: 41,
  },
  {
    id: "6",
    title: "Advice needed: Adopting a senior pet",
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100",
    },
    content: "I'm considering adopting a 10-year-old cat from my local shelter. Any advice on caring for senior pets? What special considerations should I keep in mind?",
    category: "Pet Adoption",
    timestamp: "1 week ago",
    replyCount: 27,
    likeCount: 38,
  },
];

// Sample upcoming events data
const upcomingEvents = [
  {
    id: "1",
    title: "Annual Pet Adoption Fair",
    date: "May 15, 2025",
    location: "Central Community Center",
    description: "Find your perfect companion at our annual adoption fair featuring pets from 15+ local shelters and rescues.",
    image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "2",
    title: "Pet First Aid Workshop",
    date: "June 2, 2025",
    location: "Downtown Veterinary Clinic",
    description: "Learn essential first aid skills for pets in this hands-on workshop led by professional veterinarians.",
    image: "https://images.unsplash.com/photo-1612531057350-8c14e25e347b?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "3",
    title: "Dog Training Masterclass",
    date: "June 10, 2025",
    location: "River Park",
    description: "Join professional dog trainer Alex Morgan for a comprehensive workshop on positive reinforcement training techniques.",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=500",
  },
];

const Community = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pet-purple dark:text-pet-purple-light">Pet Community</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Connect with fellow pet enthusiasts, share experiences, ask questions, and participate in events. 
          Our community is a place for pet lovers to learn and grow together.
        </p>
      </div>

      {/* Search and Create Post */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search discussions, events, and guides..."
            className="pl-10 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <Button className="bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple">
          <MessageSquare className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>

      {/* Community Navigation */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Explore Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex flex-col items-center py-6 h-auto dark:border-gray-700 dark:hover:bg-gray-700">
            <MessageSquare className="h-8 w-8 mb-2 text-pet-purple dark:text-pet-purple-light" />
            <span>Discussion Forums</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center py-6 h-auto dark:border-gray-700 dark:hover:bg-gray-700">
            <Calendar className="h-8 w-8 mb-2 text-pet-purple dark:text-pet-purple-light" />
            <span>Events</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center py-6 h-auto dark:border-gray-700 dark:hover:bg-gray-700">
            <Users className="h-8 w-8 mb-2 text-pet-purple dark:text-pet-purple-light" />
            <span>Groups</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center py-6 h-auto dark:border-gray-700 dark:hover:bg-gray-700">
            <BookOpen className="h-8 w-8 mb-2 text-pet-purple dark:text-pet-purple-light" />
            <span>Care Guides</span>
          </Button>
        </div>
      </div>

      {/* Forums and Events Tabs */}
      <Tabs defaultValue="forums" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto dark:bg-gray-800">
          <TabsTrigger value="forums" className="dark:data-[state=active]:bg-gray-700">Discussion Forums</TabsTrigger>
          <TabsTrigger value="events" className="dark:data-[state=active]:bg-gray-700">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forums" className="mt-6">
          {/* Forum Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              All Topics
            </Button>
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              Pet Behavior
            </Button>
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              Health & Wellness
            </Button>
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              Training Tips
            </Button>
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              Pet Nutrition
            </Button>
            <Button variant="outline" size="sm" className="rounded-full dark:border-gray-700 dark:hover:bg-gray-700">
              Events
            </Button>
          </div>

          {/* Forum Posts */}
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <ForumPostCard key={post.id} {...post} />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700">Load More Posts</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border dark:border-gray-700">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{event.title}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start text-gray-600 dark:text-gray-400 mb-3">
                    <MessageSquare className="h-4 w-4 mr-2 mt-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
                  <Button className="w-full bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700">View All Events</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Community Highlights */}
      <div className="mt-16 bg-pet-purple-light rounded-lg p-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-pet-purple-dark dark:text-pet-purple-light">Join Our Community</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Being part of the PetPals community means access to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Expert advice from veterinarians and pet behaviorists</li>
              <li>Local and virtual pet-friendly events</li>
              <li>Support groups for specific pet concerns</li>
              <li>Educational resources and workshops</li>
              <li>Connections with fellow pet lovers</li>
            </ul>
            <Button className="bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple">Create an Account</Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-65266f35a8ff?auto=format&fit=crop&q=80&w=500" 
              alt="Pet community gathering" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
