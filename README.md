# remark-lint-heading-length

This rule for [remark-lint][] uses [write-good][] to check the content of a
Markdown file for stystic issues:

```
{
    "plugins": [
        "remark-preset-lint-recommended",
        ["remark-lint-write-good", ["warn", {
            "passive": false
        ]]
    ]
}
```

You can apply all the checks that are listed in the write-good documentation.

[remark-lint]: https://github.com/wooorm/remark-lint
[write-good]: https://github.com/btford/write-good