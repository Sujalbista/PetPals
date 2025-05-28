
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare, Heart, Flame } from "lucide-react";

export interface ForumPostCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  category: string;
  timestamp: string;
  replyCount: number;
  likeCount: number;
  isPopular?: boolean;
}

const ForumPostCard = ({ 
  title, 
  author, 
  content, 
  category, 
  timestamp, 
  replyCount, 
  likeCount,
  isPopular
}: ForumPostCardProps) => {
  return (
    <Card className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="hidden sm:block">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
            {isPopular && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
                <Flame className="h-3 w-3 mr-1" /> Hot
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="sm:hidden w-6 h-6 rounded-full overflow-hidden mr-1">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span>{author.name}</span>
            <span>•</span>
            <span>{timestamp}</span>
            <span>•</span>
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              {category}
            </Badge>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{content}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{replyCount} replies</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              <span>{likeCount} likes</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumPostCard;
