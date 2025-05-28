
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetGrid from "./PetGrid";
import { PetType } from "./PetGrid";

interface PetTabsProps {
  petData: PetType[];
}

const PetTabs = ({ petData }: PetTabsProps) => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
        <TabsTrigger value="all">All Pets</TabsTrigger>
        <TabsTrigger value="adoption">For Adoption</TabsTrigger>
        <TabsTrigger value="sale">For Sale</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <PetGrid pets={petData} />
      </TabsContent>
      
      <TabsContent value="adoption" className="mt-6">
        <PetGrid pets={petData.filter(pet => pet.type === "adoption")} />
      </TabsContent>
      
      <TabsContent value="sale" className="mt-6">
        <PetGrid pets={petData.filter(pet => pet.type === "sale")} />
      </TabsContent>
    </Tabs>
  );
};

export default PetTabs;
