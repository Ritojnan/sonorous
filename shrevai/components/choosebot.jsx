// components/MultiStepForm.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import NameOfBot from './nameofbot';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    option1: '',
    option2: '',
    username: ''
  });

  const handleNext = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data
    }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectOption = (option, value) => {
    setFormData((prev) => ({
      ...prev,
      [option]: value
    }));
    handleNext({ [option]: value });
  };

  return (
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-2 my-2 py-2">
              <Button className="w-full" onClick={() => handleSelectOption('option1', 'customer-support')}>Customer Support</Button>
              <Button className="w-full" onClick={() => handleSelectOption('option1', 'lead-generation')}>Lead Generation</Button>
              <Button className="w-full" onClick={() => handleSelectOption('option1', 'data-collection')}>Data Collection</Button>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2 py-2">
              <Button className="h-full w-full p-6" onClick={() => handleSelectOption('option2', 'template')}>Pick from template</Button>
              <Button className="h-full w-full p-6" onClick={() => handleSelectOption('option2', 'custom')}>Create your own bot</Button>
            </div>
            <div className="flex justify-between">
<Button onClick={handleBack} ><ArrowLeft className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-4"
          >
            <NameOfBot handleNext={(username) => handleNext({ username })} />
            <div className="flex justify-between">
              <Button onClick={handleBack} ><ArrowLeft className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
      </form>
  );
};

export default MultiStepForm;
