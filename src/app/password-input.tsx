import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PasswordInput({ label }: { label: string }) {
  const [isInputting, setIsInputting] = useState(false);
  const [passString, setPassString] = useState('');
  const [inputMask, setInputMask] = useState('');
  const [key, setKey] = useState('');

  const handleInputChange = (e: any) => {
    const cursorPosition = e.target.selectionStart;

    // prevent edits mid-string to preserve simplicity of masking function
    if (cursorPosition > passString.length || key === 'Backspace') {
      const input = e.target.value;
      let savedInput;

      // assume all edits occur at the end of the input
      if (input.length < passString.length) {
        savedInput = passString.slice(0, input.length);
      } else {
        savedInput = passString + input.slice(-1);
      }

      setPassString(savedInput);
      const mask = '*'.repeat(e.target.value.length);
      setInputMask(mask);
    }
  };

  const handleKeyPress = (e: any) => {
    setKey(e.key);
  };

  const validators: { [index: string]: string } = {
    upperCase: 'Have at lease one uppercase letter',
    lowerCase: 'Have at least one lowercase letter',
    number: 'Have at least one number',
    special: 'Have at least one special character (!@#$...etc)',
    length: 'Longer than 8 characters',
  };

  const [testResults, updateTestResults] = useState<{
    [index: string]: boolean;
  }>(
    Object.keys(validators).reduce((object, key) => {
      return {
        ...object,
        [key]: false,
      };
    }, {})
  );

  useEffect(() => {
    const validateInput = () => {
      updateTestResults((testResults) => ({
        ...testResults,
        ...{ ['upperCase']: !!passString.match(/[A-Z]/) },
        ...{ ['lowerCase']: !!passString.match(/[a-z]/) },
        ...{ ['number']: !!passString.match(/[0-9]/) },
        ...{ ['special']: !!passString.match(/[!@#$%^&*()~{}]/) },
        ...{ ['length']: passString.length > 8 },
      }));
    };

    validateInput();
  }, [passString]);

  const shouldSelectTick = (key: string) => {
    return testResults[key] ? '/tick-select.svg' : '/tick-unselect.svg';
  };

  return (
    <div className="relative">
      <button
        className={`font-ubuntu relative w-[335px] outline outline-[3px] -outline-offset-[3px] rounded-lg text-left px-3 pt-[19px] pb-[15px] focus-within:outline-primary-main outline-greyscale-white-50
        ${!isInputting && 'hover:outline-greyscale-white'}`}
      >
        <div className="absolute z-10 -top-[7.5px] text-xs font-normal tracking-[0.4px] leading-[18px] px-1 bg-greyscale-bg-dark">
          {label}
        </div>
        <input
          className="font-normal text-base tracking-[0.15px] bg-transparent w-full focus:outline-none placeholder:opacity-[0.4]"
          placeholder="Password"
          value={inputMask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsInputting(true)}
          onBlur={() => setIsInputting(false)}
        />
      </button>
      {isInputting && (
        <div className="flex flex-col absolute top-[78px] z-20 px-3 py-2 bg-greyscale-800 rounded-lg">
          {Object.keys(validators).map((key) => {
            return (
              <div key={key} className="flex flex-row">
                <Image
                  src={shouldSelectTick(key)}
                  alt="tick"
                  width={24}
                  height={24}
                />
                <div className=" py-2 pl-[10px] pr-4 font-ubuntu text-sm font-normal leading-[21px] tracking-[0.25px]">
                  {validators[key]}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
