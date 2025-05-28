
import { Button } from "@/components/ui/button";

const AdoptionSection = () => {
  return (
    <div className="mt-16 bg-pet-purple-light rounded-lg p-6 dark:bg-gray-800 dark:border dark:border-gray-700">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-pet-purple-dark dark:text-pet-purple-light">Considering Adoption?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Adopting a pet is a rewarding experience that gives a deserving animal a second chance at a loving home. 
            Before you adopt, consider these factors:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li>Your lifestyle and living situation</li>
            <li>Long-term commitment and costs</li>
            <li>Pet's compatibility with existing pets or children</li>
            <li>Time available for care, exercise, and training</li>
          </ul>
          <a href="https://en.wikipedia.org/wiki/Pet_adoption">
          <Button className="bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple">
           Learn More About Adoption</Button>
           </a>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=500" 
            alt="Happy dog and owner" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdoptionSection;
