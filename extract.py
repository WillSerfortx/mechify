import re

with open('/Users/mwashiurrahman/.gemini/antigravity-ide/brain/bb4320a3-5645-42da-9a5f-3cc21d125f6a/.system_generated/steps/121/output.txt', 'r') as f:
    lines = f.readlines()

start_idx = 0
end_idx = len(lines)

# Find where the code starts
for i, line in enumerate(lines):
    if line.startswith('const imgImage23'):
        start_idx = i
        break
        
# Find where the code ends (before SUPER CRITICAL text)
for i, line in enumerate(lines):
    if line.startswith('SUPER CRITICAL:'):
        end_idx = i
        break

code = "".join(lines[start_idx:end_idx])

# Replace image imports with placeholder logic if needed, or leave localhost:3845
# We can also rename Desktop to App for Vite
code = code.replace("export default function Desktop() {", "export default function App() {")

with open('src/App.jsx', 'w') as f:
    f.write(code)

print("Code extracted to src/App.jsx")
