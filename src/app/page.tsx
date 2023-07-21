'use client';

import { useState } from 'react';
import PasswordInput from './password-input';
import DateInput from './date-input';

export default function Home() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-greyscale-bg-dark">
      <div className="mb-8">
        <h2 className={`mb-3 text-2xl font-semibold`}>Password Input</h2>
        <PasswordInput label={'Password'} />
      </div>
      <div className="mb-8">
        <h2 className={`mb-3 text-2xl font-semibold`}>Date Picker</h2>
        <DateInput label={'Birthday'} />
      </div>
    </main>
  );
}
