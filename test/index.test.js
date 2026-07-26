/** @jest-environment jsdom */

describe('DOM behavior helpers', () => {
  let domLogic

  beforeEach(() => {
    jest.resetModules()

    document.body.innerHTML = `
      <div id="dynamic-content"></div>
      <button id="simulate-click">Simulate</button>
      <form id="user-form">
        <input type="text" name="name" />
      </form>
      <div id="error-message" class="hidden"></div>
    `

    domLogic = require('../index')
  })

  test('addElementToDOM updates the target container with the supplied content', () => {
    const container = document.getElementById('dynamic-content')

    domLogic.addElementToDOM('dynamic-content', '<p>Added</p>')

    expect(container.innerHTML).toBe('<p>Added</p>')
  })

  test('removeElementFromDOM removes the target element from the DOM', () => {
    const removable = document.createElement('div')
    removable.id = 'remove-me'
    document.body.appendChild(removable)

    domLogic.removeElementFromDOM('remove-me')

    expect(document.getElementById('remove-me')).toBeNull()
  })

  test('simulateClick updates the DOM content to reflect the click action', () => {
    const container = document.getElementById('dynamic-content')

    domLogic.simulateClick('dynamic-content', 'Button Clicked!')

    expect(container.textContent).toBe('Button Clicked!')
  })

  test('handleFormSubmit updates the DOM with valid input and clears the error state', () => {
    const form = document.getElementById('user-form')
    const input = form.querySelector('input')
    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    input.value = 'Hello from the form'
    domLogic.handleFormSubmit('user-form', 'dynamic-content')

    expect(container.textContent).toBe('Hello from the form')
    expect(errorMessage.textContent).toBe('')
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  test('handleFormSubmit shows an error message and keeps the error state visible for empty input', () => {
    const form = document.getElementById('user-form')
    const input = form.querySelector('input')
    const container = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')

    input.value = '   '
    domLogic.handleFormSubmit('user-form', 'dynamic-content')

    expect(container.textContent).toBe('')
    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
