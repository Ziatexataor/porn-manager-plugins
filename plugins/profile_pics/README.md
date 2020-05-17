## profile_pics 1.0.0

by boi123212321

Find actor images based on local files
### Arguments

| Name   | Type   | Required | Description                                                                         |
| ------ | ------ | -------- | ----------------------------------------------------------------------------------- |
| path   | String | true     | Folder to search images in                                                          |
| target | String | false    | Actor image to set (possible values: &#x27;thumbnail&#x27;, &#x27;altThumbnail&#x27;, &#x27;avatar&#x27;, &#x27;hero&#x27;) |
### Example installation

```json
{
  "PLUGINS": {
    "profile_pics": {
      "path": "./plugins/profile_pics/main.js",
      "args": {}
    }
  }
}
```

```yaml
---
PLUGINS:
  "profile_pics":
    path: "./plugins/profile_pics/main.js"
    args: {}
```
