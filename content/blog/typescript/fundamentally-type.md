---
title: 【TypeScript】基本的な型の一覧
description: TypeScriptの基本的な型について備忘録として残しておきます。
date: 2020-06-16
mainImg: thumbnail/typescript.svg
categories: ['TypeScript']
---

<!-- ## プリミティブ型
プリミティブ型とは、そのデータ型の定義の中に他の型を含まないような型のこと。

『**これ以上分解できない型**』として覚えて良さそう。 -->


## boolean型
真偽値、```true```もしくは、```false```。
```typescript
let isFinished: boolean = true;
```

```: boolean```の部分は、型注釈（型アノテーション）と言います。


## number型
数値型。
```typescript
let year: number = 2020;
```

**16進数**の数値を扱うこともできる。
```typescript
let age: number = 0x2b;
console.log(age);
```
▼結果
```typescript
43
```


## string型
文字列型。

```typescript
let name: string = 'Taro';
```


## array型
配列型。

```typescript
let numbers: number[] = [1, 2, 3];
let strings: string[] = ['TypeScript', 'Javascript', 'React'];
```
**非推奨**ではあるようだが、次のような書き方もできる↓

```typescript
let numbers2: Array<number> = [1, 2, 3];
let strings2: Array<string> = ['Tokyo', 'Osaka', 'Kyoto'];
```

**二次元配列（配列の中に配列がある）**については、下記のように指定します。
```typescript
// 二次元配列
let hairetsu: number[][] = [
  [50, 100],
  [150, 300]
];
```

**バラバラの型を持つ配列**の場合は、下記のように指定もできます。
```typescript
// バラバラの型を持つ配列
let hairetsu2: (string | number | boolean)[] = [1, false, 'Japan'];
```


## tuple型
複数の構成要素からなる組を総称する一般概念。 

tuple型でアノテーションを行うことで、**型の順序性にも制約**を持たせることができる。<br>
tuple型は型推論が表示されないので、しっかり書けるようにする。

```typescript
let profile: [string, number] = ['Taro', 32];
```


## any型
型が不定な変数を扱うときに使用する。<br>
例えば、javascriptで書かれたコードをTypeScriptへリプレイスする際に**暫定的にanyを使用する**ことなどが想定される。

**型の指定が今すぐにはできない、という場合を除いては極力使用しない**ようにする。



## void型

**何もデータが存在しない時に指定**する。

**関数には必ずしもreturnがあるわけではないので、そういう場合にvoidを使用**する例もある。

```typescript
function returnNothinng(): void {
  console.log("I don't return anything!");
}
```



## null型、undefined型
null型、undefined型を**ピンポイントで示す場合に利用**できる型。

単体で使用することはない。

```typescript
let absence: null = null;
let data: undefined = undefined;
```


## never型
**例外を起こす関数にneverを使用**するが、実際には利用シーンはなさそうで言語仕様だと理解するのが良いとのこと。

```typescript
function error(message: string): never {
  throw new Error(message); // 人為的にエラーを発生させている
}

try {
  let result = error('test');
  console.log({ result });
} catch (error) {
  console.log({ error });
}
```

void型とnever型の違いは、**void型はreturnされる値がないことを表すが呼び元には返ってくる。**<br>
一方、**never型は戻ってこない**ことを意味する。

次の例を見ると違いが分かるのだが、void型にはundefinedが含まれるが、never型には値という概念がないのでエラーが発生（赤線部分）する。

<img src="/images/articles/fundamentally-type/01.png"><br>

最初に定義したerror関数ははnever型を返すので、**唯一never型に代入**できる↓

```typescript
let bar: never = error('only me!');
```


## object型
オブジェクトに使用する型。

### 例１） object
```typescript
let profile1: object = { name: 'Taro' };
```
上記のように、**アノテーションにobjectと付けることで使用できる**が、<br>
これだと**オブジェクト内で型が違うプロパティを再代入してもエラーにならない**ので制約が甘い↓

```typescript
profile1 = { brithYear: 2020};
```

これだととても開発では使えそうにない。

```typescript
let profile1: object = { name: 'Taro' };
profile1 = { birthYear: 2020 };
```


### 例２） {}
```typescript
let profile2: {
  name: string
} = { name: 'Taro' };
```

このように指定すると、プロパティnameの値はstringと宣言されているので、下記のように**birthYearを再代入するとエラー（赤線部分）**となります。

nameという属性を持つオブジェクトを代入するしかない。

<img src="/images/articles/fundamentally-type/02.png"><br>




## 型エイリアス（Type Aliases）
**型に対してエイリアスを設定**することができる機能。

簡単な例として、string型に対して**Mojiretsuというエイリアス**を設定したサンプルをみてみましょう。

```typescript
type Mojiretsu = string;

const fooString: string = 'Hello';
const fooMojiretsu: Mojiretsu = 'Hello';
```
```type```というキーワードを書いて、続けてエイリアス名 = string（型）を指定することで使用できる。

