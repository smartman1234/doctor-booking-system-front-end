import React from 'react'
import { Select } from 'semantic-ui-react'

const cities = [
  { key: 'dd', value: 'dd', text: 'AL Buheira' },
  { key: 'aa', value: 'aa', text: 'Cairo' }
]

const Cities = () => (
  <Select placeholder='Our Systems' style={{ border: "none" }} options={cities} />
)

export default Cities
