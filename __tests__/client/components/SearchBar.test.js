import React from 'react'
import { mount } from 'enzyme'
import SearchBar from '../../../client/components/SearchBar'
import { MemoryRouter as Router } from 'react-router-dom'

function generateSearchBar() {
  // mock history and location
  const history = { push: jest.fn() }
  const location = { search: "?q=testQuery" } 

  const searchBarWrapper = mount(
    <SearchBar.WrappedComponent 
      location={location} 
      history={history}
    />
  )

  return { history, location, searchBarWrapper }
}

// Simulating onSubmit event should:
// invoke history.push (changing url)
test.skip('simulate onSubmit event', () => {
  const { history, searchBarWrapper } = generateSearchBar()
  const form = searchBarWrapper.find('form')
  form.simulate('submit')
  expect(history.push).toHaveBeenCalledTimes(1)
  expect(history.push).toHaveBeenCalledWith(`/?q=testQuery`)
})

// Simulating onChange event should:
// invoke setState({query: <value>})
// set the default value of input to state.query
test.skip('simulate onChange event', () => {
  const { searchBarWrapper } = generateSearchBar()
  const input = searchBarWrapper.find('input')
  input.simulate('change', { target: { value: 'testInput' } })

  expect(input.get(0).defaultValue).toEqual('testInput')
  expect(searchBarWrapper.state().query).toEqual('testInput')
})
