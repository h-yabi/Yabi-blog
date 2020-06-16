---
title: 【TypeScript】関数で型を使う方法
description: 関数で型を使う方法について備忘録として残しておきます。
date: 2020-06-16
mainImg: thumbnail/typescript.svg
categories: ['TypeScript']
---

TypeScriptで関数を定義する際に**気をつけるのは2点**で、**引数**と**戻り値**を指定するということ。


## functionキーワードによる関数定義

```typescript
function bmi(height: number, weight: number): number {
  return weight / (height * height);
}
```


## 無名関数による関数定義

```typescript
let bmi: (height: number, weight: number) => number = function (
  height: number,
    weight: number
): number {
  return weight / (height * height);
};
```
**bmiに対するアノテーションも指定**している。



## アロー関数（ラムダ式）による関数定義

```typescript
let bmi: (height: number, weight: number) => number = (
  height: number,
  weight: number
): number => weight / (height * height);
```
**bmiに対するアノテーションも指定**している。




## オプショナルなパラメータを定義
オプショナル**（省略可能）なパラメータ**を定義。

**引数の後に『?』クエスチョンマーク**を書くと、省略可能な値になる。

```typescript
let bmi: (height: number, weight: number, printable?: boolean) => number = (
  height: number,
  weight: number,
  printable?: boolean
): number => {
  const bmi: number = weight / (height * height);
  if (printable) {
    console.log({ bmi });
  }
  return bmi;
};

bmi(1.6, 58, true);
```
上記は、**printable?**が省略可能なパラメータとなっており、

```printable```に```true```を指定すればconsole.logが表示されるようになっている。





## デフォルトパラメータの設定

関数の引数に値が渡されない、もしくはundefinedが渡ってきた場合に、**関数側で初期値を与える**こと。

下記では、```rate: number = 1.1``` 部分が**デフォルトの値**になる。

```typescript
const nextYearSalary = (currentSalary: number, rate: number = 1.1) => {
  return currentSalary * rate;
}

console.log(nextYearSalary(1000));
console.log(nextYearSalary(1000, 1.5));
```

▼結果
```typescript
1100
1500
```





## Restパラメータを設定

Restパラメータとは、**不特定多数の引数を配列として受け取る構文**。

受け取る引数の数が決まってなくても、**受け取った数だけ配列に格納**してくれます。<br>
使い方は簡単で、関数の最後の名前付き引数に```...```の接頭辞を付けるだけ。

下記のサンプルだと、```...values```がそれに該当します。

```typescript
const reducer = (accumulator: number, currentValue: number) => {
  return accumulator + currentValue;
}

const sum: (...values: number[]) => number = (...values: number[]): number => {
  return values.reduce(reducer);
}

console.log(sum(1, 2, 3, 4, 5));
```

▼結果
```typescript
15
```




## オーバーロードをやってみよう

まずは用語について。

**オーバーロード**とは、関数を定義する時に、**同じ名前でありながら引数の型や戻り値の違う関数を定義すること**。

オーバーロードを使うには、**シグネチャーの宣言が必要**になります。

**シグネチャー**とは、**関数の処理の実態は書かず**に**関数の名前、引数そして戻り値の型のみを宣言したもの**。

関数の概略のようなもので、関数の実態の前に書く。便利な機能。

```typescript
// シグネチャー
function double(value: number): number;
function double(value: string): string;
```

型の制約はシグネチャーの方で行い、**実態の方↓ではany型を指定**する。<br>
anyで大丈夫なの？と思うかもしれないのですが、型制約は機能している。

```typescript
function double(value: any): any {
  if (typeof value === 'number') {
    return value * 2;
  } else {
    return value + value;
  }
}
console.log(double(100));
console.log(double('Go '));
```

▼結果
```typescript
200
Go Go
```




## 参考
<a href="https://www.udemy.com/course/ts-for-js-developers/" target="_blank">https://www.udemy.com/course/ts-for-js-developers/</a>
