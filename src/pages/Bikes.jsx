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
    <div className="bg-background-black min-h-screen py-12 pt-32 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-heading font-black text-white mb-3 tracking-tight">Choose Your Ride</h1>
          <p className="text-gray-400 font-light text-lg">Find the perfect premium bike for your next adventure.</p>
        </div>

        {/* Filters Section */}
        <div className="glass-panel rounded-3xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1 relative">
              <Input 
                placeholder="Search bikes..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-11 bg-background-black/50 border-white/10 text-white h-[46px] rounded-xl"
              />
              <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <Select 
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="bg-background-black/50 border-white/10 text-white h-[46px] rounded-xl"
              options={[
                { label: 'All Availability', value: 'All' },
                { label: 'Available', value: 'Available' },
                { label: 'Not Available', value: 'Not Available' }
              ]}
            />
            
            <Select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-background-black/50 border-white/10 text-white h-[46px] rounded-xl"
              options={[
                { label: 'All Types', value: 'All' },
                { label: 'Scooter', value: 'Scooter' },
                { label: 'Bike', value: 'Bike' }
              ]}
            />

            <Select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-background-black/50 border-white/10 text-white h-[46px] rounded-xl"
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
              className="bg-background-black/50 border-white/10 text-white h-[46px] rounded-xl"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl h-[400px] animate-pulse"></div>
            ))}
          </div>
        ) : filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBikes.map(bike => (
              <BikeCard key={bike.bikeId} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-16 text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-3">No Bikes Found</h3>
            <p className="text-gray-400 font-light">Try adjusting your filters to find available rides.</p>
          </div>
        )}
      </div>
    </div>
  );
};
