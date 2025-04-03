import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileToRead, setFileToRead] = useState('');
  const [readContent, setReadContent] = useState('');

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_API_URL}`)
      .then(response => setMessage(response.data));
  }, []);

  const createFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/file`, {
        fileName,
        content: fileContent
      }, { headers: { 'Content-Type': 'application/json' }, withCredentials: false });
      toast.success('File created successfully!');
      setFileName('');
      setFileContent('');
    } catch (error) {
      toast.error('Error creating file');
    } finally {
      setLoading(false);
    }
  };

  const readFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/file?fileName=${fileToRead}`);
      setReadContent(response.data);
      toast.success('File read successfully!');
    } catch (error) {
      toast.error('Error reading file');
      setReadContent('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full space-y-10">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">{message}</h1>

          {/* Create File Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">📄 Create New File</h2>
            <form onSubmit={createFile} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">File Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Enter file name..."
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow min-h-[120px] resize-y"
                  placeholder="Write file content..."
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create File'}
              </button>
            </form>
          </div>

          {/* Read File Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">📖 Read File</h2>
            <form onSubmit={readFile} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">File Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 bg-white/70 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                  placeholder="Enter file name to read..."
                  value={fileToRead}
                  onChange={(e) => setFileToRead(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Reading...' : 'Read File'}
              </button>
              
              {readContent && (
                <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">File Content:</h3>
                  <p className="text-gray-600 whitespace-pre-wrap bg-white p-3 rounded-md border border-gray-300">{readContent}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
