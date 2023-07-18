# Section1: Basics & Foundation

## 1. Component-Driven User Interface

### 1. 리액트 핵심 문법 & JSX

### 2. 컴포넌트 다루기

### 3. 데이터 다루기

---

<br>

- **리액트에서 컴포넌트가 핵심인 이유**

  1. 재사용성

     - 프로그래밍에서 반복을 피할 수 있다.

  2. 관심사의 분리

     - 작고 관리 가능한 단위로 유지할 수 있다.
     - 각 컴포넌트는 하나의 명확한 기능에 집중할 수 있다.

<br>

- **리액트의 핵심 컨셉**

  - 상태, 상황에 따라 요소들의 업데이트가 결정된다.
  - JavaScript처럼 직접적인 DOM 조작은 X.

<br>

- **리액트 프로젝트의 기본 구조**

  - 기본적으로 페이지가 로드되면 index.js 파일을 가장 먼저 불러온다.

  - 작은 기능적 단위로 쪼개서 만든 컴포넌트 구조로 인해 리액트 프로젝트에서는 수많은 컴포넌트가 존재한다.

<br>

- **리액트의 작동 방식**

  - JavaScript와 요소 추가 방식의 차이

    ```js
    // 자바스크립트 (명령형 코드)
    const para = document.createElement('p');
    para.textContent = 'blabla';
    document.getElementById('root').append(para);
    ```

    ```jsx
    // 리액트 (선언형 코드. 컴포넌트로 정의)
    function Para() {
      return <p>blabla</p>;
    }
    ```

<br>

- **`props.children`**

  - 사용자 정의 컴포넌트는 원칙적으로 Wrapper로 사용할 수 없는데 `props.children`을 사용하면 가능하다.

  - 모든 컴포넌트에서 `props.children`을 사용할 수 있다.

  - `props.children`은 여는 태그와 닫는 태그 사이의 내용을 포함한다.

    ```jsx
    // 1. 매개변수로 props 받은 후
    // 2. props.children 반환
    function Wrapper(props) {
      return <p>{props.children}</p>;
    }
    ```

<br>

- **`import React from 'react'`**

  - 과거에는 JSX를 사용하려면 매번 React를 import 했어야하지만 최신 리액트 스펙에서는 생략해도된다.

  - **import 된 React의 역할**

    - `return React.createElement()`  
       3개의 인자를 갖는다.

      1. 생성할 요소 (문자열)
      2. 요소를 설정하는 객체

         - 속성이 없다면 빈 객체 ({})

      3. 1번에서 생성할 요소 사이의 컨텐츠 (인자 개수제한 없음)

      ```jsx
      return (
        <div>
          <h2>Let's get started!</h2>
          <Expenses items={expenses} />
        </div>
      );

      // 위의 코드는 다음과 같다.
      return React.createElement(
        'div',
        {},
        React.createElement('h2', {}, "Let's get started!"),
        React.createElement(Expenses, { items: expenses })
      );
      ```

<br>

- **컴포넌트 구조 정리**

  - 모든 컴포넌트를 한 폴더에 넣는 것은 비효율적.

  - 같은 카테고리의 컴포넌트끼리 내부에 폴더를 만들어 정리

<br>

- **화살표 함수 컴포넌트**

  - 함수 선언형과 화살표 함수는 선택사항.

  - 함수 선언식과의 차이

---
