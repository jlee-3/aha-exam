import { useState } from 'react';
import DatePicker from '../components/date-picker';
import moment from 'moment';

export default function DateInput({ label }: { label: string }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasChosenDate, setHasChosenDate] = useState(false);

  const formattedDate = moment(selectedDate).format('MM/DD/YYYY');

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
    setHasChosenDate(true);
  };

  return (
    <div>
      <button
        className={`font-ubuntu relative w-[335px] outline outline-[3px] -outline-offset-[3px] rounded-lg text-left px-3 pt-[19px] pb-[15px]
        ${
          showDatePicker
            ? 'outline-greyscale-white'
            : 'outline-greyscale-white-50'
        }`}
        onClick={() => setShowDatePicker(true)}
      >
        <div className="absolute z-10 -top-[8px] text-xs tracking-[0.4px] leading-[18px] px-1 bg-greyscale-bg-dark">
          {label}
        </div>
        <div
          className={`font-normal text-base tracking-[0.15px] 
        ${!hasChosenDate && 'opacity-[0.30000001192092896]'}`}
        >
          {hasChosenDate ? formattedDate : 'mm/dd/yyyy'}
        </div>
      </button>
      {showDatePicker && (
        <DatePicker
          currentDate={selectedDate}
          onFinish={handleDateChange}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}
