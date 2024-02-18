import get from 'lodash-es/get'
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  properties: {
    viewRule: {
      type: Object,
      value: {}
    }
  },
  data: {
    type: '',
    title: '',
    placeholder: '',
    value: '',
    titlewidth: '110px',
    readonly: false,
    required: false,
    hidden: false
  },
  created () {
    console.log('baseMixin')
    this.type = get(this.viewRule, 'type', '')
    this.title = get(this.viewRule, 'title', '')
    this.placeholder = get(this.viewRule, 'placeholder', '')
    this.value = get(this.viewRule, 'value', '')
    this.readonly = get(this, 'viewRule.readonly') === '1'
    this.required = get(this, 'viewRule.required') === '1'
    this.hidden = get(this, 'viewRule.hidden') === '1'
  },
  methods: {
    getValue () {
      return cloneDeep(this.value)
    },
    setValue (data) {
      this.value = cloneDeep(data)
    },
    getProp (type) {
      if (type === 'value') {
        return this.getValue()
      } else {
        return this[type]
      }
    },
    setProp (type, value) {
      this[type] = value
    }
  }
}
