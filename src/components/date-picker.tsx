import Image from 'next/image';
import moment from 'moment';

export default function DatePicker({ currentDate }: { currentDate: Date }) {
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

  return (
    <div className="flex flex-col bg-[#1B1B1B] rounded-[10px] py-4">
      <p className="ml-6 text-base">Text</p>
      <p className="ml-6">{dateTitle}</p>

      <div className="flex flex-row justify-between">
        <button>
          <Image
            src="/arrow-left.svg"
            alt="Arrow Left"
            width={48}
            height={48}
          />
        </button>
        <button>{monthYear}</button>
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
        <table className="border-collapse border-spacing-0 mx-4">
          <thead>
            <tr>
              {dayHeader.map((day, index) => {
                return (
                  <td key={index} className="text-center bg-slate-500">
                    {day}
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {calendarGrid.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((day, index) => {
                    return (
                      <td key={index}>
                        <button className="w-9 h-9 border-none rounded-full bg-zinc-600 m-[3px] hover:bg-white">
                          {day}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="flex flex-row self-end mr-[27px] mt-3">
        <button className="px-4 py-2 text-sm mr-[38px]">Cancel</button>
        <button className="px-4 py-2 text-sm">Ok</button>
      </div>
    </div>
  );
}
