'use client';

import { useState } from 'react';
import DatePicker from '../components/date-picker';

export default function Home() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const startingDate = new Date();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Date Picker</h2>
        </button>
      </div>

      <div>{showDatePicker && <DatePicker currentDate={startingDate} />}</div>
    </main>
  );
}
