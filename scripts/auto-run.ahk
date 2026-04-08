; ============================================================
;  SoberNation Dev — Terminal Auto-Approver
;  Watches every 500ms for a pending "Run" button in the
;  Antigravity / Cursor window, then sends Alt+Enter.
;
;  HOW TO USE:
;    1. Install AutoHotkey v1 from https://www.autohotkey.com
;    2. Double-click this file — it runs silently in the tray
;    3. Right-click tray icon → Exit to stop
;
;  PAUSE / RESUME:  Press Ctrl+F12 to toggle on/off
; ============================================================

#NoEnv
#SingleInstance Force
SetWorkingDir %A_ScriptDir%

global Enabled := true

; Toggle with Ctrl+F12
^F12::
  Enabled := !Enabled
  TrayTip, Auto-Runner, % Enabled ? "Enabled ✓" : "Paused ✗", 1
return

; Check every 500ms
SetTimer, TryApprove, 500

TryApprove:
  if (!Enabled)
    return

  ; Only fire when Cursor / Antigravity window is active
  WinGetActiveTitle, activeTitle
  if (!InStr(activeTitle, "Cursor") && !InStr(activeTitle, "Antigravity") && !InStr(activeTitle, "sobernation"))
    return

  ; Look for the blue Run button by searching for its pixel colour
  ; The button is a distinctive blue: #1E6FD9 / RGB(30,111,217)
  PixelSearch, px, py, 0, 0, A_ScreenWidth, A_ScreenHeight, 0x1E6FD9, 5, Fast RGB
  if (!ErrorLevel) {
    ; Found the button — click it
    Click, %px%, %py%
  }
return
