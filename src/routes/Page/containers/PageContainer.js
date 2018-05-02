import { connect } from 'react-redux'
import { updatePage } from '../modules/page'
import Page from '../components/PageView'

const mapDispatchToProps = {
  updatePage,
}

const mapStateToProps = (state) => ({
  page: state.page
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
