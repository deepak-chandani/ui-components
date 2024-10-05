import { useState, useEffect, useRef } from "react";
import "./styles.css";

type AuthCodeInputProps = {
  length?: number;
  onSubmit: (code:string) => void;
}

export default function AuthCodeInput({ length = 6, onSubmit }: AuthCodeInputProps) {
  const [focusIndex, setFocusIndex] = useState(0);
  const [digits, setDigits] = useState(() => createArray(length));

  function clamp(value: number){
    if(value >= length) return length-1
    if(value < 0) return 0
    return value
  }

  function moveFocusToPrevious(){
    setFocusIndex(clamp(focusIndex - 1))
  }

  function moveFocusToNext(){
    setFocusIndex(clamp(focusIndex + 1))
  }

  function handleSubmit() {
    const otpValue = digits.join("");
    onSubmit(otpValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log("KeyPress", e);
    console.log("KeyPress", e.key);
    const index = parseInt(e.target.dataset.index)

    const isBackspace = e.key === "Backspace";

    // isBackspace && digits[focusIndex] is empty string then move to previous input
    console.log({isBackspace, digitValue: digits[index]})

    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      const moveFocus = e.key === 'ArrowLeft' ? moveFocusToPrevious : moveFocusToNext;
      moveFocus();
      return
    }

    if(isBackspace){
      // Backspace pressed either clear current digit-input or move to previous input
      if(digits[index].length === 0){
        // clear the previous input
        setDigits((digits) => {
          const newDigits = [...digits]
          newDigits[index-1] = ''
          return newDigits
        })
        moveFocusToPrevious()
      } else {
        // clear digits[index]
        setDigits((digits) => {
          const newDigits = [...digits]
          newDigits[index] = ''
          return newDigits
        })
      }
      return
    }

    if (isNumber(e.key)) {
      setDigits((digits) => {
        const clone = digits.slice();
        clone[index] = e.key;
        return clone;
      });

      // move focus to next digit-input
      if(e.key) {
        setFocusIndex(clamp(index + 1)) 
      }
    }    

  }

  function renderDigits() {
    return digits.map((digit, index) => {
      return (
        <Digit
          key={index}
          index={index}
          value={digit}
          onKeyUp={handleKeyDown}
          focus={focusIndex === index}
        />
      );
    });
  }

  const hasEmptyDigit = digits.some((v) => v.length === 0);
  return (
    <div className="container">
      <div className="digits-wrapper">{renderDigits()}</div>
      <div className="buttons-wrapper">
        <button>Reset</button>
        <button disabled={hasEmptyDigit} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

type DigitProps = {
  index: number,
  value: string,
  focus: boolean,
  onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
}
// controlled Digit-Input component
function Digit({index, value, focus, onKeyUp }: DigitProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focus) return;
    inputRef.current?.focus();
  }, [focus]);

  return (
    <input
      ref={inputRef}
      className="digit-input"
      value={value}
      data-index={index}
      onKeyUp={onKeyUp}
    />
  );
}

function isNumber(v: unknown): v is number {
  const num = Number(v);
  return !Number.isNaN(num);
}

function createArray(length: number) {
  return new Array(length).fill("");
}