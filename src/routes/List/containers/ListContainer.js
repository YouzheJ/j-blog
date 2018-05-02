import { connect } from 'react-redux'
import { updateList } from '../modules/list'
import List from '../components/ListView'

const mapDispatchToProps = {
  updateList,
}

const mapStateToProps = (state) => ({
  list: state.list,
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
