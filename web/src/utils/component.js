import ConfirmDialog from '@/components/ConfirmDialog'
import TableTemplate from '@/components/TableTemplate'
import FormTemplate from '@/components/FormTemplate'
import MessageBlock from '@/components/MessageBlock'
import PureTextForm from '@/components/PureTextForm'



export default (Vue)=>{
  Vue.component("ConfirmDialog", ConfirmDialog)
  Vue.component('TableTemplate', TableTemplate)
  Vue.component('FormTemplate', FormTemplate)
  Vue.component('MessageBlock', MessageBlock)
  Vue.component('PureTextForm', PureTextForm)
}
