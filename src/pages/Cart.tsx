
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleCheckout = async() => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
        return;
      }  
        const response = await fetch(`http://localhost:8080/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items, subtotal })
      });

      const data = await response.json();
      console.log("checkout:"+data);
      if (response.ok) {
        clearCart();
        toast.success(data.message || "Order placed successfully!");
      } else {
        toast.error(data.message || "Checkout failed.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2 dark:text-gray-200">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Browse our marketplace and store to find something you'll love!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-200">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-4 flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=500";
                  }}
                />
                <div className="flex-grow">
                  <h3 className="font-medium dark:text-gray-200">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${item.discountPercentage 
                      ? (item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)
                      : item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center dark:text-gray-200">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-200">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Subtotal</span>
                <span className="font-medium dark:text-gray-200">${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple-light/90"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
