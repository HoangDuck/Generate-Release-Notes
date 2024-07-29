# Generate release notes action

This action will generate a release notes via Github's REST APIs
The api I use in this actions [here](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28).

## Inputs

### `token`

**Required** The access token of your Github account.
### `tag`

**Required** The tag version you want to use for creating release notes.
### `owner`

**Required** The owner of the repository.
### `repo`

**Required** The name of the repository.

> [!NOTE]
> You have to give permission.contents.write to generate release notes successfully
##Example usage

```yaml
on:
  push:
    tags:
      - v1.*
name: Build and run custom action generate release notes
jobs:
  run-action:
    name: Run action generate release notes
    runs-on: [self-hosted, macOS] (Whatever host you want)
    permissions:
      contents: write
    steps:
      - uses: HoangDuck/Generate-Release-Notes@v1.5
        with:
          token: <Your Github's access token>
          tag: <Your tag name>
          owner: <The owner's name of the repository>
          repo: <The repository's name>
```
