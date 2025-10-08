import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should apply primary variant styles by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByText('Primary Button')
    expect(button.className).toContain('bg-blue-600')
  })

  it('should apply secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByText('Secondary Button')
    expect(button.className).toContain('bg-gray-200')
  })

  it('should apply outline variant styles', () => {
    render(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByText('Outline Button')
    expect(button.className).toContain('border')
  })

  it('should apply size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small').className).toContain('px-3')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByText('Medium').className).toContain('px-4')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large').className).toContain('px-6')
  })

  it('should handle onClick event', async () => {
    let clicked = false
    const handleClick = () => { clicked = true }

    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByText('Click me')

    await userEvent.click(button)
    expect(clicked).toBe(true)
  })

  it('should be disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByText('Disabled Button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })
})