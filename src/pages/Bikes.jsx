import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { api } from '../services/api';
import { BikeCard } from '../components/bikes/BikeCard';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';

export const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('All');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All Prices');
  const [sort, setSort] = useState('Price Low → High');

  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      try {
        const data = await api.getBikes();
        setBikes(data);
        setFilteredBikes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  useEffect(() => {
    let result = [...bikes];

    if (search) {
      result = result.filter(b => b.bikeName.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (availability !== 'All') {
      result = result.filter(b => b.availability === availability);
    }
    
    if (category !== 'All') {
      result = result.filter(b => b.category === category);
    }

    if (priceRange !== 'All Prices') {
      if (priceRange === 'Under ₹500') result = result.filter(b => b.pricePerDay < 500);
      else if (priceRange === '₹500–₹1000') result = result.filter(b => b.pricePerDay >= 500 && b.pricePerDay <= 1000);
      else if (priceRange === 'Above ₹1000') result = result.filter(b => b.pricePerDay > 1000);
    }

    if (sort === 'Price Low → High') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === 'Price High → Low') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sort === 'Name A–Z') {
      result.sort((a, b) => a.bikeName.localeCompare(b.bikeName));
    }

    setFilteredBikes(result);
  }, [search, availability, category, priceRange, sort, bikes]);

  return (
    <div className="bg-background-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Choose Your Ride</h1>
          <p className="text-gray-600">Find the perfect bike for your next adventure.</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <Input 
                placeholder="Search bikes..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-10"
              />
              <Search className="w-5 h-5 text-gray-400 absolute ml-3 mt(-8) -translate-y-8" />
            </div>
            
            <Select 
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              options={[
                { label: 'All Availability', value: 'All' },
                { label: 'Available', value: 'Available' },
                { label: 'Not Available', value: 'Not Available' }
              ]}
            />
            
            <Select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Scooter', value: 'Scooter' },
                { label: 'Bike', value: 'Bike' }
              ]}
            />

            <Select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              options={[
                { label: 'All Prices', value: 'All Prices' },
                { label: 'Under ₹500', value: 'Under ₹500' },
                { label: '₹500–₹1000', value: '₹500–₹1000' },
                { label: 'Above ₹1000', value: 'Above ₹1000' }
              ]}
            />

            <Select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={[
                { label: 'Price Low → High', value: 'Price Low → High' },
                { label: 'Price High → Low', value: 'Price High → Low' },
                { label: 'Name A–Z', value: 'Name A–Z' }
              ]}
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse"></div>
            ))}
          </div>
        ) : filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBikes.map(bike => (
              <BikeCard key={bike.bikeId} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bikes Found</h3>
            <p className="text-gray-500">Try adjusting your filters to find available rides.</p>
          </div>
        )}
      </div>
    </div>
  );
};
