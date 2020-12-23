import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

export default function MaskedPhone(props) {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(',  /[0]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      onInput={setCursor}
      onFocus={setCursor}
      onClick={setCursor}
    />
  )
}

const setCursor = (e) => {
  const { target } = e
  const lastDigit = target.value.search(/\d\D*?$/gm) + 1
  target.selectionStart=lastDigit
  target.selectionEnd=lastDigit
}

MaskedPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
