import Image from 'next/image';
import moment from 'moment';
import { useState } from 'react';

export default function DatePicker({ currentDate }: { currentDate: Date }) {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const dateTitle =
    moment(currentDate).format('MMM') +
    ', ' +
    moment(currentDate).format('YYYY');

  const monthYear =
    moment(currentDate).format('MMMM') +
    ' ' +
    moment(currentDate).format('YYYY');

  const dayHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysOfMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay();
    const daysGrid: number[][] = [];

    let day = 1;
    let elementNumber = 0;
    for (let row = 0; row < 6; row++) {
      daysGrid.push([]);

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if (elementNumber >= startDay && day <= daysOfMonth) {
          daysGrid[row][dayOfWeek] = day;
          day++;
        } else if (elementNumber < startDay) {
          daysGrid[row][dayOfWeek] = new Date(
            year,
            month - 1,
            -startDay + elementNumber + 1
          ).getDate();
        } else {
          day = 1;
          daysGrid[row][dayOfWeek] = day;
          day++;
        }

        elementNumber++;
      }
    }

    return daysGrid;
  };

  const calendarGrid = generateDays();

  const getMonthFromGrid = (row: number, day: number) => {
    let month = currentDate.getMonth();
    if (row === 0 && day > 7) {
      month = month - 1;
    } else if (row > 3 && day < 14) {
      month = month + 1;
    }

    return month;
  };

  const isCurrentMonth = (row: number, day: number) => {
    return getMonthFromGrid(row, day) === currentDate.getMonth();
  };

  const isSelectedDate = (row: number, day: number, date: Date) => {
    return (
      date &&
      day === date.getDate() &&
      getMonthFromGrid(row, day) === date.getMonth() &&
      currentDate.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (row: number, day: number) => {
    const today = new Date();
    const displayMonth = getMonthFromGrid(row, day);

    return (
      day === today.getDate() &&
      displayMonth === today.getMonth() &&
      displayMonth === currentDate.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDayClick = (row: number, day: number) => {
    // const month = getMonthFromGrid(row, day)
    // if (month !== currentDate.getMonth()) {
    //   this.selectedDate = new Date(this.currentDate?.setMonth(month))
    //   if (this.inputMode === 'single') {
    //     this.startDate = new Date(this.currentDate?.setMonth(month))
    //   }
    //   this.changeMonth(month)
    // }

    setSelectedDate(new Date(currentDate?.setDate(day)));

    // this.$emit('setDate', {
    //   date: this.selectedDate
    // })
  };

  return (
    <div className="flex flex-col bg-greyscale-bg-light rounded-[10px] py-4 drop-shadow-card">
      <p className="ml-6 text-base font-normal">Text</p>
      <p className="ml-6 text-[32px] leading-[44px] font-bold">{dateTitle}</p>

      <div className="flex flex-row justify-between mt-[15px]">
        <button>
          <Image
            src="/arrow-left.svg"
            alt="Arrow Left"
            width={48}
            height={48}
          />
        </button>
        <button className="text-base font-normal">{monthYear}</button>
        <button>
          <Image
            src="/arrow-right.svg"
            alt="Arrow Right"
            width={48}
            height={48}
          />
        </button>
      </div>

      {dayHeader && calendarGrid && (
        <div className="mx-4 mt-2">
          <div className="mb-[13px] flex flex-row justify-between">
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

      <div className="flex flex-row self-end mr-[27px] mt-3">
        <button className="px-4 py-2 text-sm mr-[38px]">Cancel</button>
        <button className="px-4 py-2 text-sm">Ok</button>
      </div>
    </div>
  );
}
