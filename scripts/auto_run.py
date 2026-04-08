import ctypes, time

user32 = ctypes.windll.user32
VK_SHIFT  = 0x10
VK_RETURN = 0x0D
KEYEVENTF_KEYUP = 0x0002

print("Running — pressing Shift+Enter every second. Ctrl+C to stop.")
while True:
    user32.keybd_event(VK_SHIFT, 0, 0, 0)
    user32.keybd_event(VK_RETURN, 0, 0, 0)
    user32.keybd_event(VK_RETURN, 0, KEYEVENTF_KEYUP, 0)
    user32.keybd_event(VK_SHIFT, 0, KEYEVENTF_KEYUP, 0)
    time.sleep(1)
