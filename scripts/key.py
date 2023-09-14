import json

with open ('traduction-jeunes.json', 'r') as f:
    data = json.load(f)

with open ('listeMots.txt', 'w') as text:
    for cle in data.keys():
        text.write(f"{cle} ")