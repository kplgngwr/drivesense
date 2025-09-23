# Logistics APP

## Access over local network (LAN)

This project is configured to bind the Next.js dev server to all interfaces so other devices on the same network can connect.

Steps:
- Start dev server: `npm run dev` (listens on `0.0.0.0:3000`)
- Find PC IP (Windows): run `ipconfig` in cmd; note your `IPv4 Address`, e.g. `192.168.1.50`.
- From another device on the same Wi‑Fi/SSID, open: `http://192.168.1.50:3000`
- If you run the UDP bridge (ESP32 → PC): ensure `main.js` is listening on `0.0.0.0:41234` (it does) and allow inbound UDP 41234 in Windows Firewall.

Windows Firewall (run as Administrator):
```
netsh advfirewall firewall add rule name="NextJS 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="UDP 41234" dir=in action=allow protocol=UDP localport=41234
```

Make sure your network profile is set to Private and any VPN is disabled for local access.
