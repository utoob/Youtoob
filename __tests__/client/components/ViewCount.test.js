import React from 'react'
import { shallow } from 'enzyme'
import ViewCount from '../../../client/components/ViewCount'

it(`should render a node element with text of '0 views'`, () => {
  const viewCount = 0
  const wrapper = shallow(<ViewCount viewCount={viewCount} />)
  expect(wrapper.find('.view-count').text()).toEqual('0 views')
})

it(`should render a node element with text of '1 view'`, () => {
  const viewCount = 1
  const wrapper = shallow(<ViewCount viewCount={viewCount} />)
  expect(wrapper.find('.view-count').text()).toEqual('1 view')
})

