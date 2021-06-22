import React from 'react'
import { Select } from 'semantic-ui-react'

const departments = [
  { key: 'gg', value: 'gg', text: 'Dept1' },
  { key: 'hh', value: 'hh', text: 'Dept2' }
]

const Departments = () => (
  <Select placeholder='Our Systems' style={{ border: "none" }} options={departments} />
)

export default Departments
