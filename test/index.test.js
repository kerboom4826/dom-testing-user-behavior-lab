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

  test('addElementToDOM updates the target container', () => {
    domLogic.addElementToDOM('dynamic-content', '<p>Added</p>')

    expect(document.getElementById('dynamic-content').innerHTML).toContain('<p>Added</p>')
  })

  test('removeElementFromDOM removes the target element', () => {
    const removable = document.createElement('div')
    removable.id = 'remove-me'
    document.body.appendChild(removable)

    domLogic.removeElementFromDOM('remove-me')

    expect(document.getElementById('remove-me')).toBeNull()
  })

  test('simulateClick updates the DOM correctly', () => {
    domLogic.simulateClick('dynamic-content', 'Button Clicked!')

    expect(document.getElementById('dynamic-content').textContent).toBe('Button Clicked!')
  })

  test('handleFormSubmit updates the DOM with valid input', () => {
    const form = document.getElementById('user-form')
    const input = form.querySelector('input')
    const errorMessage = document.getElementById('error-message')

    input.value = 'Hello from the form'
    domLogic.handleFormSubmit('user-form', 'dynamic-content')

    expect(document.getElementById('dynamic-content').textContent).toBe('Hello from the form')
    expect(errorMessage.textContent).toBe('')
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  test('handleFormSubmit shows an error for empty input', () => {
    const form = document.getElementById('user-form')
    const input = form.querySelector('input')
    const errorMessage = document.getElementById('error-message')

    input.value = '   '
    domLogic.handleFormSubmit('user-form', 'dynamic-content')

    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
