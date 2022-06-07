## How to use the API Guide:

### /jobs
Use the job API like by sending a `POST` request with a body payload that looks like this:

```
{
	"id": "ef544bd0-d97c-412c-8f5c-f36c3cc598fb",
	"type": "SHIFT",
	"priceInPence": 10,
	"status": "AVAILABLE",
	"createdAt": "2022-06-06T22:22:28.626Z" 
}

```
Note: `createdAt` will be automatically generated if not provided.