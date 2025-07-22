import React from 'react';
import { Plus, Trash2, Edit3, GripVertical } from 'lucide-react';

interface FloorPlan {
  id: string;
  label: string;
  image: string;
}

interface FloorPlansEditorProps {
  floorPlans: {
    title: string;
    plans: FloorPlan[];
  };
  onChange: (floorPlans: FloorPlansEditorProps['floorPlans']) => void;
}

const FloorPlansEditor: React.FC<FloorPlansEditorProps> = ({ floorPlans, onChange }) => {
  const [editingItem, setEditingItem] = React.useState<string | null>(null);

  const handleUpdateTitle = (title: string) => {
    onChange({ ...floorPlans, title });
  };

  const handleUpdatePlan = (id: string, updates: Partial<FloorPlan>) => {
    const updatedPlans = floorPlans.plans.map(plan => 
      plan.id === id ? { ...plan, ...updates } : plan
    );
    onChange({ ...floorPlans, plans: updatedPlans });
    setEditingItem(null);
  };

  const handleDeletePlan = (id: string) => {
    const updatedPlans = floorPlans.plans.filter(plan => plan.id !== id);
    onChange({ ...floorPlans, plans: updatedPlans });
  };

  const handleAddPlan = () => {
    const newPlan: FloorPlan = {
      id: Date.now().toString(),
      label: 'New Floor Plan',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    };
    onChange({ ...floorPlans, plans: [...floorPlans.plans, newPlan] });
  };

  const handleReorderPlans = (fromIndex: number, toIndex: number) => {
    const updatedPlans = [...floorPlans.plans];
    const [movedPlan] = updatedPlans.splice(fromIndex, 1);
    updatedPlans.splice(toIndex, 0, movedPlan);
    onChange({ ...floorPlans, plans: updatedPlans });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Edit Floor Plans</h2>
        <button
          onClick={handleAddPlan}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Floor Plan
        </button>
      </div>

      {/* Section Title Editor */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <label htmlFor="section-title" className="block text-sm font-medium text-gray-700 mb-2">
          Section Title
        </label>
        <input
          type="text"
          id="section-title"
          value={floorPlans.title}
          onChange={(e) => handleUpdateTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Floor Plans List */}
      <div className="space-y-4">
        {floorPlans.plans.map((plan, index) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
            {editingItem === plan.id ? (
              <EditForm 
                plan={plan} 
                onSave={(updates) => handleUpdatePlan(plan.id, updates)}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <div className="flex items-center p-4 gap-4">
                {/* Drag Handle */}
                <div className="cursor-move text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Preview Image */}
                <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={plan.image} 
                    alt={plan.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Plan Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{plan.label}</h3>
                  <p className="text-sm text-gray-500 truncate">{plan.image}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem(plan.id)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="bg-gray-100 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
        <div className="bg-white rounded-lg p-6">
          <h4 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {floorPlans.title}
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {floorPlans.plans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="text-center">
                <div className="bg-gray-100 rounded-lg aspect-[4/3] mb-3 overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={plan.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-900">{plan.label}</p>
              </div>
            ))}
          </div>
          {floorPlans.plans.length > 3 && (
            <p className="text-center text-gray-500 mt-4">
              +{floorPlans.plans.length - 3} more floor plans
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface EditFormProps {
  plan: FloorPlan;
  onSave: (updates: Partial<FloorPlan>) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ plan, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(plan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-gray-50">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Floor Plan Label
        </label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          placeholder="e.g., 2 BHK, Ground Floor Plan"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/floor-plan.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Image Preview */}
      {formData.image && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={formData.image} 
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
      
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

export default FloorPlansEditor;