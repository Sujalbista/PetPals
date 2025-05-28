
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { Link} from "react-router-dom";
import {
  CalendarDays,
  Carrot,
  Flame,
  Heart,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
    <FadeInWhenVisible>
      <HeroSection />
    </FadeInWhenVisible>

    <FadeInWhenVisible delay={0.1}>
      <StatsSection />
    </FadeInWhenVisible>

    <FadeInWhenVisible delay={0.2}>
      <TrendingPets />
    </FadeInWhenVisible>

    <FadeInWhenVisible delay={0.3}>
      <Forum />
    </FadeInWhenVisible>

    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
          Welcome to the PetPals Community!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Connect with pet lovers, share your pet's adventures, and discover
          helpful resources for pet care.
        </p>
        <div className="space-x-4">
        <Link to="/profiles" className="relative">

          <Button  className="bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple">
            Explore Profiles
          </Button>
        </Link>
          <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-300">Learn More</Button>
       
        </div>
      </div>
      <div>
      <FadeInWhenVisible delay={0.3}>
      
  
        <img
          src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=500"
          alt="Happy pets"
          className="rounded-lg shadow-md"
        />
        </FadeInWhenVisible>
      </div>
        
    </div>
  );
};


const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <FadeInWhenVisible delay={0.1}>
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-4 p-4">
          <Heart className="h-6 w-6 text-pet-purple" />
          <div>
            <h3 className="text-2xl font-semibold">5,000+</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Happy Pets
            </p>
          </div>
        </div>
      </Card>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={0.2}>
     
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-4 p-4">
          <MessageSquare className="h-6 w-6 text-pet-purple" />
          <div>
            <h3 className="text-2xl font-semibold">2,000+</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Active Members
            </p>
          </div>
        </div>
      </Card>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={0.3}>
     
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-4 p-4">
          <CalendarDays className="h-6 w-6 text-pet-purple" />
          <div>
            <h3 className="text-2xl font-semibold">3 Years</h3>
            <p className="text-gray-500 dark:text-gray-400">In Operation</p>
          </div>
        </div>
      </Card>
      </FadeInWhenVisible>
     
    </div>
  );
};

const TrendingPets = () => {
  const trendingPetsData = [
    {
      id: "1",
      name: "Buddy",
      breed: "Golden Retriever",
      likes: 120,
      image:
        "https://plus.unsplash.com/premium_photo-1661951641996-3685492b78ed?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Whiskers",
      breed: "Siamese",
      likes: 95,
      image:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: "3",
      name: "Kiwi",
      breed: "Parrot",
      likes: 80,
      image:
        "https://images.unsplash.com/photo-1612024782955-49fae79e42bb?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Trending Pets</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Check out the most popular pets in our community right now.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingPetsData.map((pet,Index) => (
          <FadeInWhenVisible key={pet.id} delay={Index*0.3}>
     
          <Card
            
            className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                {pet.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {pet.breed}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Heart className="h-4 w-4 mr-1" />
                <span>{pet.likes} Likes</span>
              </div>
            </div>
          </Card>
          </FadeInWhenVisible>
     
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/marketplace" className="relative">
          <Button variant="outline">View All Trending Pets</Button>
        </Link>

      </div>
    </div>
  );
};

interface ForumPostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: string;
  likeCount: number;
  replyCount: number;
  tags: string[];
}

const ForumPostCard = ({
  id,
  title,
  content,
  author,
  category,
  timestamp,
  likeCount,
  replyCount,
  tags,
}: ForumPostCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
          {content}
        </p>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
          <span>
            By {author} in {category}
          </span>
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center mr-4">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{replyCount}</span>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="secondary"
              size="sm"
              className="mr-2 mb-2"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const Forum = () => {
  const forumPosts = [
    {
      id: "1",
      title: "Best Food for Picky Eaters",
      content:
        "My cat is incredibly picky and refuses to eat anything but one specific brand of salmon pate. Any suggestions for getting her to try new foods?",
      author: "SarahM",
      category: "Cat Care",
      timePosted: "2 hours ago",
      likeCount: 15,
      commentCount: 8,
      tags: ["cat food", "picky eaters", "nutrition"],
    },
    {
      id: "2",
      title: "Safe Plants for Dogs",
      content:
        "I'm looking to add some greenery to my home but want to make sure they're safe for my curious pup. What are some dog-friendly houseplants?",
      author: "AlexK",
      category: "Dog Care",
      timePosted: "1 day ago",
      likeCount: 22,
      commentCount: 12,
      tags: ["dog safety", "houseplants", "pet care"],
    },
    {
      id: "3",
      title: "Training Tips for Parrots",
      content:
        "I recently adopted a parrot and I'm trying to teach him some basic commands. What are some effective training techniques for parrots?",
      author: "BirdLover88",
      category: "Bird Care",
      timePosted: "3 days ago",
      likeCount: 18,
      commentCount: 5,
      tags: ["parrot training", "bird commands", "pet education"],
    },
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Community Forum
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join conversations with fellow pet owners, share experiences, and
          learn from our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forumPosts.map((post,Index) => (
           <FadeInWhenVisible key={post.id} delay={Index*0.2}>
     
          <ForumPostCard
            
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            category={post.category}
            timestamp={post.timePosted}
            likeCount={post.likeCount}
            replyCount={post.commentCount}
            tags={post.tags}
          />
           </FadeInWhenVisible>
     
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline">View All Discussions</Button>
      </div>
    </div>
  );
};

export default Index;
