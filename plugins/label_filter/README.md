## label_filter 0.0.1

by boi123212321

Filter labels returned by other plugins
### Arguments

| Name      | Type          | Required | Description       |
| --------- | ------------- | -------- | ----------------- |
| whitelist | Array&lt;String&gt; | false    | Labels to include |
| blacklist | Array&lt;String&gt; | false    | Labels to exclude |
### Example installation

```json
{
  "PLUGINS": {
    "label_filter": {
      "path": "./plugins/label_filter/main.js",
      "args": {}
    }
  }
}
```

```yaml
---
PLUGINS:
  "label_filter":
    path: "./plugins/label_filter/main.js"
    args: {}
```
