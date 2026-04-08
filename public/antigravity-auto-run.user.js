// ==UserScript==
// @name         Antigravity Auto-Runner
// @namespace    https://antigravity.ai/
// @version      1.0
// @description  Auto-clicks the "Run" command button in Antigravity. Toggle with Ctrl+Shift+R.
// @author       SoberNation Dev
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  // ── State ──────────────────────────────────────────────────────────────────
  let active = false
  let observer = null
  let clickCount = 0

  // ── Indicator badge ────────────────────────────────────────────────────────
  const badge = document.createElement('div')
  badge.id = 'ag-auto-runner-badge'
  Object.assign(badge.style, {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    zIndex: '999999',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: '700',
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    transition: 'all 0.2s',
    letterSpacing: '0.04em',
  })
  badge.title = 'Antigravity Auto-Runner — Ctrl+Shift+R to toggle'
  badge.addEventListener('click', toggle)
  document.body.appendChild(badge)

  function updateBadge() {
    if (active) {
      badge.textContent = `⚡ AUTO-RUN ON  ×${clickCount}`
      badge.style.background = '#4ade80'
      badge.style.color = '#052e16'
    } else {
      badge.textContent = '⏸ AUTO-RUN OFF'
      badge.style.background = '#1e293b'
      badge.style.color = '#94a3b8'
    }
  }

  // ── Button finder ──────────────────────────────────────────────────────────
  function findAndClickRunButton() {
    const allButtons = document.querySelectorAll('button')
    for (const btn of allButtons) {
      const text = (btn.textContent ?? '').trim()
      if (
        (text.startsWith('Run') || text.includes('Run Alt') || text.includes('Run ')) &&
        !btn.disabled &&
        btn.offsetParent !== null
      ) {
        btn.click()
        clickCount++
        updateBadge()
        console.log(`[AutoRun] ⚡ Clicked Run #${clickCount}`, new Date().toLocaleTimeString())
        return true
      }
    }
    return false
  }

  // ── Observer ───────────────────────────────────────────────────────────────
  function startObserver() {
    findAndClickRunButton() // check immediately
    observer = new MutationObserver(() => {
      if (active) findAndClickRunButton()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null }
  }

  // ── Toggle ─────────────────────────────────────────────────────────────────
  function toggle() {
    active = !active
    if (active) {
      startObserver()
      console.log('%c[AutoRun] ⚡ Started', 'color:#4ade80;font-weight:bold')
    } else {
      stopObserver()
      console.log(`%c[AutoRun] ⏸ Paused (${clickCount} total clicks)`, 'color:#f87171')
    }
    updateBadge()
  }

  // ── Keyboard shortcut: Ctrl+Shift+R ───────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
      e.preventDefault()
      toggle()
    }
  })

  // ── Init ───────────────────────────────────────────────────────────────────
  updateBadge()
  console.log('%c[AutoRun] Loaded — Ctrl+Shift+R to toggle', 'color:#94a3b8')
})()
