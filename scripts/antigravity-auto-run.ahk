; ============================================================
; Antigravity Auto-Runner  (fixed version)
; Automatically clicks the "Run" button in Antigravity/Cursor
;
; HOW TO USE:
;   1. Install AutoHotkey v2 from https://www.autohotkey.com/
;   2. Double-click this file — it starts immediately (ON by default)
;   3. Ctrl+Shift+R  →  toggle on/off
;   4. Right-click the tray icon → Exit to quit
;
; ============================================================

#Requires AutoHotkey v2.0
#SingleInstance Force

POLL_MS   := 600
global isActive  := true   ; starts ON immediately
global clickCount := 0
global timerFn   := ScanAndClick

; ── Tray ──────────────────────────────────────────────────────
TraySetIcon(A_AhkPath, 1)
A_IconTip := "Auto-Runner ON — Ctrl+Shift+R to pause"
TrayTip("Auto-Runner ON", "Will auto-click Run in Antigravity/Cursor`nCtrl+Shift+R to pause", 2)

; Start scanning immediately
SetTimer(timerFn, POLL_MS)

; ── Toggle hotkey: Ctrl+Shift+R ───────────────────────────────
^+r:: ToggleRunner()

ToggleRunner() {
    global isActive, timerFn, POLL_MS, clickCount
    isActive := !isActive
    if isActive {
        SetTimer(timerFn, POLL_MS)
        TraySetIcon(A_AhkPath, 1)
        A_IconTip := "Auto-Runner ON — Ctrl+Shift+R to pause"
        TrayTip("Auto-Runner ON", "", 1)
    } else {
        SetTimer(timerFn, 0)
        TraySetIcon(A_AhkPath, 2)
        A_IconTip := "Auto-Runner PAUSED — Ctrl+Shift+R to resume"
        TrayTip("Auto-Runner PAUSED", "Clicked " clickCount " buttons this session", 2)
    }
}

ScanAndClick() {
    global clickCount

    ; ── 1. Try to find the window ──────────────────────────────
    hwnd := 0
    for title in ["Antigravity", "Cursor", "sobernation"] {
        hwnd := WinExist(title)
        if hwnd
            break
    }
    if !hwnd
        return

    ; ── 2. Try UI Automation: enumerate controls for "Run" text ─
    try {
        controls := WinGetControls("ahk_id " hwnd)
        for ctrl in controls {
            try {
                txt := ControlGetText(ctrl, "ahk_id " hwnd)
                if InStr(txt, "Run") && !InStr(txt, "Running") && !InStr(txt, "npm") {
                    ControlClick(ctrl, "ahk_id " hwnd)
                    clickCount++
                    A_IconTip := "Auto-Runner ON ×" clickCount
                    return
                }
            }
        }
    }

    ; ── 3. Fallback: look for the blue Run button by pixel colour
    ; The button is a vivid blue — search visible screen area
    try {
        CoordMode("Pixel", "Screen")
        ; Try multiple shades of the blue button
        for col in [0x2563EB, 0x1D4ED8, 0x1E6FD9, 0x3B82F6] {
            if PixelSearch(&px, &py, 0, 0, A_ScreenWidth, A_ScreenHeight, col, 8) {
                Click(px, py)
                clickCount++
                A_IconTip := "Auto-Runner ON ×" clickCount
                return
            }
        }
    }

    ; ── 4. Last resort: send Alt+Enter to the window ─────────
    try {
        WinActivate("ahk_id " hwnd)
        Send("!{Enter}")
    }
}
