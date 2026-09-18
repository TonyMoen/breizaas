import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedSingleBanner } from './featured-single-banner'
import { Hero } from './hero'
import { liggi } from './mobile-home/test-fixtures'

const backgroundImage = {
  asset: { _type: 'reference', _ref: 'image-bg123-1920x1080-jpg' },
  alt: 'Breizaas på scenen',
}

describe('FeaturedSingleBanner', () => {
  it('keeps phones from downloading the large images when it is shown on desktop only', () => {
    render(<FeaturedSingleBanner single={liggi} backgroundImage={backgroundImage} desktopOnly />)

    expect(screen.getByAltText('Singlecover for Liggi')).toHaveAttribute('sizes', '(max-width: 1023px) 1px, 448px')
    expect(screen.getByAltText('Breizaas på scenen')).toHaveAttribute('sizes', '(max-width: 1023px) 1px, 100vw')
  })

  it('serves full-size images on every screen by default', () => {
    render(<FeaturedSingleBanner single={liggi} backgroundImage={backgroundImage} />)

    expect(screen.getByAltText('Singlecover for Liggi')).not.toHaveAttribute('sizes')
    expect(screen.getByAltText('Breizaas på scenen')).toHaveAttribute('sizes', '100vw')
  })
})

describe('Hero', () => {
  it('keeps phones from downloading the background when it is shown on desktop only', () => {
    render(<Hero brandName="BREIZAAS" backgroundImage={backgroundImage} desktopOnly />)

    expect(screen.getByAltText('Breizaas på scenen')).toHaveAttribute('sizes', '(max-width: 1023px) 1px, 100vw')
  })
})
