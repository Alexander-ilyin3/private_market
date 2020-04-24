import { getDefaultClasses } from 'config/defaultClasses'

export const styles = theme => ({
  ...getDefaultClasses(theme),
  formError: {
    fontWeight: '500',
    textAlign: 'center',
  },
})
