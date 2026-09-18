import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SceneKonserter } from './scene-konserter'
import { makeEvent, skien, seljord } from './test-fixtures'

const pastEvents = [
  makeEvent({ datetime: '2026-06-20T21:00:00', venue: { name: 'Foynhagen', city: 'Tønsberg' } }),
  makeEvent({ datetime: '2026-05-16T21:00:00', venue: { name: 'Øvre Verket', city: 'Ulefoss' } }),
]

describe('SceneKonserter', () => {
  it('heads the list with the season and number of concerts', () => {
    render(<SceneKonserter events={[skien, seljord]} pastEvents={[]} />)

    expect(screen.getByText('Høsten 2026 · to fester')).toBeInTheDocument()
  })

  it('lists each concert with date, venue, city and weekday', () => {
    render(<SceneKonserter events={[skien]} pastEvents={[]} />)

    const row = screen.getByRole('link', { name: /Mariannes/ })
    expect(row).toHaveTextContent('5')
    expect(row).toHaveTextContent('sep')
    expect(row).toHaveTextContent('Skien · lørdag')
  })

  it('sends a concert with tickets to the ticket shop in a new tab', () => {
    render(<SceneKonserter events={[seljord]} pastEvents={[]} />)

    const row = screen.getByRole('link', { name: /Budeia/ })
    expect(row).toHaveAttribute('href', 'https://tickets.example/budeia')
    expect(row).toHaveAttribute('target', '_blank')
    expect(row).toHaveTextContent('Billettar')
  })

  it('sends a concert without tickets to its Bandsintown page', () => {
    render(<SceneKonserter events={[skien]} pastEvents={[]} />)

    const row = screen.getByRole('link', { name: /Mariannes/ })
    expect(row).toHaveAttribute('href', 'https://www.bandsintown.com/e/mariannes')
    expect(row).toHaveTextContent('Info')
  })

  it('links to the full concert page when the list is cut short', () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      makeEvent({ datetime: `2026-10-${String(i + 1).padStart(2, '0')}T21:00:00` })
    )
    render(<SceneKonserter events={many} pastEvents={[]} maxEvents={8} />)

    expect(screen.getAllByRole('link', { name: /Mariannes/ })).toHaveLength(8)
    expect(screen.getByRole('link', { name: 'Se alle 10 konserter' })).toHaveAttribute('href', '/konserter')
  })

  it('shows the towns the band has played, newest first', () => {
    render(<SceneKonserter events={[skien]} pastEvents={pastEvents} />)

    expect(screen.getByText(/Har spilt:/)).toHaveTextContent('Har spilt: Tønsberg · Ulefoss')
    expect(screen.getByRole('link', { name: 'Alle tidligere konserter' })).toHaveAttribute('href', '/konserter')
  })

  it('leaves out the played towns line when there is no history', () => {
    render(<SceneKonserter events={[skien]} pastEvents={[]} />)

    expect(screen.queryByText(/Har spilt:/)).not.toBeInTheDocument()
  })

  it('invites the audience to book the band', () => {
    render(<SceneKonserter events={[skien]} pastEvents={[]} />)

    expect(screen.getByRole('link', { name: 'Book bandet til din fest' })).toHaveAttribute('href', '/kontakt')
  })

  it('offers the next concert as a calendar download', () => {
    render(<SceneKonserter events={[skien, seljord]} pastEvents={[]} />)

    expect(screen.getByRole('button', { name: 'Legg neste konsert i kalenderen' })).toBeInTheDocument()
  })

  it('explains that no concerts are announced, and still offers booking', () => {
    render(<SceneKonserter events={[]} pastEvents={pastEvents} />)

    expect(screen.getByText('Ingen kommende konserter akkurat nå')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Book bandet til din fest' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Legg neste konsert i kalenderen' })).not.toBeInTheDocument()
  })
})
