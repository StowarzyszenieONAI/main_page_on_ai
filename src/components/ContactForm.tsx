import React, { useState } from 'react';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Imię i nazwisko musi mieć co najmniej 2 znaki';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Temat jest wymagany';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Temat musi mieć co najmniej 3 znaki';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Wiadomość musi mieć co najmniej 10 znaków';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear submit status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Call the Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        onSubmitSuccess?.();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-montserrat">{submitMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-montserrat">{submitMessage}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-montserrat font-medium text-black mb-2">
          Imię i nazwisko *
        </label>
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors font-montserrat ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Twoje imię i nazwisko"
          disabled={isSubmitting}
          maxLength={100}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-montserrat font-medium text-black mb-2">
          Email *
        </label>
        <input 
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors font-montserrat ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="twoj.email@example.com"
          disabled={isSubmitting}
          maxLength={100}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-montserrat font-medium text-black mb-2">
          Temat *
        </label>
        <input 
          type="text" 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors font-montserrat ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Temat wiadomości"
          disabled={isSubmitting}
          maxLength={150}
        />
        {errors.subject && <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-montserrat font-medium text-black mb-2">
          Wiadomość *
        </label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors resize-vertical font-montserrat ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Twoja wiadomość..."
          disabled={isSubmitting}
          maxLength={1000}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600 font-montserrat">{errors.message}</p>}
        <p className="mt-1 text-xs text-gray-500 font-montserrat">
          {formData.message.length}/1000 znaków
        </p>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-montserrat font-medium py-3 rounded-lg transition-all duration-300 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-800 transform hover:scale-[1.02]'
        } text-white`}
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>

      <p className="text-xs text-gray-500 text-center font-montserrat">
        * Pola wymagane
      </p>

      <div className="text-xs text-gray-400 text-center font-montserrat bg-gray-50 p-3 rounded-lg">
        <p>🔒 Bezpieczny formularz</p>
        <p>Twoje dane są chronione i będą używane wyłącznie do kontaktu z Tobą.</p>
      </div>
    </form>
  );
}