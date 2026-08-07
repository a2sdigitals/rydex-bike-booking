import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { api } from '../../services/api';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { StatusBadge } from '../../components/common/StatusBadge';
import toast from 'react-hot-toast';

export const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  
  const [selectedBike, setSelectedBike] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    bikeName: '', brand: '', model: '', registrationNumber: '', category: 'Scooter',
    engineCC: '', fuelType: 'Petrol', transmission: 'Automatic', mileage: '',
    pricePerDay: '', depositAmount: '', image: '', description: '', availability: 'Available'
  });
  
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const data = await api.getBikes();
      setBikes(data);
    } catch (error) {
      toast.error("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  };

  const openForm = (bike = null) => {
    if (bike) {
      setFormData(bike);
    } else {
      setFormData({
        bikeName: '', brand: '', model: '', registrationNumber: '', category: 'Scooter',
        engineCC: '', fuelType: 'Petrol', transmission: 'Automatic', mileage: '',
        pricePerDay: '', depositAmount: '', image: '', description: '', availability: 'Available'
      });
    }
    setSelectedBike(bike);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBike) {
        await api.updateBike(selectedBike.bikeId, formData);
        toast.success("Bike updated successfully");
      } else {
        await api.addBike(formData);
        toast.success("Bike added successfully");
      }
      setIsFormOpen(false);
      fetchBikes();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const confirmDelete = (bike) => {
    setSelectedBike(bike);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.deleteBike(selectedBike.bikeId);
      toast.success("Bike deleted");
      setIsDeleteOpen(false);
      fetchBikes();
    } catch (error) {
      toast.error("Failed to delete bike");
    }
  };

  const confirmPriceChange = (bike) => {
    setSelectedBike(bike);
    setNewPrice(bike.pricePerDay);
    setIsPriceOpen(true);
  };

  const handlePriceChange = async (e) => {
    e.preventDefault();
    try {
      await api.updateBikePrice(selectedBike.bikeId, newPrice);
      toast.success("Price updated");
      setIsPriceOpen(false);
      fetchBikes();
    } catch (error) {
      toast.error("Failed to update price");
    }
  };

  const confirmAvailabilityToggle = (bike) => {
    setSelectedBike(bike);
    setIsAvailabilityOpen(true);
  };

  const handleAvailabilityToggle = async () => {
    const newStatus = selectedBike.availability === 'Available' ? 'Not Available' : 'Available';
    try {
      await api.updateBikeAvailability(selectedBike.bikeId, newStatus);
      toast.success(`Bike marked as ${newStatus}`);
      setIsAvailabilityOpen(false);
      fetchBikes();
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black text-white tracking-tight">Bike Management</h1>
        <Button onClick={() => openForm()} className="gap-2 rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">
          <Plus className="w-4 h-4" /> Add New Bike
        </Button>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                <th className="p-5 font-light">Bike</th>
                <th className="p-5 hidden sm:table-cell font-light">Reg. No</th>
                <th className="p-5 font-light">Price/Day</th>
                <th className="p-5 font-light">Status</th>
                <th className="p-5 text-right font-light">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-light">Loading bikes...</td></tr>
              ) : bikes.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-light">No Bikes Found. Add a new ride!</td></tr>
              ) : (
                bikes.map((bike) => (
                  <tr key={bike.bikeId} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img src={bike.image} alt={bike.bikeName} className="w-14 h-14 rounded-xl object-cover bg-background-surface hidden sm:block border border-white/10" />
                        <div>
                          <p className="font-heading font-bold text-white text-lg tracking-wide">{bike.bikeName}</p>
                          <p className="text-xs text-gray-400 font-light">{bike.brand} • {bike.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-400 font-light hidden sm:table-cell">{bike.registrationNumber}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg -ml-2 transition-colors w-max" onClick={() => confirmPriceChange(bike)}>
                        <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">₹{bike.pricePerDay}</span>
                        <Tag className="w-3 h-3 text-gray-500 group-hover:text-primary transition-colors" />
                      </div>
                    </td>
                    <td className="p-5">
                      <button onClick={() => confirmAvailabilityToggle(bike)} className="hover:opacity-80 transition-opacity">
                        <StatusBadge status={bike.availability} />
                      </button>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button onClick={() => openForm(bike)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => confirmDelete(bike)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Bike Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selectedBike ? 'Edit Bike' : 'Add New Bike'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Bike Name *" required value={formData.bikeName} onChange={e => setFormData({...formData, bikeName: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
            <Input label="Brand *" required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
            <Input label="Model *" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
            <Input label="Reg. Number *" required value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value.toUpperCase()})} className="uppercase bg-background-black/50 text-white border-white/10" />
            
            <Select label="Category *" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} options={[{label: 'Scooter', value: 'Scooter'}, {label: 'Bike', value: 'Bike'}]} className="bg-background-black/50 text-white border-white/10" />
            <Input label="Engine CC *" type="number" required value={formData.engineCC} onChange={e => setFormData({...formData, engineCC: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
            
            <Select label="Fuel Type *" required value={formData.fuelType} onChange={e => setFormData({...formData, fuelType: e.target.value})} options={[{label: 'Petrol', value: 'Petrol'}, {label: 'Electric', value: 'Electric'}]} className="bg-background-black/50 text-white border-white/10" />
            <Select label="Transmission *" required value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} options={[{label: 'Automatic', value: 'Automatic'}, {label: 'Manual', value: 'Manual'}]} className="bg-background-black/50 text-white border-white/10" />
            
            <Input label="Price/Day (₹) *" type="number" required value={formData.pricePerDay} onChange={e => setFormData({...formData, pricePerDay: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
            <Input label="Deposit (₹) *" type="number" required value={formData.depositAmount} onChange={e => setFormData({...formData, depositAmount: e.target.value})} className="bg-background-black/50 text-white border-white/10" />
          </div>
          
          <Input label="Image URL *" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." className="bg-background-black/50 text-white border-white/10" />
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 font-light">Description *</label>
            <textarea required rows="2" className="w-full px-4 py-2 rounded-xl border border-white/10 bg-background-black/50 text-white focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-light" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <Select label="Availability *" required value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} options={[{label: 'Available', value: 'Available'}, {label: 'Not Available', value: 'Not Available'}]} className="bg-background-black/50 text-white border-white/10" />

          <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
            <Button type="submit" className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">{selectedBike ? 'Update Bike' : 'Add Bike'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Bike?">
        <p className="text-gray-400 font-light mb-8 text-lg">Are you sure you want to delete <strong className="text-white">{selectedBike?.bikeName}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
          <Button variant="danger" onClick={handleDelete} className="rounded-xl">Delete Bike</Button>
        </div>
      </Modal>

      {/* Change Price */}
      <Modal isOpen={isPriceOpen} onClose={() => setIsPriceOpen(false)} title="Update Daily Rent">
        <form onSubmit={handlePriceChange}>
          <p className="text-gray-400 mb-6 font-light">Bike: <strong className="text-white">{selectedBike?.bikeName}</strong></p>
          <Input label="New Price (₹)" type="number" required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="bg-background-black/50 text-white border-white/10 h-[46px] text-lg rounded-xl" />
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
            <Button type="button" variant="outline" onClick={() => setIsPriceOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
            <Button type="submit" className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">Update Price</Button>
          </div>
        </form>
      </Modal>

      {/* Toggle Availability */}
      <Modal isOpen={isAvailabilityOpen} onClose={() => setIsAvailabilityOpen(false)} title="Change Availability">
        <p className="text-gray-400 mb-8 font-light text-lg">
          Mark <strong className="text-white">{selectedBike?.bikeName}</strong> as 
          <span className="font-bold text-white"> {selectedBike?.availability === 'Available' ? 'Not Available' : 'Available'}</span>?
        </p>
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Button variant="outline" onClick={() => setIsAvailabilityOpen(false)} className="rounded-xl border-white/20 text-gray-300 hover:bg-white/5">Cancel</Button>
          <Button onClick={handleAvailabilityToggle} className="rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.3)]">Confirm Change</Button>
        </div>
      </Modal>
    </div>
  );
};
