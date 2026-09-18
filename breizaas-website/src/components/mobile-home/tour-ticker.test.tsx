import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TourTicker } from './tour-ticker'
import { skien, seljord } from './test-fixtures'

describe('TourTicker', () => {
  it('announces each upcoming concert once to screen readers', () => {
    render(<TourTicker events={[skien, seljord]} />)

    expect(screen.getByRole('link')).toHaveAccessibleName('Kommende konserter: 05.09 Skien, 10.10 Seljord')
  })

  it('opens the concert scene when pressed', () => {
    render(<TourTicker events={[skien]} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '#konserter')
  })

  it('shows date, city and a live mark for each concert', () => {
    render(<TourTicker events={[skien]} />)

    expect(screen.getAllByText('05.09 Skien').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Live').length).toBeGreaterThan(0)
  })

  it('hides the repeated scrolling text from assistive technology', () => {
    const { container } = render(<TourTicker events={[skien]} />)

    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('05.09 Skien')
  })

  it('keeps the line alive with the band slogan when there are no concerts', () => {
    render(<TourTicker events={[]} />)

    expect(screen.getByRole('link')).toHaveAccessibleName('Spell høgt, spell Breizaas')
    expect(screen.getAllByText('Spell høgt, spell Breizaas').length).toBeGreaterThan(0)
    expect(screen.queryByText('Live')).not.toBeInTheDocument()
  })
})