アノテーションに```string```と、```Mojiretsu```を指定しているが、これはどちらも文字列を型として宣言していることで一緒になる。

ただ、これだとメリットが分かりづいらいので、次の例をみてみましょう。

```typescript
type Profile = {
  name: string;
  age: number;
}

const example1: Profile = {
  name: 'Tato',
  age: 30
}
```
また、別の方法として次のような書き方もある。

```typescript
const example2 = {
  name: 'Tato',
  age: 30
}

type Profile2 = typeof example2;
```
```typeof```を使用して、**example2の型を調べてProfile2の型として設定**している。

```Profile2```にカーソルを合わせると、下記のようにProfile2の型が表示される。

<img src="/images/articles/fundamentally-type/03.png"><br>

このやり方だと、example2の構造が変更された時でも追従されるので**間違いが発生しづらい。**




## interface
型エイリアス（Type Aliases）以外で、オブジェクト型に名前をつける方法。

型エイリアスと違い、イコール（=）は不要。

```typescript
interface ObjectInterface {
  name: string;
  age: number;
}

let object: ObjectInterface = {
  name: 'Taro',
  age: 32
};
```




## unkown型

**あまり利用することはない**らしい。

any型を使っているとコンパイルエラーにはならないものの、実行時にエラーが出てしまうことがある。

なるべくnumber、string型など具体的な型を指定するのが望ましいが、どんな型が入るかわからない時に、一旦フワッと型を指定しておきたい、という時に使用する。

その際は、typeofで型ガードを使って型を絞っていきながら安全なコードを書いていく。

**typeofキーワードを使いながら型を調べて、その型に相応しい処理を実行してくアプローチ**。

下記のようにすることで実行時エラーを極力回避しながら実装することができる。

```typescript
const kansu = (): number => 43;

let numberAny: any = kansu();
let numberUnknown: unknown = kansu();

let sumAny = numberAny + 10;
let sumUnknown = numberUnknown + 10;

if (typeof numberUnknown === 'number') {
  let sumUnknown = numberUnknown + 10;
}
```


## 交差型（intersection型）
**既存の方を再利用しつつ新たな型を作成**できる便利な機能、メンテナンス性の向上に役立つ。

**複数の型を『&』で連結**することで簡単に型を作ることができる。

```typescript
type Pitcher1 = {
  throwingSpeed: number;
};

type Batter1 = {
  battingAverage: number;
};

// intersection型
type TwoWayPlayer = Pitcher1 & Batter1;

const Otani: TwoWayPlayer = {
  throwingSpeed: 160,
  battingAverage: 0.4
}
```


## 共用体型（union型）
**TypeScriptを使用する際に多くの場面で利用**するらしい。

複数の型（例えば、numberとstring）の使用を許容することができる。

**パイプ（ | ）**で繋げることで使用できる。

```typescript
let value: number | string = 1;
value = 'foo';
```
上記の場合、**number**または、**string**の代入が可能となる。


共用型は、型の順序性を持たせることができない。





## Literal型

**プリミティブ型よりも細かい指定ができる型**。

文字列・数値・真偽知のリテラル型がある。

### 例）曜日のリテラル型
```typescript
let dayOfTheWeek: '日' | '月' | '火' | '水' | '木' | '金' | '土' = '日';
dayOfTheWeek = '月';
```
**『日〜土』以外のstringが指定されたらエラー**になります。


### 例）数値のリテラル型
```typescript
let month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 1;
month = 12
```
**『1〜12』以外のnumberが指定されたらエラー**になります。





## 列挙型（enum型）
数値や文字列を列挙する時に便利な型。

自動的に**連番を付与したいシーンに利用**するのが良い。

```typescript
enum Months {
  January,
  February,
  March,
  April,
  May,
  Jun,
  July,
  August,
  September,
  October,
  November,
  December
}
```

1月から12月までをenumを使って列挙しましたが、下記のようにアクセスすることができます。

```typescript
console.log(Months.January);
console.log(Months.February);
```
結果は、0, 1 が表示されます。

素のjavascriptで書くよりも簡潔に書くことができます。

**January=0**、**February=1**となってるので、**1から数字をスタートしたい時**は、下記のようにオーバーライドすることで解決できます。

```typescript
enum Months {
  January = 1,
  February,
  March,
  〜
}
```
**January = 1**とするだけ、簡単で便利ですね。

数値の列挙を表示しましたが、**文字列の列挙**もみていきましょう。

```typescript
enum COLORS {
  RED = '#FF0000',
  WHITE = '#FFFFFF',
  GREEN = '#008000',
  BLUE = '#0000FF',
  BLACK = '#000000'
};

let green = COLORS.GREEN;
console.log({ green });
```

▼結果
```typescript
{ green: '#008000' }
```

**新たに色を追加したい場合**は、
```typescript
enum COLORS {
  YELLOW = '#FFFF00'
};
```
のように、後からCOLORSに追加することができる。

## 参考：
<a href="https://www.udemy.com/course/ts-for-js-developers/" target="_blank">https://www.udemy.com/course/ts-for-js-developers/</a>
