# ============================================================
#  SoberNation Dev — Terminal Auto-Approver (PowerShell)
#  No AutoHotkey needed. Runs as a background loop.
#
#  HOW TO USE:
#    Open a NEW PowerShell window and run:
#    powershell -ExecutionPolicy Bypass -File .\scripts\auto-run.ps1
#
#  Press Ctrl+C in that window to stop it.
# ============================================================

Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinApi {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

function Get-ActiveWindowTitle {
    $handle = [WinApi]::GetForegroundWindow()
    $sb = New-Object System.Text.StringBuilder 256
    [WinApi]::GetWindowText($handle, $sb, 256) | Out-Null
    return $sb.ToString()
}

$enabled = $true
Write-Host "Auto-Runner started. Press Ctrl+C to stop." -ForegroundColor Green
Write-Host "Will auto-press Alt+Enter when Cursor/Antigravity is active." -ForegroundColor Cyan

while ($true) {
    Start-Sleep -Milliseconds 800

    $title = Get-ActiveWindowTitle
    $isCursor = $title -match "Cursor|Antigravity|sobernation"

    if ($isCursor) {
        # Send Alt+Enter — the shortcut for the Run button
        [System.Windows.Forms.SendKeys]::SendWait("%{ENTER}")
    }
}
