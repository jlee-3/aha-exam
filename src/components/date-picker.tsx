import Image from 'next/image';
import moment from 'moment';
import { useState } from 'react';

export default function DatePicker({
  currentDate,
  onFinish,
  onClose,
}: {
  currentDate: Date;
  onFinish: (selectedDate: Date) => void;
  onClose: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [shouldShowCalendar, setShouldShowCalendar] = useState(true);

  const dateTitle =
    moment(selectedDate).format('MMM') +
    ', ' +
    moment(selectedDate).format('YYYY');

  const monthYear =
    moment(selectedDate).format('MMMM') +
    ' ' +
    moment(selectedDate).format('YYYY');

  const dayHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const generateCalendarGrid = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const daysOfMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay();
    const calendarGrid: number[][] = [];

    let day = 1;
    let elementNumber = 0;
    for (let row = 0; row < 6; row++) {
      calendarGrid.push([]);

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if (elementNumber >= startDay && day <= daysOfMonth) {
          calendarGrid[row][dayOfWeek] = day;
          day++;
        } else if (elementNumber < startDay) {
          calendarGrid[row][dayOfWeek] = new Date(
            year,
            month - 1,
            -startDay + elementNumber + 1
          ).getDate();
        } else {
          day = 1;
          calendarGrid[row][dayOfWeek] = day;
          day++;
        }

        elementNumber++;
      }
    }

    return calendarGrid;
  };

  const calendarGrid = generateCalendarGrid();

  // calculates the 20 year window a given year resides in
  const generateYearGrid = (inputYear: number) => {
    const yearLastTwoDigits = Math.max(Number(String(inputYear).slice(-2)), 0);
    const century = Math.max(Math.floor(inputYear / 100), 0); // e.g. 21st century
    let startDecade = Math.floor(yearLastTwoDigits / 20);

    // for the last year in the 20 year window, avoid jumping to the next window
    if (inputYear > 0 && inputYear % 20 === 0) {
      startDecade--;
    }

    const startYear = startDecade * 20 + century * 100;
    let year = startYear + 1;
    const yearGrid: number[][] = [];

    for (let row = 0; row < 5; row++) {
      yearGrid[row] = [];
      for (let col = 0; col < 4; col++) {
        yearGrid[row][col] = year;
        year++;
      }
    }

    return yearGrid;
  };

  const yearGrid = generateYearGrid(selectedDate.getFullYear());

  const getMonthFromGrid = (row: number, day: number) => {
    let month = selectedDate.getMonth();
    if (row === 0 && day > 7) {
      month = month - 1;
    } else if (row > 3 && day < 14) {
      month = month + 1;
    }

    return month;
  };

  const isCurrentMonth = (row: number, day: number) => {
    return getMonthFromGrid(row, day) === selectedDate.getMonth();
  };

  const isSelectedDate = (row: number, day: number, date: Date) => {
    return (
      date &&
      day === date.getDate() &&
      getMonthFromGrid(row, day) === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (row: number, day: number) => {
    const today = new Date();
    const displayMonth = getMonthFromGrid(row, day);

    return (
      day === today.getDate() &&
      displayMonth === today.getMonth() &&
      displayMonth === selectedDate.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const changeMonth = (month: number) => {
    let year = selectedDate.getFullYear();
    let targetMonth = month;

    if (month === 12) {
      targetMonth = 0;
      setSelectedDate(new Date(selectedDate?.setFullYear(year + 1)));
    } else if (month === -1) {
      targetMonth = 11;
      setSelectedDate(new Date(selectedDate?.setFullYear(year - 1)));
    }

    setSelectedDate(new Date(selectedDate?.setMonth(targetMonth)));
  };

  const handleArrowClick = (direction: -1 | 1) => {
    if (shouldShowCalendar) {
      changeMonth(selectedDate.getMonth() + direction);
    } else {
      const selectedYear = selectedDate.getFullYear();
      // add 20 years to the current year to shift to the next 20 year window
      let newYear = selectedYear + direction * 20;
      if (newYear > 0) {
        setSelectedDate(new Date(selectedDate?.setFullYear(newYear)));
      }
    }
  };

  const handleDayClick = (row: number, day: number) => {
    const month = getMonthFromGrid(row, day);
    if (month !== selectedDate.getMonth()) {
      setSelectedDate(new Date(selectedDate?.setMonth(month)));
      changeMonth(month);
    }

    setSelectedDate(new Date(selectedDate?.setDate(day)));
  };

  const handleYearClick = (year: number) => {
    setSelectedDate(new Date(selectedDate?.setFullYear(year)));
    setShouldShowCalendar(true);
  };

  return (
    <div className="w-[320px] flex flex-col bg-greyscale-bg-light rounded-[10px] py-4 mt-[14px] drop-shadow-card font-inter">
      <p className="ml-6 text-base font-normal">Text</p>
      <p className="ml-6 text-[32px] leading-[44px] font-bold">{dateTitle}</p>

      <div className="flex flex-row w-[320px] justify-between mt-[15px]">
        <button onClick={() => handleArrowClick(-1)}>
          <Image
            src="/arrow-left.svg"
            alt="Arrow Left"
            width={48}
            height={48}
          />
        </button>
        <button
          onClick={() => setShouldShowCalendar(!shouldShowCalendar)}
          className="text-base font-normal"
        >
          {shouldShowCalendar ? monthYear : selectedDate.getFullYear()}
        </button>
        <button onClick={() => handleArrowClick(1)}>
          <Image
            src="/arrow-right.svg"
            alt="Arrow Right"
            width={48}
            height={48}
          />
        </button>
      </div>

      {shouldShowCalendar && dayHeader && calendarGrid && (
        <div className="mx-4 mt-2">
          <div className="flex flex-row justify-between">
            {dayHeader.map((day, index) => {
              return (
                <div
                  key={index}
                  className="text-[11px] leading-[13px] text-center w-9 text-greyscale-500 mb-3"
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col">
            {calendarGrid.map((row, rowNumber) => {
              return (
                <div key={rowNumber} className="flex flex-row justify-between">
                  {row.map((day, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => handleDayClick(rowNumber, day)}
                        className={`w-9 h-9 mx-[3px] text-sm font-normal first:m-0 last:m-0 rounded-full hover:bg-white hover:text-greyscale-bg-darker
                          ${
                            !isCurrentMonth(rowNumber, day) &&
                            'text-greyscale-500'
                          }
                          ${
                            isSelectedDate(rowNumber, day, selectedDate) &&
                            'bg-primary-main'
                          }
                          ${
                            isToday(rowNumber, day) &&
                            'border border-primary-main'
                          }
                          `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!shouldShowCalendar && (
        <div className="w-[271px] mx-6 mt-[18px]">
          {yearGrid.map((row, rowNumber) => {
            return (
              <div
                key={rowNumber}
                className="flex flex-row justify-between my-6 first:mt-0 last:mb-0"
              >
                {row.map((year, yearIndex) => {
                  return (
                    <button
                      key={yearIndex}
                      onClick={() => handleYearClick(year)}
                      className={`w-[61px] font-normal text-base rounded-sm hover:bg-white hover:text-greyscale-bg-dark
                      ${
                        selectedDate.getFullYear() === year && 'bg-primary-main'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      <div
        className={`flex flex-row self-end mr-[27px]
        ${shouldShowCalendar ? 'mt-3' : 'mt-[27px]'}`}
      >
        <button
          className="px-4 py-2 text-sm mr-[38px]"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm"
          onClick={() => {
            onFinish(selectedDate);
            onClose();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
