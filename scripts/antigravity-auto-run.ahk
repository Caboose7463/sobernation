; ============================================================
; Antigravity Auto-Runner
; Watches the Antigravity window for a "Run" button and clicks it
; 
; HOW TO USE:
;   1. Install AutoHotkey v2 from https://www.autohotkey.com/
;   2. Double-click this file to run it
;   3. Ctrl+Shift+R  →  toggle on/off
;   4. A tray icon shows status (right-click to exit)
;
; ============================================================

#Requires AutoHotkey v2.0
#SingleInstance Force

; ── Config ────────────────────────────────────────────────────────────────────
POLL_MS      := 800          ; how often to scan (milliseconds)
WIN_TITLE    := "Antigravity" ; partial window title to match
BTN_TEXT     := "Run"         ; button text to look for

; ── State ─────────────────────────────────────────────────────────────────────
global isActive := false
global clickCount := 0
global timerFn := ScanAndClick

; ── Tray setup ─────────────────────────────────────────────────────────────────
TraySetIcon(A_AhkPath, 2)
A_IconTip := "Antigravity Auto-Runner (OFF)"

; ── Keyboard shortcut: Ctrl+Shift+R ───────────────────────────────────────────
^+r:: ToggleRunner()

ToggleRunner() {
    global isActive, timerFn, POLL_MS, clickCount
    isActive := !isActive
    if isActive {
        SetTimer(timerFn, POLL_MS)
        TraySetIcon(A_AhkPath, 1)
        A_IconTip := "Antigravity Auto-Runner (ON) — Ctrl+Shift+R to stop"
        TrayTip("Auto-Runner ON", "Will auto-click Run buttons in Antigravity`nCtrl+Shift+R to stop", 2)
    } else {
        SetTimer(timerFn, 0)
        TraySetIcon(A_AhkPath, 2)
        A_IconTip := "Antigravity Auto-Runner (OFF)"
        TrayTip("Auto-Runner OFF", "Clicked " clickCount " button(s) this session", 2)
    }
}

ScanAndClick() {
    global WIN_TITLE, BTN_TEXT, clickCount

    ; Find the Antigravity window
    hwnd := WinExist("ahk_exe antigravity.exe")
    if !hwnd
        hwnd := WinExist(WIN_TITLE " ahk_class")
    if !hwnd
        hwnd := WinExist(WIN_TITLE)
    if !hwnd
        return  ; window not found, skip

    ; Try to find a button with "Run" text using UI Automation
    try {
        ; Use ControlGetHwnd to find button by text
        btnHwnd := ControlGetHwnd("Button1", "ahk_id " hwnd)
        loop {
            if !btnHwnd
                break
            txt := ControlGetText("ahk_id " btnHwnd)
            if InStr(txt, "Run") {
                ControlClick("ahk_id " btnHwnd)
                clickCount++
                TrayTip("Clicked Run #" clickCount, "", 1)
                return
            }
            break
        }
    }

    ; Fallback: enumerate all controls and find one containing "Run"
    try {
        controls := WinGetControls("ahk_id " hwnd)
        for ctrl in controls {
            try {
                txt := ControlGetText(ctrl, "ahk_id " hwnd)
                if InStr(txt, "Run") && !InStr(txt, "Running") {
                    ControlClick(ctrl, "ahk_id " hwnd)
                    clickCount++
                    UpdateTray()
                    return
                }
            }
        }
    }
}

UpdateTray() {
    global clickCount
    A_IconTip := "Antigravity Auto-Runner (ON) ×" clickCount
}
