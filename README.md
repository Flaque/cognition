# Cognition

A cool hackathon project.

Run with:

```sh
yarn dev
```

## Interacting

### Track Calls

These are calls that you can send your user behavior to. The
only thing they record is the timestamp (for usage) and the
anonymous user ID.

```
curl --request POST \
  --url http://localhost:3000/api/track \
  --header 'content-type: application/json' \
  --data '{
    "messageId": "test-message-1kehp",
    "timestamp": "2019-03-23T20:50:22.449Z",
    "type": "track",
    "userId": "test-user-eo0zokd"
}'
```

### Usage Reports

This lets you get the usage of an individual user to dynamically
adapt your tool to reduce burnout.

```
curl --request GET \
  --url http://localhost:3000/api/usage/test-user-eo0zokd
```

Response:

```
{
  "usage": {
    "userId": "test-user-eo0zokd",
    "totalTime": 30
  },
  "budget": 20
}
```

### All Usage Reports

This gives you the usage reports of everyone.

```
curl --request GET \
  --url http://localhost:3000/api/usages
```

Response:

```
{
  "usages": [
    {
      "userId": "test-user-eo0zokd",
      "totalTime": "0"
    }
  ],
  "budget": 0
}
```
