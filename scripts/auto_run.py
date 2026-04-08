import ctypes, time

user32 = ctypes.windll.user32
VK_MENU   = 0x12  # Alt
VK_RETURN = 0x0D  # Enter
KEYEVENTF_KEYUP = 0x0002

print("Pressing Alt+Enter every second. Ctrl+C to stop.")
while True:
    user32.keybd_event(VK_MENU, 0, 0, 0)
    user32.keybd_event(VK_RETURN, 0, 0, 0)
    user32.keybd_event(VK_RETURN, 0, KEYEVENTF_KEYUP, 0)
    user32.keybd_event(VK_MENU, 0, KEYEVENTF_KEYUP, 0)
    time.sleep(1)
