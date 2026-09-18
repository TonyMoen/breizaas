import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarLink } from './calendar-link'
import { skien } from './test-fixtures'

/** jsdom's Blob has no text(), so read it the FileReader way */
function readBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsText(blob)
  })
}

describe('CalendarLink', () => {
  let downloads: { filename: string; href: string }[]

  beforeEach(() => {
    downloads = []
    // jsdom has no blob URLs or real downloads: record what the browser would have saved
    URL.createObjectURL = vi.fn(() => 'blob:breizaas')
    URL.revokeObjectURL = vi.fn()
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push({ filename: this.download, href: this.href })
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('downloads an .ics file named after the venue and date', () => {
    render(<CalendarLink event={skien} />)

    fireEvent.click(screen.getByRole('button', { name: 'Legg neste konsert i kalenderen' }))

    expect(downloads).toEqual([{ filename: 'breizaas-mariannes-2026-09-05.ics', href: 'blob:breizaas' }])
  })

  it('puts the concert in the calendar file', async () => {
    render(<CalendarLink event={skien} />)

    fireEvent.click(screen.getByRole('button', { name: 'Legg neste konsert i kalenderen' }))

    const blob = vi.mocked(URL.createObjectURL).mock.calls[0][0] as Blob
    expect(await readBlob(blob)).toContain('SUMMARY:Breizaas - Mariannes')
  })
})
