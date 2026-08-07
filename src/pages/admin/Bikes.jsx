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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bike Management</h1>
        <Button onClick={() => openForm()} className="gap-2">
          <Plus className="w-4 h-4" /> Add New Bike
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Bike</th>
                <th className="p-4 hidden sm:table-cell">Reg. No</th>
                <th className="p-4">Price/Day</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading bikes...</td></tr>
              ) : bikes.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No Bikes Found. Add a new ride!</td></tr>
              ) : (
                bikes.map((bike) => (
                  <tr key={bike.bikeId} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={bike.image} alt={bike.bikeName} className="w-12 h-12 rounded-lg object-cover bg-gray-100 hidden sm:block" />
                        <div>
                          <p className="font-bold text-gray-900">{bike.bikeName}</p>
                          <p className="text-xs text-gray-500">{bike.brand} • {bike.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 hidden sm:table-cell">{bike.registrationNumber}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => confirmPriceChange(bike)}>
                        <span className="font-semibold text-gray-900">₹{bike.pricePerDay}</span>
                        <Tag className="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </td>
                    <td className="p-4">
                      <button onClick={() => confirmAvailabilityToggle(bike)} className="hover:opacity-80 transition-opacity">
                        <StatusBadge status={bike.availability} />
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openForm(bike)} className="p-2 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => confirmDelete(bike)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            <Input label="Bike Name *" required value={formData.bikeName} onChange={e => setFormData({...formData, bikeName: e.target.value})} />
            <Input label="Brand *" required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
            <Input label="Model *" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
            <Input label="Reg. Number *" required value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value.toUpperCase()})} className="uppercase" />
            
            <Select label="Category *" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} options={[{label: 'Scooter', value: 'Scooter'}, {label: 'Bike', value: 'Bike'}]} />
            <Input label="Engine CC *" type="number" required value={formData.engineCC} onChange={e => setFormData({...formData, engineCC: e.target.value})} />
            
            <Select label="Fuel Type *" required value={formData.fuelType} onChange={e => setFormData({...formData, fuelType: e.target.value})} options={[{label: 'Petrol', value: 'Petrol'}, {label: 'Electric', value: 'Electric'}]} />
            <Select label="Transmission *" required value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} options={[{label: 'Automatic', value: 'Automatic'}, {label: 'Manual', value: 'Manual'}]} />
            
            <Input label="Price/Day (₹) *" type="number" required value={formData.pricePerDay} onChange={e => setFormData({...formData, pricePerDay: e.target.value})} />
            <Input label="Deposit (₹) *" type="number" required value={formData.depositAmount} onChange={e => setFormData({...formData, depositAmount: e.target.value})} />
          </div>
          
          <Input label="Image URL *" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea required rows="2" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <Select label="Availability *" required value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} options={[{label: 'Available', value: 'Available'}, {label: 'Not Available', value: 'Not Available'}]} />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedBike ? 'Update Bike' : 'Add Bike'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Bike?">
        <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{selectedBike?.bikeName}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Bike</Button>
        </div>
      </Modal>

      {/* Change Price */}
      <Modal isOpen={isPriceOpen} onClose={() => setIsPriceOpen(false)} title="Update Daily Rent">
        <form onSubmit={handlePriceChange}>
          <p className="text-gray-600 mb-4">Bike: <strong>{selectedBike?.bikeName}</strong></p>
          <Input label="New Price (₹)" type="number" required value={newPrice} onChange={e => setNewPrice(e.target.value)} />
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsPriceOpen(false)}>Cancel</Button>
            <Button type="submit">Update Price</Button>
          </div>
        </form>
      </Modal>

      {/* Toggle Availability */}
      <Modal isOpen={isAvailabilityOpen} onClose={() => setIsAvailabilityOpen(false)} title="Change Availability">
        <p className="text-gray-600 mb-6">
          Mark <strong>{selectedBike?.bikeName}</strong> as 
          <span className="font-bold"> {selectedBike?.availability === 'Available' ? 'Not Available' : 'Available'}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsAvailabilityOpen(false)}>Cancel</Button>
          <Button onClick={handleAvailabilityToggle}>Confirm Change</Button>
        </div>
      </Modal>
    </div>
  );
};
