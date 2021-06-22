import React from 'react'
import { Select } from 'semantic-ui-react'

const opts = [
    { key: 'doc', value: 'doc', text: 'For Doctor' },
    { key: 'pha', value: 'pha', text: 'For Pharmacy' }
]

const OurSystem = () => (
    <Select placeholder='Our Systems' style={{ border: "none" }} options={opts} />
)

export default OurSystem
