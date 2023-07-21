import { useState } from 'react';

export default function PasswordInput({ label }: { label: string }) {
  const [showValidation, setShowValidation] = useState(false);
  const [isInputting, setIsInputting] = useState(false);
  const [passString, setPassString] = useState('');
  const [inputMask, setInputMask] = useState('');

  const handleInputChange = (e: any) => {
    const input = e.target.value;
    let savedInput;

    if (input.length < passString.length) {
      savedInput = passString.slice(0, input.length);
    } else {
      savedInput = passString + input.slice(-1);
    }

    setPassString(savedInput);
    const mask = '*'.repeat(e.target.value.length);
    setInputMask(mask);
  };

  return (
    <div>
      <button
        className={`font-ubuntu relative w-[335px] outline outline-[3px] -outline-offset-[3px] rounded-lg text-left px-3 pt-[19px] pb-[15px] focus-within:outline-primary-main outline-greyscale-white-50
        ${!isInputting && 'hover:outline-greyscale-white'}`}
        onClick={() => setShowValidation(true)}
      >
        <div className="absolute z-10 -top-[7.5px] text-xs font-normal tracking-[0.4px] leading-[18px] px-1 bg-greyscale-bg-dark">
          {label}
        </div>
        <input
          className="font-normal text-base tracking-[0.15px] bg-transparent w-full focus:outline-none"
          placeholder="Password"
          value={inputMask}
          onChange={handleInputChange}
          onFocus={() => setIsInputting(true)}
          onBlur={() => setIsInputting(false)}
        />
      </button>
      {showValidation && <></>}
    </div>
  );
}
