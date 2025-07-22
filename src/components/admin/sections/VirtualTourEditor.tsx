import React from 'react';
import { Youtube, Info } from 'lucide-react';

interface VirtualTourEditorProps {
  virtualTour: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
  onChange: (virtualTour: VirtualTourEditorProps['virtualTour']) => void;
}

const VirtualTourEditor: React.FC<VirtualTourEditorProps> = ({ virtualTour, onChange }) => {
  const handleChange = (field: keyof typeof virtualTour, value: string) => {
    onChange({ ...virtualTour, [field]: value });
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const isValidYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com/embed/') || url.includes('youtu.be/') || url.includes('youtube.com/watch?v=');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Virtual Tour</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              id="title"
              value={virtualTour.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              value={virtualTour.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={virtualTour.videoUrl}
              onChange={(e) => handleChange('videoUrl', e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                virtualTour.videoUrl && !isValidYouTubeUrl(virtualTour.videoUrl)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {virtualTour.videoUrl && !isValidYouTubeUrl(virtualTour.videoUrl) && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid YouTube URL</p>
            )}
          </div>

          {/* Tutorial */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">📹 How to get YouTube embed link:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Go to your YouTube video</li>
                  <li>Click "Share" button below the video</li>
                  <li>Click "Embed" option</li>
                  <li>Copy the URL from src="..." (example: https://www.youtube.com/embed/VIDEO_ID)</li>
                  <li>Paste the complete embed URL in the field above</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-white rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{virtualTour.title}</h4>
                <p className="text-gray-600">{virtualTour.subtitle}</p>
              </div>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {virtualTour.videoUrl && isValidYouTubeUrl(virtualTour.videoUrl) ? (
                  <iframe
                    src={virtualTour.videoUrl}
                    title="Virtual Tour Preview"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Video Preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourEditor;