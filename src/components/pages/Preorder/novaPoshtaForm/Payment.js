import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { FormControl as RFormControl } from 'components/parts/ReactiveForm'
import DefaultInputRender from 'components/parts/FormParts/DefaultInputRrnder'
import SelectorRender from 'components/parts/FormParts/Selector'
import RenderColumnItem from 'components/parts/RenderColumnItem'
import InputAsLabel from 'components/parts/FormParts/InputAsLabel'


const Delivery = ({
  paymentMethods,
}) => {
  const paymentMethodsWithDisabledPrepayment = paymentMethods.map((method) => {
    if (method.id === 2) {
      return { ...method, disabled: true }
    }
    return method
  })
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant='h5'>
        Оплата
      </Typography>
      <RenderColumnItem
        labelWeight={6}
        label={(
          <RFormControl
            name='paymentType'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={paymentMethodsWithDisabledPrepayment.map(({ id, name, disabled }) => ({ value: id, label: name, disabled }))}
                />
              </InputAsLabel>
            )}
          />
        )}
        value={<RFormControl name='paymentAmount' render={DefaultInputRender} />}
      />
      <RenderColumnItem
        labelWeight={6}
        label={(
          <RFormControl
            name='deliveryPayer'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Отправитель' },
                    { value: 2, label: 'Получатель' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
        value={(
          // <RFormControl
          //   name='CODPayer'
          //   render={props => (
          //     <InputAsLabel>
          //       <SelectorRender
          //         {...props}
          //         items={[
          //           { value: 1, label: 'Отправитель' },
          //           { value: 2, label: 'Получатель' },
          //         ]}
          //       />
          //     </InputAsLabel>
          //   )}
          // />
          <RFormControl
            name='paymentForm'
            render={props => (
              <InputAsLabel>
                <SelectorRender
                  {...props}
                  items={[
                    { value: 1, label: 'Безналичный' },
                    { value: 2, label: 'Наличный' },
                  ]}
                />
              </InputAsLabel>
            )}
          />
        )}
      />
      {/* <RenderColumnItem
      labelWeight={6}
      label={(
        <RFormControl
          name='paymentForm'
          render={props => (
            <InputAsLabel>
              <SelectorRender
                {...props}
                items={[
                  { value: 1, label: 'Безналичный' },
                  { value: 2, label: 'Наличный' },
                ]}
              />
            </InputAsLabel>
          )}
        />
      )}
      value={( */}
      <RFormControl name='insuranceAmount' render={DefaultInputRender} />
      {/* )}
    /> */}
    </Paper>
  )
}

Delivery.defaultProps = {
  paymentMethods: [],
}

Delivery.propTypes = {
  paymentMethods: PropTypes.array,
}

export default Delivery
