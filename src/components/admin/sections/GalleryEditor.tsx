import React from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'Interior' | 'Exterior';
  roomName: string;
  title: string;
  description: string;
  image: string;
}

interface GalleryEditorProps {
  gallery: GalleryItem[];
  onChange: (gallery: GalleryItem[]) => void;
}

const GalleryEditor: React.FC<GalleryEditorProps> = ({ gallery, onChange }) => {
  const [editingItem, setEditingItem] = React.useState<string | null>(null);

  const handleUpdateItem = (id: string, updates: Partial<GalleryItem>) => {
    const updatedGallery = gallery.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    onChange(updatedGallery);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    const updatedGallery = gallery.filter(item => item.id !== id);
    onChange(updatedGallery);
  };

  const handleAddItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      category: 'Interior',
      roomName: 'New Room',
      title: 'New Title',
      description: 'New description',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    };
    onChange([...gallery, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Edit Gallery</h2>
        <button
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {editingItem === item.id ? (
              <EditForm 
                item={item} 
                onSave={(updates) => handleUpdateItem(item.id, updates)}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <div>
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.roomName}
                    className="w-full h-32 object-cover"
                  />
                  <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                    item.category === 'Interior' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setEditingItem(item.id)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface EditFormProps {
  item: GalleryItem;
  onSave: (updates: Partial<GalleryItem>) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Interior' | 'Exterior' })}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="Interior">Interior</option>
          <option value="Exterior">Exterior</option>
        </select>
      </div>
      
      <input
        type="text"
        value={formData.roomName}
        onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
        placeholder="Room Name"
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
      />
      
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
      />
      
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        rows={2}
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
      />
      
      <input
        type="url"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="Image URL"
        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
      />
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GalleryEditor;