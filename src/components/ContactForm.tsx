import { useState, useRef } from "react";
import * as React from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Imię i nazwisko jest wymagane';
    else if (formData.name.trim().length < 2) newErrors.name = 'Minimum 2 znaki';

    if (!formData.email.trim()) newErrors.email = 'Email jest wymagany';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Nieprawidłowy email';

    if (!formData.subject.trim()) newErrors.subject = 'Temat jest wymagany';
    else if (formData.subject.trim().length < 3) newErrors.subject = 'Minimum 3 znaki';

    if (!formData.message.trim()) newErrors.message = 'Wiadomość jest wymagana';
    else if (formData.message.trim().length < 10) newErrors.message = 'Minimum 10 znaków';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);
    formRef.current?.submit(); // submit native form
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      action="https://formspree.io/f/xqabjola"
      method="POST"
      className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100"
    >
      <input type="hidden" name="_subject" value="Nowa wiadomość z formularza ON.AI" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-black mb-2">Imię i nazwisko *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={100}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={100}
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">Temat *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={150}
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Wiadomość *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          maxLength={1000}
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
        <p className="text-xs text-gray-500 mt-1">{formData.message.length}/1000 znaków</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>

      <p className="text-xs text-gray-500 text-center font-montserrat mt-4">* Pola wymagane</p>
    </form>
  );
}
