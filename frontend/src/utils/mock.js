// Mock data handler for Rushabh Ventures landing page

export const submitApplication = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Store in localStorage for persistence
  const applications = JSON.parse(localStorage.getItem('rushabhApplications') || '[]');
  
  const newApplication = {
    id: Date.now(),
    ...formData,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  
  applications.push(newApplication);
  localStorage.setItem('rushabhApplications', JSON.stringify(applications));
  
  console.log('Application submitted:', newApplication);
  
  return {
    success: true,
    message: 'Your application has been received. Our team will contact you within 48 hours.',
    data: newApplication
  };
};

export const getApplications = () => {
  return JSON.parse(localStorage.getItem('rushabhApplications') || '[]');
};
