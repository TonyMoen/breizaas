'use client'

import { useEffect, useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react'

export interface SceneTab {
  /** Also the URL hash that opens the scene, e.g. "konserter" for /#konserter */
  id: string
  label: string
  content: ReactNode
}

interface SceneTabsProps {
  tabs: SceneTab[]
  /** Accessible name for the tab list */
  ariaLabel: string
  /** Rendered above the tabs inside the sticky bar (the concert line) */
  stickyHeader?: ReactNode
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash
const getServerHash = () => ''

/**
 * Tab selector for the mobile front page: press a tab and the scene changes in place.
 *
 * The active scene lives in the URL hash, so /#konserter can be shared and any
 * in-page link to a scene (the concert line, "Neste konsert") switches tab.
 * Every scene stays in the DOM; the inactive ones are only hidden.
 */
export function SceneTabs({ tabs, ariaLabel, stickyHeader }: SceneTabsProps) {
  const hashId = useSyncExternalStore(subscribeToHash, getHash, getServerHash).slice(1)
  const activeId = tabs.some((tab) => tab.id === hashId) ? hashId : tabs[0].id
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // A scene opened from further down the page should start from its top
  const previousId = useRef(activeId)
  useEffect(() => {
    if (previousId.current === activeId) return
    previousId.current = activeId
    if (window.scrollY > 0) window.scrollTo({ top: 0 })
  }, [activeId])

  const showScene = (id: string) => {
    // replaceState keeps the back button leaving the page instead of stepping through tabs
    window.history.replaceState(null, '', `#${id}`)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = tabs.length - 1
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = index === lastIndex ? 0 : index + 1
        break
      case 'ArrowLeft':
        nextIndex = index === 0 ? lastIndex : index - 1
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = lastIndex
        break
      default:
        return
    }
    event.preventDefault()
    const nextId = tabs[nextIndex].id
    showScene(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <div>
      {/* Sits right under the mobile navigation bar: its h-14 row plus the 1px border */}
      <div className="sticky top-[57px] z-40 bg-brown-dark pb-2.5">
        {stickyHeader}
        {/* The line above runs edge to edge; tabs and scenes keep a phone-wide column on tablets */}
        <div
          role="tablist"
          aria-label={ariaLabel}
          className="mx-[18px] mt-2.5 flex max-w-[524px] rounded-full border border-purple-playful/30 bg-cream-base/[0.07] p-1 sm:mx-auto"
        >
          {tabs.map((tab, index) => {
            const isSelected = tab.id === activeId
            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[tab.id] = element
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`scene-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => showScene(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`flex-1 rounded-full py-[9px] text-center font-inter text-[13px] font-bold transition-colors ${
                  isSelected ? 'bg-purple-playful text-brown-dark' : 'text-cream-base'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`scene-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="mx-auto max-w-[560px]"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
