import React, { useState } from 'react';
import axios from 'axios';
import { Globe, Palette, Briefcase, PaintBucket, Image, Mail } from 'lucide-react';

const industries = [
  "Agriculture", "Forestry", "Freelancer", "Mining", "Extraction", "Construction", "Manufacturing",
  "Wholesale Trade", "Retail Trade", "Transportation", "Warehousing", "Information Technology Services",
  "Media", "Finance", "Insurance", "Real Estate", "Rental Services", "Consulting Services",
  "Technical Services", "Management Services", "Administrative Services", "Educational Services",
  "Healthcare", "Social Assistance", "Arts", "Entertainment", "Recreation", "Accommodation",
  "Food Services", "Repair Services", "Maintenance Services", "Personal Services", "Laundry Services",
  "Religious Organizations", "Civic Organizations", "Professional Organizations", "Public Administration",
  "Government", "Utilities", "Waste Management", "Remediation"
];

const artStyles = [
  "3D Clay", "Minimal Line Drawing", "3D renders", "Software/Tech Centric", "Outdoorsy", "Minimalist Corporate"
];

function App() {
  const [formData, setFormData] = useState({
    websiteName: '',
    industry: '',
    customDomain: '',
    colorScheme: '#3490dc',
    description: '',
    artStyle: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [creationResult, setCreationResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.websiteName || !formData.industry || !formData.colorScheme || !formData.email) {
      setMessage('Please fill in all required fields: Company Name, Industry, Color Scheme, and Contact Email.');
      return;
    }
    setIsLoading(true);
    setMessage('Creating your website...');
    try {
      const response = await axios.post('/api/create-site', formData);
      setCreationResult(response.data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <img src="https://i.imgur.com/UagZ4dk.png" alt="1 Minute Websites Logo" className="w-64" />
            </div>
            <h1 className="text-2xl font-semibold text-center mb-8">Create your website</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="text-gray-400" />
                <input
                  type="text"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Contact Email"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="text-gray-400" />
                <input
                  type="text"
                  name="customDomain"
                  value={formData.customDomain}
                  onChange={handleChange}
                  placeholder="Custom Domain (optional)"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="text-gray-400" />
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="text-gray-400" />
                <input
                  type="color"
                  name="colorScheme"
                  value={formData.colorScheme}
                  onChange={handleChange}
                  className="w-10 h-10"
                />
                <span>{formData.colorScheme}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PaintBucket className="text-gray-400" />
                <select
                  name="artStyle"
                  value={formData.artStyle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Art Style</option>
                  {artStyles.map((style, index) => (
                    <option key={index} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Image className="text-gray-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Company Description"
                  className="w-full p-2 border rounded"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Site'}
              </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
            {creationResult && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Website Created!</h2>
                <p>Repository URL: <a href={creationResult.repoUrl} target="_blank" rel="noopener noreferrer">{creationResult.repoUrl}</a></p>
                <p>Website URL: <a href={creationResult.websiteUrl} target="_blank" rel="noopener noreferrer">{creationResult.websiteUrl}</a></p>
                {creationResult.dnsInstructions && (
                  <div>
                    <h3 className="text-lg font-semibold mt-2">DNS Instructions:</h3>
                    <p>{creationResult.dnsInstructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;