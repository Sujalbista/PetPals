
import { Link } from "react-router-dom";
import { PawPrint, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-4">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-7 w-7 text-pet-purple" />
              <span className="text-xl font-bold text-pet-purple">PetPals</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Your one-stop platform for all pet needs - from adoption to care, community to shopping.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-pet-purple">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pet-purple">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pet-purple">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pet-purple">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-pet-purple">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-pet-purple">
                  Pet Adoption
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-pet-purple">
                  Breed Information
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-600 hover:text-pet-purple">
                  Pet Products
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-pet-purple">
                  Pet Care Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-pet-purple">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/community" className="text-gray-600 hover:text-pet-purple">
                  Forums
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-pet-purple">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/profiles" className="text-gray-600 hover:text-pet-purple">
                  Pet Profiles
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-pet-purple">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-pet-purple">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-pet-purple">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pet-purple">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pet-purple">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pet-purple">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} PetPals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
