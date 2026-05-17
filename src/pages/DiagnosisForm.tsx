import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { analyzeSymptomsApi } from '../services/diagnosisService';

const BodyPartSymptoms: Record<string, string[]> = {
  'Head': ['Headache', 'Dizziness', 'Blurred vision', 'Earache', 'Sore throat'],
  'Chest': ['Chest pain', 'Shortness of breath', 'Cough', 'Heart palpitations'],
  'Abdomen': ['Stomach pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation'],
  'Limbs': ['Joint pain', 'Muscle pain', 'Swelling', 'Numbness', 'Weakness'],
  'General': ['Fever', 'Fatigue', 'Sweating', 'Chills', 'Loss of appetite']
};

const DiagnosisForm: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentDiagnosis, setIsLoading } = useAppContext();
  
  const [step, setStep] = useState(1);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleBodyPartSelection = (bodyPart: string) => {
    setSelectedBodyParts(prev => 
      prev.includes(bodyPart) 
        ? prev.filter(part => part !== bodyPart) 
        : [...prev, bodyPart]
    );
  };

  const handleSymptomSelection = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const validateStep = (currentStep: number) => {
    setErrorMessage('');
    
    switch (currentStep) {
      case 1:
        if (selectedBodyParts.length === 0) {
          setErrorMessage('Please select at least one body part');
          return false;
        }
        break;
      case 2:
        if (selectedSymptoms.length === 0) {
          setErrorMessage('Please select at least one symptom');
          return false;
        }
        break;
      case 3:
        if (!symptomDuration) {
          setErrorMessage('Please select symptom duration');
          return false;
        }
        if (!symptomSeverity) {
          setErrorMessage('Please select symptom severity');
          return false;
        }
        break;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call your API
      const diagnosis = await analyzeSymptomsApi({
        symptoms: selectedSymptoms,
        duration: symptomDuration,
        severity: symptomSeverity,
        additionalInfo
      });
      
      setCurrentDiagnosis(diagnosis);
      navigate('/diagnosis-result');
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setErrorMessage('Failed to analyze symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Symptom Checker
        </h1>
        <p className="text-gray-600">
          Tell us about your symptoms and we'll help identify possible causes and recommend appropriate medicines.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Body Areas</span>
          <span className="text-sm font-medium text-gray-600">Symptoms</span>
          <span className="text-sm font-medium text-gray-600">Details</span>
          <span className="text-sm font-medium text-gray-600">Additional Info</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Body Part Selection */}
        {step === 1 && (
          <div className="transition-opacity duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Where are you experiencing symptoms?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {Object.keys(BodyPartSymptoms).map((bodyPart) => (
                <button
                  key={bodyPart}
                  type="button"
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedBodyParts.includes(bodyPart)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleBodyPartSelection(bodyPart)}
                >
                  <div className="flex items-center">
                    {selectedBodyParts.includes(bodyPart) ? (
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    ) : (
                      <div className="w-5 h-5 border-2 rounded-full border-gray-300 mr-2"></div>
                    )}
                    <span className="font-medium">{bodyPart}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 2: Symptom Selection */}
        {step === 2 && (
          <div className="transition-opacity duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Select the symptoms you are experiencing
            </h2>
            <div className="space-y-6 mb-8">
              {selectedBodyParts.map((bodyPart) => (
                <div key={bodyPart}>
                  <h3 className="font-medium text-gray-700 mb-3">{bodyPart}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BodyPartSymptoms[bodyPart].map((symptom) => (
                      <button
                        key={symptom}
                        type="button"
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedSymptoms.includes(symptom)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 text-gray-700'
                        }`}
                        onClick={() => handleSymptomSelection(symptom)}
                      >
                        <div className="flex items-center">
                          {selectedSymptoms.includes(symptom) ? (
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                          ) : (
                            <div className="w-4 h-4 border rounded border-gray-300 mr-2"></div>
                          )}
                          <span>{symptom}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 3: Symptom Details */}
        {step === 3 && (
          <div className="transition-opacity duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Tell us more about your symptoms
            </h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  How long have you been experiencing these symptoms?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Less than a day', '1-3 days', '4-7 days', 'More than a week', 'More than a month'].map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      className={`p-3 rounded-lg border transition-colors ${
                        symptomDuration === duration
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                      onClick={() => setSymptomDuration(duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  How would you rate the severity?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Mild', 'Moderate', 'Severe'].map((severity) => (
                    <button
                      key={severity}
                      type="button"
                      className={`p-3 rounded-lg border transition-colors ${
                        symptomSeverity === severity
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                      onClick={() => setSymptomSeverity(severity)}
                    >
                      {severity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Additional Information */}
        {step === 4 && (
          <div className="transition-opacity duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Any additional information?
            </h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">
                  Please provide any additional details that might help with the diagnosis (optional)
                </label>
                <textarea
                  id="additionalInfo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[150px]"
                  placeholder="E.g., recent travel, allergies, current medications, medical history..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                ></textarea>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Your symptom summary:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {selectedSymptoms.map((symptom) => (
                    <li key={symptom}>{symptom}</li>
                  ))}
                </ul>
                <div className="mt-3 text-gray-700">
                  <p><span className="font-medium">Duration:</span> {symptomDuration}</p>
                  <p><span className="font-medium">Severity:</span> {symptomSeverity}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'} mt-8`}>
          {step > 1 && (
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              onClick={handlePrevStep}
            >
              Back
            </button>
          )}
          
          {step < 4 ? (
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleNextStep}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze Symptoms
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DiagnosisForm;