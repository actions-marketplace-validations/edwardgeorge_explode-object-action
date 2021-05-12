# Explode Object Action

This action takes a JSON object as an input and sets an output names for each property with its associated value.

## Inputs

### `json`

**Required** A JSON object to be processed.

### `raw-strings`

If set to `true` then if the value is a string will be set directly as the output, otherwise will be JSON encoded (wrapped in quotes).

(default `true`) 

### `key`

If set to `true`, this key will be extracted first and the properties for output taken from this key's value.

## Example usage

```yaml
uses: edwardgeorge/explode-object-action@main
with:
  json: "{\"hello\": \"world\"}"
```
