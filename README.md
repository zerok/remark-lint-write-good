# remark-lint-write-good

This rule for [remark-lint][] uses [write-good][] to check the content of a
Markdown file for stylistic issues:

```json
{
    "plugins": [
        "remark-preset-lint-recommended",
        ["remark-lint-write-good", ["warn", {
            "passive": false,
            "whitelist": [ "read-only" ]
        }]]
    ]
}
```

You can apply all the checks that are listed in the write-good documentation.
In this example, for instance, the passive-voice check is disabled and messages regarding the word "read-only" are suppressed.

[remark-lint]: https://github.com/wooorm/remark-lint
[write-good]: https://github.com/btford/write-good
