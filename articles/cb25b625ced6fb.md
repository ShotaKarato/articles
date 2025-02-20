---
title: "ViteアプリのPWA化"
emoji: "🌊"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["PWA", "Vite", "React", "JavaScript", "Browser"]
published: false
---

# これは何

## そもそも PWA って

ご存知の方も多いかもしれませんが、そもそも PWA って何なのという部分にさらっと触れておきます！

- PWA は Progressive Web Application の略称
- Web サイト・アプリケーションをネイティブアプリのように使えるようにする仕組み
- Service Worker、Web App Manifest といった技術を利用して、次のような機能が Web サイト・アプリケーションでも使えるようになります
  - ✅ アプリのインストール（アプリのようにホーム画面に追加できる）
  - ✅ オフライン対応 （ネットがなくても offline cache を利用して動作させることができる）
  - ✅ ネイティブアプリに近い UI の提供
  - ✅ プッシュ通知対応

## PWA 化のための技術的要件

そんないいことづくめの PWA ですが、ブラウザから Web アプリを PWA としてインストールするためにはいくつかの技術的な要件を満たしてる必要があります。

### Web App Manifest

JSON 形式の manifest ファイルで、インストールされたアプリがデバイスの中でのどのような見た目になるか、挙動をするかといった情報をブラウザに伝える役割を担っています。

[設定可能なプロパティ](https://developer.mozilla.org/en-US/docs/Web/Manifest)は色々ありますが、Chromium をベースにしたブラウザでは PWA 化のために以下の項目の設定が必須となっています。

- `name`: インストールしたデバイス上で表示するアプリの名前
- `icons`: インストールしたデバイス上で表示するアプリアイコン。192x192, 512x512 はマストで用意する必要があります
- `start_url`: インストールしたアプリをユーザーが起動した際に表示するページ URL
- `display`: インストールしたアプリがどのような見た目になるかの設定。`standalone`が一番一般的なネイティブアプリに近い見た目の表示になり、ブラウザ固有のナビゲーションバーとかが消える。`minimal-ui`: はナビゲーションバーなどに必要最低限の要素を配置するレイアウト
- `prefer_related_applications`: PWA ではないネイティブのアプリが存在し、そちらのダウンロードを推奨するかどうか

### HTTPS / localhost

PWA を有効にするには、ページが HTTPS、もしくは localhost で提供される必要があります。これは Man in the Middle Attack（中間者攻撃）を回避するためのセキュリティ的な懸念からこのような仕様となっているようです。

### Service Worker

⚠️ PWA では offline cache などの利用を可能にする Service Worker を使用するケースが多いですが、Service Worker を利用すること自体は PWA として Web アプリをインストールできるようにする技術要件には含まれていません。

## Vite アプリを PWA 化する方法

それでは今回の本題でもある、Vite アプリを PWA 化する方法について見ていこうと思います！
