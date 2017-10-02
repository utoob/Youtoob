import React from 'react'
import { shallow } from 'enzyme'
import ViewCount from '../../../client/components/ViewCount'

/* Prompt #5:
 * Objectives:
 * - Be able to test react components
 * 
 * To pass the prompt:
 *
 * 1. Create the variable viewCount that will be passed down to the component as a prop
 * 2. Shallowly render ViewCount component, passing viewCount as a prop and store it in a 
 *    variable called wrapper.
 * 3. Find the wrapper's element's text with the class of .view-count and assert that it 
 *    is equal to `0 views`
 *
 * To pass the second prompt:
 * 1. Do the same, except having viewCount as 1 and expect the text to equal `1 view`
 *
 * Read more about shallow rendering here:
 * https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
 */

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

