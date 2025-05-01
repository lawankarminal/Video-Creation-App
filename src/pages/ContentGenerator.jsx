import Header from '../components/common/Header';
import GenerationForm from '../components/content/GenerationForm';

const ContentGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Content</h1>
          <p className="text-gray-600">
            Generate AI-powered video content for your social media platforms
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <GenerationForm />
        </div>
      </main>
    </div>
  );
};

export default ContentGenerator;