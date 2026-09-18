import { describe, it, expect } from 'vitest';
import {
  slugify,
  songSlug,
  findSingleBySlug,
  isUpcoming,
  services,
  songSummary,
  youtubeId,
  artistNames,
} from './songs';
import type { Single } from '@/types/Single.types';

const single = (overrides: Partial<Single>): Single => ({
  _id: 'id',
  title: 'Liggi',
  releaseDate: '2025-09-26',
  coverImage: { alt: 'Cover' } as Single['coverImage'],
  ...overrides,
});

describe('slugify', () => {
  it('handles Norwegian letters and punctuation', () => {
    expect(slugify('Øl og Sigarett')).toBe('ol-og-sigarett');
    expect(slugify('Håkken e du?')).toBe('hakken-e-du');
    expect(slugify("Tossan's partyhits")).toBe('tossans-partyhits');
    expect(slugify('Turné')).toBe('turne');
    expect(slugify('Kjekt å være meg')).toBe('kjekt-a-vaere-meg');
    expect(slugify('RO')).toBe('ro');
  });
});

describe('songSlug', () => {
  it('prefers the slug stored in Sanity', () => {
    expect(songSlug({ title: 'Liggi', slug: { current: 'liggi-2025' } })).toBe('liggi-2025');
  });

  it('falls back to the title', () => {
    expect(songSlug({ title: 'Gamle minner', slug: null })).toBe('gamle-minner');
  });

  it('never returns a route the site owns', () => {
    expect(songSlug({ title: 'Musikk' })).toBe('musikk-sang');
  });
});

describe('findSingleBySlug', () => {
  it('finds a single by its computed slug', () => {
    const singles = [single({ _id: 'a', title: 'Casanova' }), single({ _id: 'b', title: 'Onkel Skrue' })];
    expect(findSingleBySlug(singles, 'onkel-skrue')?._id).toBe('b');
    expect(findSingleBySlug(singles, 'finnes-ikke')).toBeUndefined();
  });
});

describe('isUpcoming', () => {
  it('is true only before the release date', () => {
    expect(isUpcoming({ releaseDate: '2026-10-01' }, '2026-09-30')).toBe(true);
    expect(isUpcoming({ releaseDate: '2026-10-01' }, '2026-10-01')).toBe(false);
  });
});

describe('youtubeId', () => {
  it('reads the id from the link formats in use', () => {
    expect(youtubeId('https://www.youtube.com/watch?v=bgPz5gpigwg')).toBe('bgPz5gpigwg');
    expect(youtubeId('https://music.youtube.com/watch?v=abc123DEF_-&list=x')).toBe('abc123DEF_-');
    expect(youtubeId('https://youtu.be/5RKw6rMlKwg?si=x')).toBe('5RKw6rMlKwg');
    expect(youtubeId('https://example.com/')).toBeNull();
    expect(youtubeId(undefined)).toBeNull();
  });
});

describe('services', () => {
  it('lists only services with a link, Spotify first, and derives YouTube Music', () => {
    const list = services(
      single({
        spotifyUrl: 'https://open.spotify.com/track/1',
        youtubeUrl: 'https://music.youtube.com/watch?v=abc123DEF_-',
        deezerUrl: 'https://www.deezer.com/track/1',
      })
    );
    expect(list.map((service) => service.key)).toEqual(['spotify', 'youtube', 'youtubeMusic', 'deezer']);
    expect(list[1].url).toBe('https://www.youtube.com/watch?v=abc123DEF_-');
    expect(list[2].url).toBe('https://music.youtube.com/watch?v=abc123DEF_-');
  });

  it('is empty for a single without links', () => {
    expect(services(single({}))).toEqual([]);
  });
});

describe('artistNames and songSummary', () => {
  it('uses Breizaas alone unless collaborators are named', () => {
    expect(artistNames({ artistLine: null })).toEqual(['Breizaas']);
    expect(artistNames({ artistLine: 'Breizaas, Tommen' })).toEqual(['Breizaas', 'Tommen']);
  });

  it('prefers the description and never contains a dash', () => {
    expect(songSummary(single({ description: ' Egen tekst. ' }))).toBe('Egen tekst.');
    const summary = songSummary(single({ artistLine: 'Breizaas, Tommen' }));
    expect(summary).toBe('«Liggi» er en singel fra Breizaas og Tommen, utgitt 2025.');
    expect(summary).not.toMatch(/[–—]/);
  });
});
