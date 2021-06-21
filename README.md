# @prismicio/richtext

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Conventional Commits][conventional-commits-src]][conventional-commits-href]
[![License][license-src]][license-href]

A parser and serializer for [Prismic][prismic]'s Rich Text format.

- 🌳 Builds a generic tree from Rich Text
- 🧬 Serializes Rich Text into a different format (e.g. HTML or React components)
- ✂️ Strips formatting from Rich Text to extract raw text

You probably do not need to use this package directly. The following libraries provide a more accessible API:

- [`@prismicio/helpers`](https://github.com/prismicio/prismic-helpers): `asText`, `asHTML`
- [`@prismicio/react`](https://github.com/prismicio/prismic-reactjs): `<PrismicText>`, `<PrismicRichText>`
- [`@prismicio/vue`](https://github.com/prismicio/prismic-vue): `<prismic-rich-text>`

## Install

```bash
npm install @prismicio/richtext
```

## Documentation

To discover what's new on this package check out [the changelog][changelog]. For full documentation, visit the [official Prismic documentation][prismic-docs].

## Contributing

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of the Prismic developer community!

**Asking a question**: [Open a new topic][forum-question] on our community forum explaining what you want to achieve / your question. Our support team will get back to you shortly.

**Reporting a bug**: [Open an issue][repo-bug-report] explaining your application's setup and the bug you're encountering.

**Suggesting an improvement**: [Open an issue][repo-feature-request] explaining your improvement or feature so we can discuss and learn more.

**Submitting code changes**: For small fixes, feel free to [open a PR][repo-pull-requests] with a description of your changes. For large changes, please first [open an issue][repo-feature-request] so we can discuss if and how the changes should be implemented.

## License

```
   Copyright 2013-2021 Prismic <contact@prismic.io> (https://prismic.io)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

<!-- Links -->

[prismic]: https://prismic.io

<!-- TODO: Replace link with a more useful one if available -->

[prismic-docs]: https://prismic.io/docs
[changelog]: /CHANGELOG.md

<!-- TODO: Replace link with a more useful one if available -->

[forum-question]: https://community.prismic.io
[repo-bug-report]: https://github.com/prismicio/prismic-richtext/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[repo-feature-request]: https://github.com/prismicio/prismic-richtext/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[repo-pull-requests]: https://github.com/prismicio/prismic-richtext/pulls

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@prismicio/richtext/latest.svg
[npm-version-href]: https://npmjs.com/package/@prismicio/richtext
[npm-downloads-src]: https://img.shields.io/npm/dm/@prismicio/richtext.svg
[npm-downloads-href]: https://npmjs.com/package/@prismicio/richtext
[github-actions-ci-src]: https://github.com/prismicio/prismic-richtext/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/prismicio/prismic-richtext/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/prismicio/prismic-richtext.svg
[codecov-href]: https://codecov.io/gh/prismicio/prismic-richtext
[conventional-commits-src]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-href]: https://conventionalcommits.org
[license-src]: https://img.shields.io/npm/l/@prismicio/richtext.svg
[license-href]: https://npmjs.com/package/@prismicio/richtext
