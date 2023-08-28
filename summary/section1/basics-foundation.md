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

<br>

## 2. User Interaction & State

### 1. 리액트의 이벤트 핸들링

### 2. State 다루기 & UI 업데이트

### 3. 컴포넌트 & State 더 자세히 살펴보기

### 4. 리스트 컨텐츠의 동적/조건부 렌더링

---

<br>

- **이벤트 핸들러 및 props 네이밍**

  1. 기본 네이밍

     - function: `handleEvent`의 형식
     - props: `onEvent`의 형식

     ```jsx
     function Example() {
       const handleClick = () => {...};

       return <button onClick={handleClick} />;
     }
     ```

  2. 상위/하위 컴포넌트 관계에서

     - function: `handleTargetEvent`의 형식
     - props: `onTargetEvent`의 형식

     ```jsx
     function Parent() {
       const handleCountChange = () => {...};

       return (
         <Child onCountChange={handleCountChange} />
       )
     }

     function Child({ onCountChange }) {
       const handleButtonClick = (event) => {
         onCountChange(event.target.value);
       };

       return <button onClick={handleButtonClick}>Click</button>
     }
     ```

<br>

- **한 컴포넌트에서 여러 상태를 관리할 때의 방식**

  2가지 방법 모두 괜찮다.

  1. 여러개의 `useState()`로 각 상태마다 독립적으로 관리
  2. 한번의 `useState()`로 객체 형태로 한번에 관리

<br>

- **이전 상태에 의존하는 상태 업데이트**

  상태값을 객체 형태로 전달하는 등의 `이전 상태값에 의존해 업데이트되는 함수를 정의`할 때 2가지 방식이 있다.

  - 1번처럼 직접 상태값에 접근하면 오래되거나 잘못된 이전 상태값을 가져올 수 있으므로 비추천.
  - 2번처럼 매개변수로 이전 상태값을 가져와 사용하면 가장 최신의 상태값을 보장하기때문에 안전하고 권장한다.

  > 리액트에서 상태 업데이트는 곧바로 되지않고 자체 스케줄에 의해 실행되므로,  
  > 동시에 많은 상태 업데이트가 계획되었다면  
  > 오래되거나 잘못된 상태값을 가져와 업데이트할 수 있기 때문.

  ```jsx
  const [data, setData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const handleChange = (event) => {
    // 1. BAD - 직접 상태값에 접근
    setData({
      ...data,
      age: event.target.value,
    });

    // 2. GOOD - 이전 상태값을 매개변수로 받아옴
    setData((prevState) => {
      return { ...prevState, age: event.target.value };
    });
  };
  ```

<br>

- **Stateful 컴포넌트 vs Stateless 컴포넌트**

  더 좋고 나쁘고가 아닌 용어일뿐이며, 대부분의 리액트 앱에서 Dumb 컴포넌트를 더 많이 갖게될 것이다.

  1. **Stateful 컴포넌트**  
     **상태값을 가지고 있는** 컴포넌트.  
     `Smart` 컴포넌트라고도 불린다.
  2. **Stateless 컴포넌트**  
     **상태값이 없는** 화면을 출력하는데 초점을 둔 컴포넌트.  
     `Dumb` 컴포넌트, `Presentational` 컴포넌트라고도 불린다.

<br>

- **Key**

  - 리스트에서 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
  - 리스트의 각 항목들마다 고유하게 식별할 수 있는 문자열을 사용하는 것이 가장 좋은데, 대부분의 경우 데이터의 ID를 사용한다.

    > 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 사용할 수 있지만 권장하지 않는다.

  - **Key 사용 이유**  
    리액트는 기본적으로 기존 트리와의 차이점을 찾아 렌더링하게 되는데,  
    **리스트의 맨 앞**에 요소를 추가할 경우
    1. `key가 없다면`  
       추가 후 다른 형제 요소들까지 다시 렌더링하게돼서 비효율적이다.
    2. `key가 있다면`  
       추가 후 다른 요소들은 위치에 맞게 이동만 시킨다.

---

<br>

## 3. Styling Components

### 1. 조건부 & 동적 스타일

### 2. Styled Components

### 3. CSS Modules

---

<br>

- **CSS Modules**

  - 리액트에서 css 파일로 스타일 적용 시 전역으로 적용되기때문에  
    실수로 특정 클래스명이 중복으로 사용될 수 있는데,  
    컴포넌트마다 따로 css 파일을 작성해서 이를 방지할 수 있다.

  - CRA에 기본으로 내장.

  - 사용법

    ```jsx
    // 1. css 파일명 뒤에 .module.css를 붙인다.
    // ex) Button.module.css

    // 2. import
    import styles from './Button.module.css'; // 이런식으로 import해야 한다.

    // 3. 컴포넌트에 css 모듈 class 적용
    // styles는 객체의 형태로 해당 파일의 모든 클래스명을 갖는다.
    // ex) 1. className={styles.button}
    //     2. className={styles['button']}
    const Button = () => {
      return <button className={styles.button}>CSS 모듈 예제</button>;
    };

    // 4. 개발자 도구에서는 요소의 클래스명이 "컴포넌트명_클래스명__고유한 해시값" 으로 나타나고,
    // style 태그 내부에도 새로 만들어진 클래스명으로 나타난다.
    ```

---

<br>

## 4. Debugging React Apps

### 1. 에러 메시지의 이해

### 2. 리액트 앱 디버깅 & 분석

### 3. DevTools

---
