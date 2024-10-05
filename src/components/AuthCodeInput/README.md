## Learnings
  - the component needed two state values, which are:
    - `digits: Array<string>`: which are entered into every digit-input
    - `focusIndex: number`: index which defines which digit-input should be focussed
      - this `focusIndex` is moved forward when digit value is entered in current input
      - when `Backspace` key is pressed we move focus to previous input

## Events to listen
  - initially I thought listening to  `onChange` should cover all the scenarios but `onChange` doesn't fires when `Backspace`, `ArrowLeft` or `ArrowRight` keys are pressed hence we have to listen for `onKeyUp or onKeyDown` event
  - `clampIndex(nextIndex)` is very useful function, it will restrict `nextIndex` value to be within the bounds, hence we can just increment/decrement the focusIndex & just invoke `clampIndex()` to safely set `focusIndex`
  - once `handleKeyDown` is setup then we can easily handle different key presses for eg: `e.key` `ArrowLeft`, `ArrowRight`

## DigitInput component
```jsx
  <DigitInput value={digits[index]} isFocussed={focusIndex === index}
    onKeyDown={handleKeyPress}
    onFocus={() => setFocusIndex(index)}
  />
```
  - `DigitInput` component is responsible for showing each individual digit-input (by default we show 6 DigitInput components)
  - to focus the specific DigitInput we pass `isFocussed` prop, internally component uses effect to invoke `.focus()` on elementRef
  - add `maxLength=1` to underlying `<input />` element
  - 