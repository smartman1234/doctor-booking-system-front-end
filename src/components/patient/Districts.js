import React from 'react'
import { Select } from 'semantic-ui-react'

const districts = [
  { key: 'tt', value: 'tt', text: 'El-Delengat' },
  { key: 'ff', value: 'ff', text: 'Itay' }
]

const Districts = () => (
  <Select placeholder='Our Systems' style={{ border: "none" }} options={districts} />
)

export default Districts
