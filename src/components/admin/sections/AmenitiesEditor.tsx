import React from 'react';
import { Plus, Trash2, Edit3, GripVertical } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface Amenity {
  id: string;
  name: string;
  icon: string;
}

interface AmenitiesEditorProps {
  amenities: {
    title: string;
    topRow: Amenity[];
    bottomRow: Amenity[];
  };
  onChange: (amenities: AmenitiesEditorProps['amenities']) => void;
}

// Available icons for amenities
const availableIcons = [
  'Home', 'Building', 'Car', 'Waves', 'Dumbbell', 'Gamepad2', 'Monitor', 'Users',
  'ArrowUpDown', 'DoorOpen', 'Briefcase', 'Users2', 'Gamepad', 'Trophy', 'Utensils',
  'Droplets', 'BookOpen', 'Coffee', 'Shield', 'Wifi', 'Zap', 'TreePine', 'Camera',
  'Music', 'Palette', 'Plane', 'MapPin', 'Clock', 'Heart', 'Star', 'Sun', 'Moon',
  'Flower', 'Leaf', 'Mountain', 'Umbrella', 'Gift', 'Crown', 'Diamond', 'Key'
];

const AmenitiesEditor: React.FC<AmenitiesEditorProps> = ({ amenities, onChange }) => {
  const [editingItem, setEditingItem] = React.useState<{ row: 'topRow' | 'bottomRow'; id: string } | null>(null);

  const handleUpdateTitle = (title: string) => {
    onChange({ ...amenities, title });
  };

  const handleUpdateAmenity = (row: 'topRow' | 'bottomRow', id: string, updates: Partial<Amenity>) => {
    const updatedAmenities = amenities[row].map(amenity => 
      amenity.id === id ? { ...amenity, ...updates } : amenity
    );
    onChange({ ...amenities, [row]: updatedAmenities });
    setEditingItem(null);
  };

  const handleDeleteAmenity = (row: 'topRow' | 'bottomRow', id: string) => {
    const updatedAmenities = amenities[row].filter(amenity => amenity.id !== id);
    onChange({ ...amenities, [row]: updatedAmenities });
  };

  const handleAddAmenity = (row: 'topRow' | 'bottomRow') => {
    const newAmenity: Amenity = {
      id: Date.now().toString(),
      name: 'New Amenity',
      icon: 'Home'
    };
    onChange({ ...amenities, [row]: [...amenities[row], newAmenity] });
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? IconComponent : LucideIcons.Home;
  };

  const renderAmenityList = (row: 'topRow' | 'bottomRow', title: string) => {
    const amenityList = amenities[row];
    
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => handleAddAmenity(row)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors duration-200"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {amenityList.map((amenity) => (
            <div key={amenity.id} className="bg-white rounded-lg shadow-sm border">
              {editingItem?.row === row && editingItem?.id === amenity.id ? (
                <EditForm 
                  amenity={amenity} 
                  onSave={(updates) => handleUpdateAmenity(row, amenity.id, updates)}
                  onCancel={() => setEditingItem(null)}
                />
              ) : (
                <div className="flex items-center p-3 gap-3">
                  {/* Drag Handle */}
                  <div className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Icon Preview */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {React.createElement(getIcon(amenity.icon), { className: "w-5 h-5 text-gray-700" })}
                  </div>

                  {/* Amenity Info */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{amenity.name}</h4>
                    <p className="text-xs text-gray-500">{amenity.icon}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingItem({ row, id: amenity.id })}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteAmenity(row, amenity.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Edit Amenities</h2>

      {/* Section Title Editor */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-2">
          Section Title
        </label>
        <input
          type="text"
          id="section-title"
          value={amenities.title}
          onChange={(e) => handleUpdateTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Amenities Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        {renderAmenityList('topRow', 'Top Row (Scrolls Left to Right)')}
        {renderAmenityList('bottomRow', 'Bottom Row (Scrolls Right to Left)')}
      </div>

      {/* Preview */}
      <div className="bg-gray-100 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
        <div className="bg-white rounded-lg p-6">
          <h4 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {amenities.title}
          </h4>
          
          {/* Top Row Preview */}
          <div className="flex gap-8 justify-center mb-8 overflow-hidden">
            {amenities.topRow.slice(0, 4).map((amenity) => {
              const IconComponent = getIcon(amenity.icon);
              return (
                <div key={amenity.id} className="flex flex-col items-center min-w-[120px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">{amenity.name}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row Preview */}
          <div className="flex gap-8 justify-center overflow-hidden">
            {amenities.bottomRow.slice(0, 4).map((amenity) => {
              const IconComponent = getIcon(amenity.icon);
              return (
                <div key={amenity.id} className="flex flex-col items-center min-w-[120px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">{amenity.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface EditFormProps {
  amenity: Amenity;
  onSave: (updates: Partial<Amenity>) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ amenity, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(amenity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? IconComponent : LucideIcons.Home;
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-50">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenity Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Swimming Pool, Gym"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon
        </label>
        <select
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {availableIcons.map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
      </div>

      {/* Icon Preview */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview
        </label>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {React.createElement(getIcon(formData.icon), { className: "w-6 h-6 text-gray-700" })}
          </div>
          <span className="text-sm text-gray-600">{formData.name}</span>
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AmenitiesEditor;