# file-loader で出力される画像の出力先を、画像によって分けているサンプル

`src/images/background.jpg`は`public/images`に出力しています。

`src/images/icon.png`は`public/html-images`に出力しています。

今回のサンプルのやり方に関しては公式ドキュメントの以下に記載されています。

- https://v4.webpack.js.org/loaders/file-loader/#function-1
- https://v4.webpack.js.org/loaders/file-loader/#function-2

## 動作環境

- Node.js: v12.18.1
- npm: v6.14.5

## セットアップ

このディレクトリ上で以下のコマンドを実行してください。

```shell
npm ci
```

## 使い方

以下のコマンドを実行すれば、開発用のサーバーが起動します。

```shell
npm start
```

以下のコマンドを実行すれば、開発用の設定で webpack が実行され、バンドルされたファイルが出力されます。

```shell
npm run dev
```

以下のコマンドを実行すれば、本番用の設定で webpack が実行され、バンドルされたファイルが出力されます。

```shell
npm run build
```
