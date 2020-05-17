## freeones 0.0.1

by boi123212321

Scrape data from freeones.xxx
### Arguments

| Name      | Type          | Required | Description                                                                                                                  |
| --------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| dry       | Boolean       | false    | Whether to commit data changes                                                                                               |
| blacklist | Array&lt;String&gt; | false    | Array of data fields to omit (possible values: &#x27;height&#x27;, &#x27;avatar&#x27;, &#x27;bornOn&#x27;, &#x27;labels&#x27;, &#x27;hairColor&#x27;, &#x27;eyeColor&#x27;, &#x27;ethnicity&#x27;) |
### Example installation

```json
{
  "PLUGINS": {
    "freeones": {
      "path": "./plugins/freeones/main.js",
      "args": {}
    }
  }
}
```

```yaml
---
PLUGINS:
  "freeones":
    path: "./plugins/freeones/main.js"
    args: {}
```
