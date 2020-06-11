import { connect } from 'react-redux'

import { userListInfo } from 'storage/selectors/user.selector'
import { getUser, setStatus } from 'services/api/user.service'

import UserList from './UserList'


const mapStateToProps = state => ({
  userData: userListInfo(state),
})

const mapDispatchToProps = dispatch => ({
  getUserList: config => dispatch(getUser(config)),
  setStatus: status => dispatch(setStatus(status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
