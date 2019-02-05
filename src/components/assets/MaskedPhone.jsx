import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

export default function MaskedPhone(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', '0', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

MaskedPhone.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
