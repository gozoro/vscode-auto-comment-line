# Auto comment line



Visual Studio Code does not automatically insert single-line comments by default.
This extension automatically inserts a single line comment on the next line after only one line or after only two lines with a single line comment.

## Usage

By default, a comment is automatically inserted after one single line comment.

![Demo](https://raw.githubusercontent.com/gozoro/vscode-auto-comment-line/main/img/auto-comment-line.gif)

But you can use the `afterTwoLines: true` parameter to automatically insert a comment after only two single line comments.

![Demo](https://raw.githubusercontent.com/gozoro/vscode-auto-comment-line/main/img/auto-comment-line-after-two.gif)



### Default supported languages

| Comment name | Comment style | Language identifiers |
| ---- | ------- | ------- |
| doubleSlash | `//` | `php`, `go`, `javascript`, `typescript`, `jsonc`, `c`, `cpp`, `csharp`, `fsharp`, `groovy`, `java`,`less`, `objective-c`, `objective-cpp`, `rust`, `scss`, `sass`, `vue`, `swift`, `markdown`, `javascriptreact`, `typescriptreact` |
| tripleSlash | `///` | `csharp`  |
| hash | `#` | `bash`, `dockerfile`, `yaml`, `makefile`, `perl`, `powershell`, `python`, `r`, `ruby`, `coffeescript`  |
| semicolon | `;` |  `clojure` |
| doubleHyphen | `--` |  `sql` |



## Configuration

You can change default parameters in your settings.json.

You can change this parameter to automatically insert a comment after only two single line comments.

```json
// When enabled, a new comment line is inserted when two previous lines also contain a comment line.
"auto-comment-line.afterTwoLines": true,
```

You can change the default language list for each comment style.

```json
// List of languages where the comment character is a double slash: //
"auto-comment-line.doubleSlashLangs": ["php", "javascript"],

// List of languages where the comment character is a triple slash: ///
"auto-comment-line.tripleSlashLangs": ["csharp"],

// List of languages where the comment character is a hash: #
"auto-comment-line.hashLangs": ["bash"],

// List of languages where the comment character is a semicolon: ;
"auto-comment-line.semicolonLangs": ["clojure"],

// List of languages where the comment character is a double hyphen: --
"auto-comment-line.doubleHyphenLangs": ["sql"],

```



## Publishing an extension

You can use the official [instructions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) for publishing extensions

or

you can use a docker container which is created from the [Dockerfile](https://raw.githubusercontent.com/gozoro/vscode-auto-comment-line/main/Dockerfile) given here  to avoid installing `nodejs`, `npm`, `vsce` on your machine.

Build image:

```bash
docker build -t vsce .
```

Run container from image:

```bash
docker run -it vsce
```

Create package inside container:

```bash
vsce package
```

Logining into markerplace

```bash
vsce login <your_publisher>
```

Publishing extension

```bash
vsce publish
```


