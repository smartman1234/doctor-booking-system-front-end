import React from 'react'
import { Select } from 'semantic-ui-react'

const langs = [
  { key: 'en', value: 'en', text: 'English' },
  { key: 'ar', value: 'ar', text: 'Arabic' }
]

const Languages = () => (
  <Select placeholder='Languages' style={{ border: "none" }} options={langs} />
)

export default Languages
