import json

with open("offersample_V2.json", "r") as read_file:
    data = json.load(read_file)

#print(json.dumps(data))
print(data['pricingModel'])
