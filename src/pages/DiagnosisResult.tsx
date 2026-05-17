import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ShoppingCart,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const DiagnosisResult: React.FC = () => {
  const { currentDiagnosis, addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentDiagnosis) {
      navigate('/diagnosis');
    }
  }, [currentDiagnosis, navigate]);

  if (!currentDiagnosis) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'severe':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'moderate':
        return <Info className="h-5 w-5 text-yellow-600" />;
      case 'severe':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const addAllToCart = () => {
    currentDiagnosis.recommendedMedicines.forEach((medicine) => {
      addToCart(medicine, 1);
    });
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/diagnosis" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Symptom Checker
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 py-6 px-6 text-white">
          <h1 className="text-2xl font-bold">Your Diagnosis Result</h1>
          <p className="text-blue-100 mt-1">Based on the symptoms you provided, here's what we found</p>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  currentDiagnosis.severity === 'severe'
                    ? 'bg-red-100'
                    : currentDiagnosis.severity === 'moderate'
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                } mr-4 flex-shrink-0`}
              >
                {getSeverityIcon(currentDiagnosis.severity)}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentDiagnosis.condition}</h2>
                <div className="flex items-center mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(currentDiagnosis.severity)}`}
                  >
                    {currentDiagnosis.severity.charAt(0).toUpperCase() + currentDiagnosis.severity.slice(1)}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">Confidence: {currentDiagnosis.confidence}%</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{currentDiagnosis.description}</p>

            {currentDiagnosis.seeDoctor && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-800 font-medium">Medical Attention Advised</h3>
                    <p className="text-red-700 mt-1">
                      Based on your symptoms, we recommend consulting a healthcare professional.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Medicines</h3>

            <div className="space-y-4">
              {currentDiagnosis.recommendedMedicines.map((medicine) => (
                <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="sm:flex sm:justify-between sm:items-start gap-4">
                    <div className="sm:flex sm:items-start gap-4 min-w-0">
                      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-3 sm:mb-0 flex-shrink-0">
                        <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium">{medicine.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {medicine.dosage} • {medicine.category}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">{medicine.description}</p>
                        <p className="text-gray-500 text-xs mt-2">Usage: {medicine.usageInstructions}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0 sm:flex-col sm:items-end sm:gap-3">
                      <span className="font-medium text-gray-800 mr-4 sm:mr-0">${medicine.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(medicine, 1)}
                        className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-lg px-3 py-1 text-sm font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addAllToCart}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add All to Cart
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">General Advice</h3>
            <p className="text-gray-700 mb-4">{currentDiagnosis.advice}</p>

            <div className="mt-4 text-sm text-gray-600">
              <p className="mb-2">Was this diagnosis helpful?</p>
              <div className="flex space-x-3">
                <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                  <ThumbsUp className="h-4 w-4 text-gray-500 mr-1" />
                  Yes
                </button>
                <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                  <ThumbsDown className="h-4 w-4 text-gray-500 mr-1" />
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-800">Disclaimer</h3>
            <p className="text-gray-600 text-sm mt-1">
              This diagnosis is generated by an AI system and should not be considered a substitute for professional medical advice. If you are experiencing severe symptoms or your condition worsens, please seek immediate medical attention.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center">
              Find a doctor near you
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
