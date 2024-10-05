const { useState } = require("react")

function createArray(length){
  return new Array(length).fill("")
}

function AuthCodeInput({length=6, onSubmit}){
  const [focusIndex, setFocusIndex] = useState(0) // defines which digit-input to focus on 
  const [digits, setDigits] = useState(() => createArray(length))

  function handleDigitChange(e){
    // only allow numbers 0 to 9
    // if valid value is entered then save it and move focus to next input (except when already on last-input)
    const {value} = e.target
    if(isNumber(value)){
      setDigits(digits => {
        const clone = digits.slice()
        clone[focusIndex] = value
        return clone
      })

      // move focus to next digit-input
      const nextIndex = focusIndex+1 == length ? focusIndex : focusIndex+1;
      setFocusIndex(nextIndex)
    }

    // handle Backspace key press
    const isBackspace = false;
    if(isBackspace){

    }

  }

  function handleSubmit(){
    const otpValue = digits.join('')
    onSubmit(otpValue)
  }

  function renderDigits(){
    return digits.map((digit, index) => {
      return <Digit key={index} value={digit} onChange={handleDigitChange}  />
    })
  }

  const hasEmptyDigit = digits.some(v => v.length===0)

  return (
    <div className="container">
      <div className="digits-wrapper">
        <Digit value="" onChange={handleDigitChange} />
      </div>
      <div>
        <button>Reset</button>
        <button disabled={hasEmptyDigit}>Submit</button>
      </div>
    </div>
  )
}

// controlled Digit-Input component 
function Digit({value, onChange}){

  return (
    <input className="digit-input" value={value} onChange={onChange}  />
  )
}

/*
 whenever digit is entered , set its value & then move to next digit
 when Backspace key is pressed then 
  - if digit-input has value then delete that
  - if digit-input is empty then move focus to previous digit-input 

 NO ❌ LEFT/RIGHT arrowButtons should move the focusIndex to left/right digit-input 
*/