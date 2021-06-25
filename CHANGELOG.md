# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0-alpha.1](https://github.com/prismicio/prismic-richtext/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2021-06-25)


### Bug Fixes

* fixed exposed types ([25ea4a0](https://github.com/prismicio/prismic-richtext/commit/25ea4a04fe0d63238432fbfc29cf36c7590cda0f))
* type definition for spans ([1bd7907](https://github.com/prismicio/prismic-richtext/commit/1bd79079a9898ce4b6b45cb6f81fdcf9ca862d6b))

## [2.0.0-alpha.0](https://github.com/prismicio/prismic-richtext/compare/v1.0.3...v2.0.0-alpha.0) (2021-06-25)


### Features

* expose RichTextMapSerializerFunction ([fde2340](https://github.com/prismicio/prismic-richtext/commit/fde2340b01605185cd83c307cd97ec7285dde81d))
* first draft ([fd39ec6](https://github.com/prismicio/prismic-richtext/commit/fd39ec62058e55fb04a6878a64664c5cd3b2ae9a))
* initial v2 commit ([b6f3de5](https://github.com/prismicio/prismic-richtext/commit/b6f3de59996a6113a23d5cf261e61fad03c84073))
* object serializer option ([f8824ca](https://github.com/prismicio/prismic-richtext/commit/f8824ca6dbf7267208d6249aa6eec5a376e789b4))


### Bug Fixes

* prevent mutating richtext tree upon parsing ([0674af8](https://github.com/prismicio/prismic-richtext/commit/0674af8906a8566a23d60d2a11464979b2a50824))
* rename toTree to asTree for API compat ([4530872](https://github.com/prismicio/prismic-richtext/commit/4530872998d5677594614e8b15c65c570b6d1348))
* restore compat with Element export ([1e57b97](https://github.com/prismicio/prismic-richtext/commit/1e57b97fa02cae8b8458c5bfb66e128b1d8c8045))
* **tree:** null check in spans map ([3013810](https://github.com/prismicio/prismic-richtext/commit/30138102d62333c6cc82a83da4605163a2ecb9b4))


### Documentation

* add tsdocs for exposed utilities ([9a4a2d1](https://github.com/prismicio/prismic-richtext/commit/9a4a2d1dab404162834f22bcfe3739de0f9c06c2))
* update README ([6dd0864](https://github.com/prismicio/prismic-richtext/commit/6dd08643d6a4b49af9ab9286fdee0987b50e0d03))


### Chore

* add benchmark ([57f4d0e](https://github.com/prismicio/prismic-richtext/commit/57f4d0ea15b970faffb7fbd0c60c8cb82a1ae44e))
* add benchmark package.json script ([ab61226](https://github.com/prismicio/prismic-richtext/commit/ab61226a08f210363c2d6cca335aa80cc820491c))
* add benchmark results ([5cbaafa](https://github.com/prismicio/prismic-richtext/commit/5cbaafa64c2883aa0bfee3f3c97f9342dcd000c4))
* update dependencies ([af86d9f](https://github.com/prismicio/prismic-richtext/commit/af86d9fefe5ae2b855b7ae79ea144d15a234b780))
* **deps:** maintain dependencies ([c9f27b3](https://github.com/prismicio/prismic-richtext/commit/c9f27b3e0574c6919d6cd01d7e25bc298a7bc9e6))
* add package-lock.json to benchmark ([640c31c](https://github.com/prismicio/prismic-richtext/commit/640c31c5b4c74d9805a039c6cdebaa31cd68fd1a))
* clean up benchmark ([68b9fd6](https://github.com/prismicio/prismic-richtext/commit/68b9fd6cd603629b3ffcf554a349e39ea6d372da))
* fix new type definitions ([48b21b0](https://github.com/prismicio/prismic-richtext/commit/48b21b0654ecbe728a1de9558d5086fa33085055))
* ignore nyc_output formatting ([c81bc3c](https://github.com/prismicio/prismic-richtext/commit/c81bc3caf32413036abe0e2b40828dee3c7a4506))
* remove spec ([9d60f00](https://github.com/prismicio/prismic-richtext/commit/9d60f006714fe3ac03ef0bef02fcb7ed22804408))
* update package description ([78383d0](https://github.com/prismicio/prismic-richtext/commit/78383d03cbcecd97756e22fb21482b6debdd0562))
* update package.json ([83c26d1](https://github.com/prismicio/prismic-richtext/commit/83c26d1210b99b5920a464096e2758c2dcd6a083))
* update package.json dependency versions ([e288c57](https://github.com/prismicio/prismic-richtext/commit/e288c57f1efa775709354cf3283cf16d2ae4cae4))
* version package.lock ([b6d6850](https://github.com/prismicio/prismic-richtext/commit/b6d68509569e488b94ded2186dd2b6b0544cd9b7))


### Refactor

* coerce types rather than [@ts-expect-error](https://github.com/ts-expect-error) ([c423b5b](https://github.com/prismicio/prismic-richtext/commit/c423b5b8c62bd4abdd513c5ffe3f9df8c3133365))
* extract helpers into their own files ([0c24e6b](https://github.com/prismicio/prismic-richtext/commit/0c24e6b8eec94fe8c29e52f5c915addda579588a))
* extract types to @prismicio/types ([f5084a8](https://github.com/prismicio/prismic-richtext/commit/f5084a8423433096e01844489a0394f384a0412e))
* provide per field typing ([a568f33](https://github.com/prismicio/prismic-richtext/commit/a568f33243f3151b7c34afc2694f86421ca18b7b))
* remove unnecessary function abstraction ([132cf3b](https://github.com/prismicio/prismic-richtext/commit/132cf3bc70ce163e9ccb11bd908415719643a9c2))
* size and speed optimizations ([b5ce079](https://github.com/prismicio/prismic-richtext/commit/b5ce079e199c555969dc4ac679c5e2e61604c4d3))
* size optimization ([0c4af61](https://github.com/prismicio/prismic-richtext/commit/0c4af614e4045c9cba8a28d3ef10baf6160e6738))
* use user-facing type names ([24ddf02](https://github.com/prismicio/prismic-richtext/commit/24ddf02a9ac2da13e3a142fb2d5e80521a7fcc33))
* wrapMapSerialzier & composeSerializers functions ([b95f65b](https://github.com/prismicio/prismic-richtext/commit/b95f65b50027d649c2833110a26cead1b67d14af))
