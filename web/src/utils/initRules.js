import rule from '@/utils/rule'
export default fieldList => {
  const obj = {}
  // 循环字段列表
  for (const item of fieldList) {
    const type = item.type === 'select' ? '选择' : '输入'
    obj[item.value] = []
    if (item.required) {
      // 1.是否必填
      obj[item.value].push({
        required: item.required,
        message: '请' + type + item.label,
        trigger: item.type === 'select' ? 'change' : 'blur'
      })
    }
    if (item.validator) {
      // 2. 自定义校验
      obj[item.value].push({
        validator: rule[item.validator],
        trigger: item.type === 'select' ? 'change' : 'blur'
      })
    }
  }
  return obj
}
