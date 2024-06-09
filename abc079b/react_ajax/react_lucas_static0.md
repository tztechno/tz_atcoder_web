以下の手順でReactをインストールし、Helloページを表示して、static HTMLをルーティングするように改造する方法を示します。

### 1. ReactのインストールとHelloページの表示

#### Step 1: プロジェクトの作成
```sh
npx create-react-app my-app
cd my-app
```

#### Step 2: プロジェクトの起動
```sh
npm start
```

この時点でブラウザを開いて `http://localhost:3000` にアクセスすると、Reactのデフォルトのスタートページが表示されます。

#### Step 3: Helloページの作成
1. `src` フォルダ内の `App.js` ファイルを編集します。

```jsx
// src/App.js

import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
}

export default App;
```

2. 保存してブラウザをリロードすると、`Hello, React!` が表示されるはずです。

### 2. Static HTMLをルーティングするように改造

#### Step 4: React Routerのインストール
```sh
npm install react-router-dom
```

#### Step 5: ルーティングの設定
1. `src` フォルダ内に新しいコンポーネントを作成します。
   - `Home.js`
   - `About.js`

```jsx
// src/Home.js

import React from 'react';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
```

```jsx
// src/About.js

import React from 'react';

function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}

export default About;
```

2. `App.js` を編集してルーティングを追加します。

```jsx
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
```

#### Step 6: ナビゲーションリンクの追加 (オプション)
1. ナビゲーションリンクを追加して各ページに簡単に移動できるようにします。

```jsx
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

これで、`http://localhost:3000` にアクセスするとHomeページが表示され、`http://localhost:3000/about` にアクセスするとAboutページが表示されるはずです。また、ナビゲーションリンクを使ってページ間を移動することもできます。

### まとめ
1. Reactプロジェクトを作成し、Helloページを表示する。
2. React Routerを使って静的なHTMLページをルーティングするように設定する。
3. 必要に応じてナビゲーションリンクを追加して、ページ間の移動を簡単にする。

この手順に従うことで、Reactアプリケーションで複数の静的ページをルーティングする基本的なセットアップが完了します。
