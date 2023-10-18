# Part2: Advanced Concepts

## 1. Fragments, Portals & Refs

### 1. JSX 제한사항들 & Fragments

### 2. Portals

### 3. Refs

---

<br>

- **JSX의 제한사항**

  1. 최상위 반환하는 요소는 1개여야 한다.

     - JSX는 다음과 같이 `React.createElement` 코드로 변경되는데 여러 요소가 나란히 반환될 수 없기때문

       ```jsx
       return (
        <h2>Title</h2>
        <p>Hello, World!</p>
       );

       return (
        React.createElement('h2', {}, 'Title');
        React.createElement('p', {}, 'Hello, World!');
       );
       ```

     - 해결 방법 중 1가지인 `<div>` 태그로 감싸는 방법은 `<div> Soup`의 문제가 있다.

       ```html
       <!-- 불필요한 div들이 실제 DOM에 렌더링됨 -->
       <div>
         <div>
           <div>
             <div>
               <h2>Title</h2>
             </div>
           </div>
         </div>
       </div>
       ```

     - 이를 해결하기 위한 방법으로 `<Wrapper>` 컴포넌트가 있다.

       1. Wrapper.js 컴포넌트 생성
       2. 기존의 `<div>` 태그로 감싸던 것을 `<Wrapper>` 로 감싸기
       3. 잘 작동하며 실제 DOM에 렌더링 X

       ```js
       // Wrapper.js
       function Wrapper(props) {
         return props.children;
       }
       ```

       그러나 이 컴포넌트는 직접 만들 필요가 없고 React에서 제공해준다.

       - `<>...</>`
       - `<React.Fragment>...</React.Fragment>`

       둘의 차이는 없지만,  
       `<React.Fragment>`는 key props을 가질 수 있다.

       ```jsx
       // 아래 두 방법 모두 빈 Wrapper를 렌더링해준다.
       // 실제 DOM에는 렌더링 X
       function Component(props) {
         return (
           <>
             <h2>Title</h2>
             <p>Hello, World!</p>
           </>
         );
       }

       function Component(props) {
         return (
           <React.Fragment>
             <h2>Title</h2>
             <p>Hello, World!</p>
           </React.Fragment>
         );
       }
       ```

<br>

- **Portals**  
  렌더링 된 HTML 내용을 다른 곳으로 옮길 수 있게 해준다.  
  Portals을 사용하면 아래와 같은 경우를 해결할 수 있다.

  - **예시) 모달**

    > 모달뿐만 아니라 각종 오버레이, 사이드 드로워의 경우도 해당.

    - 모달은 시맨틱하게 요소 맨 위에 존재해야한다.
    - 그렇기때문에 아래의 예제는 기능적으로는 동작할지라도 좋지않은 코드
    - 버튼을 만들 때, div를 스타일링하고 이벤트 리스너를 추가하는 것과 비슷하다. (작동은 하지만, 좋지 않은 아이디어)

    ```jsx
    // Wrapper.jsx
    return (
      <>
        <section>
          <h2>Title ...</h2>
          <MyModal />
          <MyInputForm />
        </section>
      </>
    );
    ```

    ```html
    <!-- Real DOM -->

    <!-- BAD -->
    <section>
      <h2>Title ...</h2>

      <!-- MyModal.jsx -->
      <!-- 중첩된 HTML 요소 내부에 모달이 존재 -->
      <div class="my-modal">
        <h2>A Modal Title!</h2>
      </div>
      <!-- MyModal.jsx -->

      <form>
        <label>Username</label>
        <input type="text" />
      </form>
    </section>
    ;

    <!-- GOOD -->
    <!-- 
      Portals 사용.
      Wrapper.jsx 컴포넌트의 구조는 그대로지만,
      실제 DOM에는 다른 곳에 렌더링됨.
    -->
    <!-- MyModal.jsx -->
    <div class="my-modal">
      <h2>A Modal Title!</h2>
    </div>
    <!-- MyModal.jsx -->

    <section>
      <h2>Title ...</h2>
      <form>
        <label>Username</label>
        <input type="text" />
      </form>
    </section>
    ;
    ```

  - **사용법**

    - `ReactDOM.createPortal(arg1, arg2)`

      - arg1: 렌더링 대상 노드 (JSX로 작성)
      - arg2: 렌더링 될 컨테이너 포인터 (DOM API 활용)

      ```jsx
      import ReactDOM from 'react-dom';

      return (
        <>
          //
          {ReactDOM.createPortal(
            <Backdrop onClick={props.onError} />,
            document.getElementById('backdrop-root')
          )}
        </>
      );
      ```

<br>

- **ref**  
  참조를 뜻한다. (reference)  
  리액트의 매우 강력한 기능으로 기본적으로 다른 DOM 요소에 접근해서 그것들로 작업할 수 있게 해준다.

  - 사용법

    1. useRef를 활용해 ref를 만든다.
       `const myRef = useRef();`
    2. 만든 ref를 원하는 요소의 props로 전달해 연결한다.
       `<input type="text" ref={myRef} />`
    3. 해당 ref 변수의 값은 항상 객체인 current prop을 가진다.
       > current prop은 연결된 실제 DOM 노드를 가진다.

  - 일반적으로 React에서는 DOM을 조작하면 안되지만,  
    사용자가 입력한 값을 재설정하려는 경우에는 해도 된다.

    > ex) input value submit 후 초기화

  - 이외에도 다양한 기능이 있다. (코스 진행하며 후술)

  - **제어 컴포넌트 vs 비제어 컴포넌트**

    1. 제어 컴포넌트: React에 의해 값이 제어되는 컴포넌트
       > ex) state
    2. 비제어 컴포넌트: React에 의해 값이 제어되지 않는 컴포넌트
       > ex) ref

    - 가장 큰 차이점은 동기화이며,  
      일반적으로는 form 작성 시 제어 컴포넌트로 작성하되,  
       단순히 값만 읽어내기 위함과 같은 매우 단순한 기능이라면 ref를 사용한다던지 상황에 맞게 사용하자.

      > 제어 컴포넌트는 실시간 동기화

    - 사용 예시
      | 특징 | 비제어 | 제어 |
      | :----------------------------: | :----: | :--: |
      | 일회성 값 검색 (ex: 제출 시) | O | O |
      | 제출 시 유효성 검사 | O | O |
      | 실시간 필드 유효성 검사 | X | O |
      | 조건부 제출 버튼 비활성화 | X | O |
      | 입력 형식 제한 | X | O |
      | 하나의 데이터에 대한 여러 입력 | X | O |
      | 동적 입력 | X | O |

---

## 2. Effects, Reducers & Context

### 1. Working with (Side) Effects

### 2. 더 복잡한 상태 관리 with Reducers

### 3. 앱, 컴포넌트 수준에서의 상태 관리 with Context

---

<br>

- **Effect (= Side Effect)**  
  리액트의 메인 기능인 UI 렌더, Event & Input, 상태 관리 등을 제외한 나머지 모든 것들을 뜻한다.

  > ex) 브라우저 Storage에 Data 저장, Http 요청, 타이머 등

  - 상태에 따라 컴포넌트가 리렌더 되는 리액트 특성상  
    컴포넌트 내에 사이드 이펙트 코드들을 작성하면 에러 및 무한루프를 유발할 수 있다.

- **`useEffect(arg1, arg2)`**  
   컴포넌트가 리렌더되어도 의존성 배열의 값을 감지해 변할 때만 함수가 실행되도록 하는 Hooks.

  > 컴포넌트 코드들이 실행된 후에 useEffect의 코드가 실행된다.

  - `arg1`: 실행 할 함수
  - `arg2`: 의존성 배열

    - 해당 값이 업데이트 될 때마다 함수가 실행됨.
    - 빈 배열로 두면 컴포넌트가 처음 렌더링 될 때만 실행됨.

  - `return`: clean-up 함수  
    컴포넌트가 언마운트 될 때마다 실행된다. (필요 할 경우 사용)
    1. 빈 배열의 경우: 컴포넌트가 제거 될 때
    2. 의존성 배열 값이 있을 경우: 값이 업데이트되어 이펙트가 실행되기 전에

- **`useReducer()`**  
  `useState`처럼 state 관리를 도와주는 Hooks로,  
  더 많은 기능이 있고, 더 복잡한 state에 유용하다.

  - 그러나 더 강력하다고 해서 항상 더 좋다고 할 수는 없고,  
    대부분의 경우에는 `useState`를 사용하되, 필요한 경우에 사용하자.

    > 사용하기 조금 더 복잡해 설정이 필요하다.

  - useState를 대체하는 예시

    1. 함께 묶이는 state
       > ex) 입력된 값 state, 그 값의 유효성 검사 state
    2. 다른 state 의존해 state를 업데이트하는 경우
       > 이 경우에는 useReducer 말고도  
       > 하나의 state로 병합하는 것도 방법.

    ```jsx
    // useReducer
    /*
      1. state: 상태 스냅샷
      2. dispatchFn: 상태를 업데이트 할 수 있는 함수
        - 액션을 디스패치.
    */
    const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
    ```

- **useEffect 최적화**

  - 불필요한 이펙트 발생하는 경우 그것을 막을 수 있다.

    > ex) 유효성 검사, 의존성 배열에 props이 있는 경우

  - 유효성 검사를 예시로 불필요한 이펙트 막기.

    - 입력 값으로 유효성 검사 이펙트를 구현하면  
      이미 검사를 통과한 상태여도 값이 바뀔 때마다 useEffect가 계속 실행되는데,  
       유효성 변수 (ex. isValid) 를 의존성 배열에 넣고 사용하면 값만 변경되고, 유효성은 변경되지 않으면 재실행되지 않는다.

    ```jsx
    // BAD - state에 의존해서 이미 만족했더라도 재실행됨.
    useEffect(() => {
      const timer = setTimeout(() => {
        console.log('Checking for validity');
        setFormIsValid(emailState.isValid && passwordState.isValid);
      }, 500);

      return () => {
        console.log('CLEANUP!');
        clearTimeout(timer);
      };
    }, [emailState, passwordState]);

    // GOOD - 만족한 후 값을 입력해도 재실행 안됨.
    useEffect(() => {
      const timer = setTimeout(() => {
        console.log('Checking for validity');
        setFormIsValid(emailIsValid && passwordIsValid);
      }, 500);

      return () => {
        console.log('CLEANUP!');
        clearTimeout(timer);
      };
    }, [emailIsValid, passwordIsValid]);
    ```

<br>

- **`useState()` vs `useReducer()`**

  - useState

    - 메인 state 관리 툴
    - 개별 state 및 데이터를 다루기에 적합
    - state 업데이트가 쉽고, 몇 종류 안되는 경우에 적합

  - useReducer
    - state와 업데이트 로직이 복잡할 경우
    - 연관된 여러 state들도 관련 데이터를 다루는 경우
      > ex) Form Input

<br>

- **Context API**

  - 리액트 내부적으로 state 관리를 도와주는 기능.
  - prop drilling (= prop chains)없이 필요한 컴포넌트로 state를 직접 전달할 수 있게 해준다.

  - 사용법

    1. 프로젝트 src 내부에 디렉터리 및 파일 생성

       > 디렉터리명 일반적으로 store 사용

    2. 컨텍스트 생성 및 초기값 설정

       - Context 네이밍을 CamelCase로 한 이유?

         > 그 자체는 컴포넌트가 아니지만  
         > 컴포넌트를 담을 객체기 때문

       - 기본값이 있으면 Provider는 필요없다.

       ```js
       import React from 'react';

       const AuthContext = React.createContext({
         isLoggedIn: false,
       });

       export default AuthContext;
       ```

    3. 컨텍스트 사용 할 컴포넌트 감싸기

       감싼 컴포넌트의 모든 자손 컴포넌트들도 해당 컨텍스트에 접근할 수 있다.

       ```jsx
       const [isLoggedIn, setIsLoggedIn] = useState(false);

       return (
         <AuthContext.Provider
           value={{
             // 하드코딩
             isLoggedIn: false,
           }}
         >
           <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
           <main>
             {!isLoggedIn && <Login onLogin={loginHandler} />}
             {isLoggedIn && <Home onLogout={logoutHandler} />}
           </main>
         </AuthContext.Provider>
       );
       ```

       Provider의 value에 사용 할 state 넣어두면 포함된 자손 컴포넌트들은 props로 전달해주지 않아도 감지해 사용할 수 있다.

       ```jsx
       const [isLoggedIn, setIsLoggedIn] = useState(false);

       return (
         <AuthContext.Provider
           value={{
             // Provider로 state 제공
             isLoggedIn: isLoggedIn,
           }}
         >
           // isLoggedIn state props 제거
           <MainHeader onLogout={logoutHandler} />
           <main>
             {!isLoggedIn && <Login onLogin={loginHandler} />}
             {isLoggedIn && <Home onLogout={logoutHandler} />}
           </main>
         </AuthContext.Provider>
       );
       ```

    4. 컨텍스트에 접근
       Consumer, Hooks를 통한 2가지 접근 방법이 있는데,  
       일반적으로 Hooks를 사용한다.

       1. Context.Consumer

          ```jsx
          const Navigation = (props) => {
            return (
              // 감싸기
              <Context.Consumer>
                // ctx를 인자로 갖는 함수
                {(ctx) => {
                  // 내부에 기존 JSX 코드 반환
                  return (
                    <div>
                      <h2>{ctx.isLoggedIn}</h2>
                    </div>
                  );
                }}
              </Context.Consumer>
            );
          };
          ```

       2. useContext Hook  
          Consumer보다 더 깔끔하고 사용하기 편하다.

          ```jsx
          import React, { useContext } from 'react';

          const Navigation = (props) => {
            const ctx = useContext(AuthContext); // Hook 사용

            // 내부에 기존 JSX 코드 반환
            return (
              <div>
                <h2>{ctx.isLoggedIn}</h2>
              </div>
            );
          };
          ```

<br>

- **`props` vs `Context`**  
  항상 prop chains을 사용해도 괜찮지만,  
  컨텍스트를 사용하면 때에 따라 코드가 간결해지고 편해진다.

  - 대부분의 경우에는 props을 사용하여 컴포넌트에 데이터를 전달

    > props는 컴포넌트를 구성하고,  
    > 재사용할 수 있도록 하는 메커니즘이기 때문.

    ```jsx
    // Button.jsx
    // 아래의 버튼 컴포넌트를 예시로
    // props가 아닌 컨텍스트로 작성하면 클릭할 때마다 로그아웃만 할 수 있어 재사용이 불가능해진다.
    const Button = (props) => {
      return (
        <button type={props.type || 'button'} onClick={props.onClick}>
          {props.children}
        </button>
      );
    };
    ```

  - 많은 컴포넌트를 거쳐 전달할 것이 있거나 (props chain),  
    매우 특정적인 일을 하는 컴포넌트의 경우에는 컨텍스트를 사용하는 것이 좋다.

  - 사용하다보면 어디에 어떻게 사용할지 감이 올 것

<br>

- **컨텍스트의 한계**

  1. 변경이 잦은 경우 컨텍스트는 적합하지 않다.

     > ex) 1초마다 바뀌는 state 등등..

     - 이런 경우에 props은 적합하지 않은데 어떻게?
       > 리덕스 등의 상태 관리 툴 사용

  2. 모든 컴포넌트 커뮤니케이션들, props를 대체하기 위해 사용하면 안된다.

     - props는 컴포넌트 구성에 있어서 필수적이고 중요하다.

     - prop chain을 해소하기 위해서라면 OK

<br  >

- **Hooks 규칙**  
  리액트 훅은 단순히 use로 시작하는 모든 함수이다.

  ![rules-of-hooks](./Rules%20of%20Hooks.png)

  1. 리액트 훅은 리액트 함수에서만 호출해야 한다.

     - 리액트 컴포넌트 함수
     - Custom Hooks

  2. 리액트 훅은 리액트 컴포넌트 함수, 커스텀 훅 함수의 최상위 수준에서만 호출해야 한다.

     - 중첩 함수에서 호출 X
     - block문에서의 호출 X
       > ex) if문 내부 등..

  여기까지가 공식적인 규칙이며, 따로 한가지를 더 추가하자면

  3. useEffect 관련 추가 규칙
     - 특별한 이유가 없다면  
       항상 참조하는 모든 항목을 의존성 배열에 추가해야 한다.
       > useState의 set 함수는 변경되지 않도록 보장되기 때문에 생략해도된다.

<br>

- **Forward Refs**

  로그인 Form에서 유효성 검사를 통과하지 못한 Input에 포커스를 주기 위해 사용할 수 있다.

  - `useImperativeHandle`  
    Form의 Input들에 대해서 제출 시 입력되지 않은 Input을 찾아 포커스를 주고 싶은 경우에 쓰이는 훅.

    > 자주 쓰이는 훅은 아니다.  
    > 그러나 이 경우에는 꽤 좋은 해결방법이다.

    - 문법  
      `useImperativeHandle(arg1, arg2)`

      - arg1: prop으로 전달 받은 ref
      - arg2: 객체를 반환하는 함수

        ```jsx
        // 예시
        const activate = () => {
          inputRef.current.focus();
        };

        useImperativeHandle(ref, () => {
          return {
            // ref 바인딩
            // 함수뿐만 아니라 ref를 통해 value 활용도 가능

            // 예시는 외부에서 ref.current.focus 접근 시 activate 함수 실행.
            focus: activate,
          };
        });
        ```

    - 사용법  
      기본적으로 리액트에서 ref는 예약어이기 때문에 prop으로 넘길 수가 없지만 예외로 가능하게 할 수 있다.

      1. 컴포넌트의 99.9%는 props만 매개변수로 받아도되지만  
         이 경우처럼 ref를 외부에서 접근해야 할 경우 2번째 매개변수로 ref prop을 받을 수 있다.

      2. 인풋 컴포넌트 함수를 `React.forwardRef()` 로 감싸준다.

         ```jsx
         const Input = React.forwardRef((props, ref) => {
           // ...
         });
         ```

      3. `useImperativeHandle` 훅을 사용해 바인딩

         ```jsx
         import { useRef, useImperativeHandle } from 'react';

         const Input = React.forwardRef((props, ref) => {
           const inputRef = useRef();

           const activate = () => {
             inputRef.current.focus();
           };

           useImperativeHandle(ref, () => {
             return {
               focus: activate,
             };
           });
         });
         ```

<br>

- **props 전달에 전개 연산자 활용**  
  여러가지가 정보 담긴 객체 props을 전달할 때, 전개 연산자를 사용하면 해당 객체의 키-값 쌍을 받아 올 수 있다.

  **ex) input**  
  input 태그의 요소로 props.input 객체가 가진 키-값쌍이 추가된다.

  \* props.input = { type: 'text', value: 'blabla', ... }

  1. 전개 연산자로 props 전달  
     `<input {...props.input} />`

  2. 만들어진 input 요소  
     `<input type='text' value='blabla' />`

  ```jsx
  // props.input = { type: 'text', value: 'blabla', ... }

  const Input = (props) => {
    return (
      <div>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} /> // 전개 구문
      </div>
    );
  };
  ```

<br>

- **이벤트 핸들러 바인딩 (handler.bind())**  
  이벤트 핸들러를 자식 컴포넌트에게 prop으로 넘겨줄 때 bind 메서드로 인자를 미리 넘겨줄 수 있다.

  - 예시) 장바구니 아이템 추가/삭제에 활용

    CartItem을 렌더링 할 때 onAdd, onRemove prop으로 핸들러를 넘겨주면서 각 컴포넌트에 매칭되는 item, id를 렌더링하면서 미리 넘겨줘서  
    해당 이벤트가 실행되면 렌더링 될 때 미리 전달받은 인자를 활용 할 수 있다.

    ```jsx
    const handleCartItemAdd = (item) => {
      // item은 추가된 항목
    };

    const handleCartItemRemove = (id) => {
      // id는 제거된 항목의 id
    };

    const Cart = (props) => {
      const cartItems = (
        <ul>
          {cartCtx.items.map((item) => (
            <!--
            렌더링 할 때 onAdd에 해당 item,
            onRemove에 해당 id를 미리 넘겨줌.
            -->
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onAdd={handleCartItemAdd.bind(null, item)}
              onRemove={handleCartItemRemove.bind(null, item.id)}
            />
          ))}
        </ul>
      );
    };
    ```

---

## 3. React-Behind the Scenes

### 1. 리액트가 백그라운드에서 어떻게 작동하는지?

### 2. 가상 DOM의 이해 및 작동 방식

### 3. State 작동 방식

---

<br>

- **리액트는 어떻게 작동하는가?**  
  리액트는 컴포넌트만 신경쓰고, 실제 DOM에 대한 작업을 하는 것은 React DOM이다.

  1. 리액트가 관리하는 것

     - props
     - state
     - context

     - 이것들이 변경되면 사용되는 컴포넌트들이 리액트에 의해 변경되고,  
       이 컴포넌트가 화면에 그리려는 것을 리액트 DOM에 알리고,  
       리액트 DOM은 이것을 실제 DOM에 표현할 수 있게 도와준다.

  2. 컴포넌트 재평가 `!==` DOM 리렌더링

     상태, prop, context 변경으로 인해 컴포넌트에 변경이 발생하면 컴포넌트 함수가 재실행되어 리액트가 이를 재평가한다.  
     그러나 리액트에 의해 컴포넌트 함수가 재실행된다고 실제 DOM의 각 부분들이 다시 렌더링되거나 재평가되는 것은 아님.

     > 실제 DOM은 리액트가 구성한 컴포넌트의 이전 상태와 현재 상태간의 차이점을 기반으로  
     > 가상 DOM과의 비교를 통해 변경이 필요할 때만 업데이트된다.  
     > **즉, 실제 DOM은 필요한 경우에만 변경된다.**

     이 작업들은 메모리에서 이루어지기때문에 간편하고, 자원도 적게 드는 성능상의 이점이 있다.

  - 예시

    1. 리액트는 두 스냅샷간의 차이점인 `<p>This is new!</p>`를 리액트 DOM에 보고.
    2. 리액트 DOM은 해당 부분만을 실제 DOM의 div 안의 h1 요소 다음에 추가하여 업데이트.

       ```html
       <!-- 1. 이전 평가 결과 -->
       <div>
         <h1>Hi there!</h1>
       </div>
       ```

       ```html
       <!-- 2. 현재 평가 결과 -->
       <!--
          이전 스냅샷과 비교하여
          div, h1 태그는 건들지않고
          p 태그만 추가
        -->
       <div>
         <h1>Hi there!</h1>
         <!-- 차이점 -->
         <p>This is new!</p>
       </div>
       ```

  3.  기본적으로 부모 컴포넌트가 재평가되면 자식 컴포넌트도 재평가된다.  
       이런 불필요한 렌더링을 해결하기 위한 방법들 중 한가지로 `React.memo()`가 있다.

      - 모든 props 값을 확인한 뒤 값이 바뀐 경우에만 컴포넌트를 재평가, 재실행한다.

      - `memo`로 props 값을 비교할 때 비교연산자가 사용되기때문에,  
         원시값이 아닌 props 값들 (함수, 객체 등)은 항상 변경된 것으로 인식한다.

        `props.value === props.previous.value`

        > 이렇게 작동하지는 않지만 이런식으로 작동한다.

        1. 원시값의 경우

           ```jsx
           // 항상 false만을 전달해 변경이 없어 리렌더 X
           const DemoOutput = (props) => {
             return <p>{props.show ? 'This is new!' : ''}</p>
           }

           function App() {
             return <DemoOutput show={false}>
           }
           ```

        2. 원시값이 아닌 객체, 함수 등의 경우

           ```jsx
           // 항상 같은 함수를 전달하지만
           // 새롭게 생성되기때문에 다른 함수로 인식
           function App() {
             const [showParagraph, setShowParagraph] = useState(false);

             const handleShowParagraph = () => {
               setShowParagraph((prevState) => !prevState);
             };

             return (
               <Button onClick={handleShowParagraph}>Toggle Paragraph</Button>
             );
           }
           ```

           이 경우에는 함수를 저장할 수 있는 `useCallback()` 사용

           ```jsx
           const handleShowParagraph = useCallback(() => {
             {
               setShowParagraph((prevState) => !prevState);
             }
           }, [dependency]);
           ```

      - memo가 적용된 컴포넌트의 자식 컴포넌트들에게도 영향을 준다.

        > memo 적용 컴포넌트가 실행되지 않으면  
        > 그 자식들도 재실행되지 않는다.

      - 예시

        ```jsx
        import React from 'react';

        const DemoOutput = (props) => {};

        // React.memo로 감싸주면 끝
        export default React.memo(DemoOutput);
        ```

      - 단점  
         root 컴포넌트에 변경이 발생할 때마다 memo가 적용된 컴포넌트로 이동해 기존 props 값과 새로운 값을 비교한다.  
         이는 곧 리액트에게 2가지의 추가 작업 비용을 발생시킨다.

        1. 기존 props 값을 저장하는 공간
        2. 비교하는 작업

        따라서 앱의 크기, props의 개수, 컴포넌트의 복잡도, 자식 컴포넌트 개수 등  
        여러 요인에 의한 비용의 차이가 있기때문에 무조건적인 사용은 피해야한다.

- **리액트의 상태 관리**

  - 리액트는 `useState`와 전달된 기본값에 대해서는 한번만 만들고 관리한다.

    1. App 컴포넌트를 최초 실행할 때 useState 호출되면 리액트가 관리하는 새로운 상태변수를 만들고,  
       그 변수가 어느 컴포넌트에 속하는지 기억해둔다.

    2. 이후 기본값을 사용해서 초기화한다.

    3. 다음으로 컴포넌트의 재평가 과정에서 useState가 호출되면 새롭게 상태변수를 생성하지는 않고, 필요한 경우 상태를 업데이트한다.

    4. 컴포넌트가 DOM에서 제거되거나 다시 연결되면 새로운 상태가 초기화될 수 있다.

  - **상태 업데이트 스케줄링**  
    리액트는 상태를 업데이트하는 setState 함수가 호출되면 그 즉시 상태를 업데이트하는 것이 아닌 갱신 예약인 상태로 스케줄에 넣어둔다.  
     대부분의 경우 상태 변경이 발생하면 스케줄 작업이 매우 빠르게 발생해 거의 즉각적이나 다름없다.

    > 하나의 프로세스 (ex. 함수) 에서 여러개의 상태 변경이 일어났다면,  
    > 한번에 처리되도록 스케줄에 묶어서 등록된다.

<br>

- **`useMemo()`**  
  결과를 기억하는 훅으로 자주 사용할 일은 없을 것.

  - 메모리를 사용해 데이터를 저장하므로 일정 성능을 사용한다.

---

## 4. 클래스 컴포넌트

### 1. 클래스 컴포넌트와 존재 이유

### 2. 클래스 컴포넌트의 작동

### 3. Error Boundary

---

<br>

- **컴포넌트 라이프 사이클**

  1. componentDidMount()  
     컴포넌트 마운트 시

     > = useEffect(..., [])  
     > 빈 배열의 useEffect와 같다.

  2. componentDidUpdate()  
     컴포넌트 업데이트 시 (ex. 리렌더)

     > = useEffect(..., [someValue])  
     > 의존성 값이 있는 useEffect와 같다.

  3. componentWillUnmount()  
     컴포넌트가 DOM에서 삭제되기 전
     > = useEffect의 cleanup  
     > cleanup 함수와 같다.

<br>

- **Error Boundary**  
  앱에서 오류가 발생했을 경우 모든 컴포넌트의 실행이 중단되면서 앱 전체 강제 중단을 막으면서 에러를 처리하는 기법으로,  
  리액트에서 컴포넌트 렌더링 에러 처리에 `try-catch` 사용이 불가능한데, 이럴 때 사용할 수 있다.

  - 클래스 내부에 `componentDidCatch()` 메서드를 추가하면 클래스 컴포넌트를 에러 바운더리로 만들게 된다.

    ```jsx
    import { Component } from 'react';

    class ErrorBoundary extends Component {
      constructor() {
        super();
        this.state = { hasError: false };
      }

      componentDidCatch(error) {
        console.log(error);
        this.setState({ hasError: true });
      }

      render() {
        if (this.state.hasError) {
          // 에러 발생 시 표시 할 메시지
          return <p>Something went wrong!</p>;
        }

        // 에러 미발생 시 감싼 기존 컴포넌트
        return this.props.children;
      }
    }

    export default ErrorBoundary;
    ```

  - 사용 할 컴포넌트를 감싸준다. (여러 개도 가능)

    ```jsx
    class UserFinder extends Component {
      // ...

      render() {
        return (
          <Fragment>
            =
            <div className={classes.finder}>
              <input
                type='search'
                onChange={this.handleSearchChange.bind(this)}
              />
            </div>
            <ErrorBoundary>
              <Users users={this.state.filteredUsers} />
            </ErrorBoundary>
          </Fragment>
        );
      }
    }
    ```

---

## 5. 백엔드 & 데이터베이스 연동

### 1. 리액트와 데이터베이스가 소통하는 방법

### 2. Http 요청 전송 & 응답 처리 방법

### 3. 로딩 State & 에러 핸들링

---

<br>

- **리액트와 데이터베이스의 소통 방법**

  - 기본적으로 클라이언트에서 데이터베이스에 직접 접근하는 방식은 큰 보안 문제로, 해서는 안된다.

    > 사용자도 접근이 가능하기때문

  - 보통은 데이터베이스와 통신하는 백엔드 서버와 API를 통해 통신한다.

<br>

- **HTTP 통신**

  1. Axios  
     별도의 패키지 설치가 필요하며, 자체적인 에러 처리, 요청 취소 기능 등 추가 기능을 제공한다.  
     크고 복잡한 프로젝트에서 선호된다.

     - `fetch(arg1, arg2)`

       1. arg1 (필수): 문자열 형태의 URL

       2. arg2 (선택): 객체 형태의 옵션 (method, headers, body, ...)

  2. Fetch API  
     브라우저 내장 함수로 별도로 설치할 필요가 없지만, 에러 처리가 다소 번거로운 단점이 있기때문에  
     작은 규모의 프로젝트의 간단한 요청을 처리하는 경우에 효과적이다.

     - `fetch(arg1, arg2)`

       1. arg1 (필수): 문자열 형태의 URL

       2. arg2 (선택): 객체 형태의 옵션 (method, headers, body, ...)

       3. 반환값: Promise 객체

       ```js
       function handleFetch() {
         fetch('URL', {
          method:, // 기본값 GET
          headers:, // HTTP 헤더 지정
          body:, // HTTP 바디의 데이터 지정
          mode:, // 요청 모드 지정
          credentials:, // 자격 증명 설정
          cache:, // 캐싱 동작
         }).then((response) => {
          return response.json();
          }).then((data) => data);
       }
       ```

<br>

- **async/await**  
  기존 fetch 구문에서 프로미스 체이닝으로 데이터를 가공하는 과정인 then 구문의 생략이 가능해져서  
  코드의 가독성이 좋아지고, 기존과 동일하게 비동기 처리가 가능해진다.

  ```js
  // 프로미스 체이닝
  function handleFetch() {
    fetch('URL')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }
  ```

  ```js
  // async & await
  async function handleFetch() {
    const response = await fetch('URL');
    const data = await response.json();

    setData(data.results);
  }
  ```

<br>

- **에러 처리**  
  try-catch 구문과 response 상태를 확인해 처리.

  ```jsx
  function App() {
    async function handleFetch() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('URL');

        // HTTP 요청 성공 체크
        if (response.ok) {
          throw new Error('에러 메시지');
        }
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false); // 성공하던 실패하던 로딩은 중지
    }

    return (
      <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      </p>
    )
  }
  ```

<br>

- **POST 요청**

  1. fetch

  ```js
  fetch('URL', {
    method: 'POST',
    body: '보낼 데이터',
    headers: {
      'Content-Type': 'application/json', // 데이터의 형식
      Authorization: '...', // '인증토큰'
    },
  });
  ```

---

## 6. 커스텀 훅

### 1. 커스텀 훅이란? & 왜 사용하는지?

### 2. 커스텀 훅을 만드는 법

### 3. 커스텀 훅의 규칙과 예시들

---

<br>

- **커스텀 훅이란?**  
  상태를 관리하는 로직을 재사용 가능한 함수로 만들어 다른 컴포넌트에서도 사용할 수 있게 한 것.

  - 중복되는 로직에서 state 등 리액트 훅이 사용된다면 일반 함수로의 분리는 불가능.  
    이럴 때 커스텀 훅을 사용!

  1. **네이밍은 항상 use로 시작한다. (camelCase)**

  2. **로직만 공유할 뿐, 상태는 공유하지 않는다.**  
     커스텀 훅에서 만들어진 상태는 호출한 각 컴포넌트에 묶여 각 컴포넌트는 각자의 상태를 갖게 된다.

  3. **매개변수를 받거나 값을 반환할 수 있다.**  
     커스텀 훅도 결국 함수이기 때문에 매개변수를 받을 수 있고,  
     상태, 객체, 함수, 값 등 무엇이든 반환할 수 있다.

---

## 7. Forms & User Input 핸들링

### 1. 더 복잡한 Forms

### 2. Forms & Inputs 핸들링 및 검증

### 3. 단순화 (with 도구, 접근 방법)

---

<br>

- **유효성 검사 시나리오**

  1. 하나 이상의 인풋들의 유효성 검사 실패

     - 문제가 있는 인풋 하이라이트
       > 유효성 검사 시기
     - 관련 에러 메시지 출력
     - 제출 및 저장 차단

  2. 모든 인풋들의 유효성 검사 성공

     - 제출 및 저장 허용

<br>

- **유효성 검사의 시기**  
  여러가지 방법을 적절히 결합해 사용해야함.

  **1. 사용자의 입력값 제출 시**

  - 불필요한 경고의 감소
  - 그러나 그만큼 피드백이 늦음

  **2. 값을 입력 후 input 요소가 포커스를 잃을 때**

  - 특정 입력을 끝내자마자 바로 에러 출력 가능
  - 사용자가 아무 입력없이 손대지 않은 폼에 대해서 매우 유용
  - 그러나 입력을 고치는 중에 유효한지 알려줄 수 없음

  **3. 입력을 할 때마다 (키를 칠 때마다)**

  - 입력값에 대한 즉각적인 피드백 가능
  - 그러나 사용자는 유효한 값을 입력하기도 전에 수많은 경고를 받게될 수 있음

<br>

- **용도에 따른 인풋값 읽기**  
  인풋값을 읽는 방법에는 state, ref가 있다.

  **1. `state`**

  - 즉각적인 유효성 검증을 위해 입력마다 입력값이 필요할 때
  - 입력된 값을 초기화하고 싶을 때
    > ref로도 가능하지만 DOM을 직접 조작해야하므로 지양할 것

  **2. `ref`**

  - 값이 제출 시 한번만 필요할 때

---

## 7. 음식주문 앱 http & form 작업

> Firebase의 실시간 데이터베이스 사용

### 1. Checkout & Order Form 추가

### 2. Orders 제출 시 백엔드 요청

### 3. Meals 데이터 Fetching

---

<br>

- **요구사항**

1. 더미 데이터 수동으로 데이터베이스에 이동 ( O )

2. Meals GET ( O )

3. 결제 Form ( O )

4. Order GET, POST ( O )

5. 주문서(영수증) 보여주기 ( )

etc. 음식 추가 - Meals POST ( )

---

## 8. 리덕스

### 1. 리덕스란? 왜 사용하는지?

### 2. 리덕스 기초와 사용법

### 3. Redux Toolkit

---

<br>

- **리액트에서의 3가지 상태 정의**  
  리액트에서 상태를 3가지로 정의하자면

  1. Local State  
     데이터가 변경되면 하나의 컴포넌트에 영향을 미치는 state.

     - 사용자 인풋 state
     - 필드 on/off 토글 버튼

     > `useState` 또는  
     > 약간 복잡하다면 `useReducer` 사용

  2. Cross-Component State  
     다수의 컴포넌트에 영향을 미치는 state.

     - 모달 컴포넌트

     > `prop chains(drilling)`를 필요로 함.

  3. App-Wide State  
     애플리케이션의 모든 컴포넌트에 영향을 미치는 state.

     - 사용자 인증

     > `prop chains(drilling)`를 필요로 함.

  - `리덕스`는 Cross-Component state, App-Wide state를 위한 상태 관리 시스템이다.

<br>

- **What is "Redux"?**  
  리액트 컨텍스트의 대안

  - 컨텍스트의 잠재적인 단점

    1. 설정과 상태 관리가 복잡해질 수 있다.

       > 심하게 중첩된 코드

       ```jsx
       // 이것을 해결하기 위해 하나의 큰 컨텍스트로 합친다면 관리가 힘들어짐.

       return (
         <AuthContextProvider>
           <ThemeContextProvider>
             <UIInteractionContextProvider>
              <MultiStepFormContextProvider>
                <UserRegistration />
             </UIInteractionContextProvider>
           </ThemeContextProvider>
         </AuthContextProvider>
       );
       ```

    2. 성능 이슈
       "데이터가 자주 변경되는 경우에는 좋지 않다"는 리액트 팀원의 공식적인 언급이 있다.

<br>

- **리덕스의 작동 방식**

  - 리덕스의 규칙

    1. 절대로 저장된 데이터를 직접 조작하지 않는다.
    2. 데이터는 절대로 반대 방향으로 흐르지 않는다.

  1. `Store`  
     하나의 중앙 데이터 저장소

     - 전체 애플리케이션의 모든 상태를 저장한다.
     - 직접 관리할 필요 X.
     - 데이터가 변경되면 컴포넌트는 그걸 감지해서 업데이트된다.
       > 해당 컴포넌트 구독 필요

  2. `리듀서 함수`  
     데이터의 변경을 담당

     - `useReducer` 에서의 리듀서가 아닌 일반적인 프로그래밍 개념의 리듀서 함수이다.
       > 입력을 변환해 새로운 출력, 결과를 뱉어내는 함수
     - 리듀서 함수는 `순수 함수`로,  
       동일한 입력에는 항상 같은 값을 출력해야하며,  
        함수 안에서는 어떠한 부수적인 효과도 없어야 한다.

     1. 컴포넌트에서 액션을 리듀서로 전달해 작업을 수행한다.
     2. 그 후 리듀서는 새로운 상태를 뱉어내고 Store의 기존 상태를 업데이트한다.
     3. store의 상태가 업데이트되면 구독중인 컴포넌트가 알림을 받아 UI 업데이트가 이뤄진다.

<br>

- **store 생성 예시**

  > 카운터 예제

  ```js
  // src/store/index.js
  const redux = require('redux');

  const initailState = {
    counter: 0,
  };

  const counterReducer = (state = initailState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { counter: state.counter + 1 };

      case 'DECREMENT':
        return { counter: state.counter - 1 };

      default:
        return state;
    }
  };

  const store = redux.createStore(counterReducer);

  export default store;
  ```

  > App에 store 제공

  ```js
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { Provider } from 'react-redux'; // import

  import './index.css';
  import App from './App';
  import store from './store/index'; // import

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  ```

<br>

- **`useSelector`**  
  리덕스 스토어를 활용하기 위한 훅으로 react-redux가 실행함.

  - `useStore` 훅도 있지만 `useSelector` 사용을 권장.

    > 클래스 컴포넌트에서는 connect 사용 (react-redux)

  - 앱에 store를 제공한 상태에서 특정 컴포넌트에 특정 state를 사용하고 싶을 때 사용

  - `useSelector`를 사용하면 `react-redux`가 해당 컴포넌트의 구독 설정을 자동으로 해줌.

  - 컴포넌트를 제거하거나 어떤 이유에서든 DOM에서 제거되면 `react-redux`가 자동으로 구독을 해지함.

  - 예시

    > Counter 컴포넌트에서 counter state 가져오기

    ```jsx
    // Counter.js

    import { useSelector } from 'react-reedux';

    import classes from './Counter.module.css';

    const Counter = () => {
      // 스토어에서 변경될 때마다 자동으로 업데이트되고 최신 카운터를 받게됨.
      const counter = useSelector((state) => state.counter);

      const toggleCounterHandler = () => {};

      return (
        <main className={classes.counter}>
          <h1>Redux Counter</h1>
          <div className={classes.value}>-- COUNTER VALUE --</div>
          <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
      );
    };

    export default Counter;
    ```

<br>

- **`useDispatch`**  
  리덕스 스토어에 액션을 전달할 때 사용하는 훅

  1. 먼저 `useDispatch` 훅으로 `dispatch` 변수 선언

     ```js
     const dispatch = useDispatch();
     ```

  2. 해당 변수로 액션 전달

     ```js
     const handleIncrement = () => {
       dispatch({ type: 'INCREMENT' });
     };
     ```

<br>

- **`connect`**  
  클래스 컴포넌트에서 스토어에 접근하기 위한 함수.

  `export default connect(arg1, arg2)(Component)`

  1. 2개의 인자를 받고 함수를 반환한다.

     > key name이 prop name

     - mapStateToProps (arg1): 상태를 받는 함수
     - mapDispatchToProps (arg2): 액션을 전달하는 함수

     ```js
     // Counter.js

     class Counter {
       // ...
     }

     // 상태를 받는 함수
     const mapStateToProps = (state) => {
       return {
         counter: state.counter,
       };
     };

     // 액션을 받는 함수
     const mapDispatchToProps = (dispatch) => {
       return {
         increment: () => dispatch({ type: 'INCREMENT' }),
         decrement: () => dispatch({ type: 'DECREMENT' }),
       };
     };

     // 반환한 함수에 컴포넌트를 인자로 넘김
     export default connect(mapStateToProps, mapDispatchToProps)(Counter);
     ```

  2. 핸들러 바인딩

     ```js
     class Counter {
       handleIncrement() {
         // mapDispatchToProps
         this.props.increment();
       }

       handleDecrement() {
         // mapDispatchToProps
         this.props.decrement();
       }

       // ...

       render() {
         return (
           // state 가져오기
           <div>{this.props.counter}</div>
           <div>
             <!-- 핸들러 바인딩 -->
             <button onClick={this.handleIncrement.bind(this)}>
               Increment
             </button>
             <button onClick={this.handleDecrement.bind(this)}>
               Decrement
             </button>
           </div>
         );
       }
     }
     ```

<br>

- **Redux Toolkit**  
   리덕스를 조금 더 편리하게 사용하게 해주는 라이브러리

  - 내부적으로 `immer`를 사용해 따로 코드를 작성하지 않아도 기존 상태의 불변성을 지켜준다.
    > ex) return state.counter++  
    > 이렇게 작성이 가능하다.

  1. `createSlice`: 이름, 초기상태, 리듀서를 기능 중심으로 묶어서 하나의 슬라이스로 자동으로 생성해 하나의 파일에서 관리하기 용이해진다.

     > 카운터 슬라이스 생성

     ```js
     // store/index.js

     import { createSlice } from '@reduxjs/toolkit';

     const initialState = {
       counter: 0,
       showCounter: true,
     };

     const counterSlice = createSlice({
       name: 'counter',
       initialState,
       reducers: {
         increment(state) {
           // Redux toolkit과 createSlice를 사용하면 기존 상태를 바꿀 수 없다.
           state.counter++;
         },
         decrement(state) {
           state.counter--;
         },
         increase(state, action) {
           state.counter = state.counter + action.payload;
         },
         toggleCounter(state) {
           state.showCounter = !state.showCounter;
         },
       },
     });
     ```

     > store에서 여러개의 slice reducer 등록

     모든 리듀서들을 하나의 큰 리듀서로 병합해준다.

     ```js
     // store/index.js

     import { configureStore } from '@reduxjs/toolkit';

     const store = configureStore({
       reducer: {
         // key: slice.reducer
         counter: counterSlice.reducer,
         auth: authSlice.reducer,
       },
     });
     ```

     - 다중 슬라이스에서 `useSelector`로 값 가져오기

       > 스토어에 리듀서를 등록할 때의 key값을 거쳐서 호출한다.

       ```js
       const show = useSelector((state) => state.counter.showCounter);
       ```

<br>

- **store 파일 분할**

  기존의 코드를 여러개의 기능별로 여러 파일로 분할해 코드가 더 깔끔하고 관리하기 용이해짐.

  > 기존 코드

  ```js
  // store/index.js

  import { createSlice, configureStore } from '@reduxjs/toolkit';

  const initialCounterState = {
    counter: 0,
    showCounter: true,
  };

  // counter, showCounter를 세트로 하나의 slice 생성
  const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
      increment(state) {
        // Redux toolkit과 createSlice를 사용하면 기존 상태를 바꿀 수 없다.
        state.counter++;
      },
      decrement(state) {
        state.counter--;
      },
      increase(state, action) {
        state.counter = state.counter + action.payload;
      },
      toggleCounter(state) {
        state.showCounter = !state.showCounter;
      },
    },
  });

  const initialAuthState = {
    isAuthenticated: false,
  };

  const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
      },
      logout(state) {
        state.isAuthenticated = false;
      },
    },
  });

  // 여러개의 리듀서를 병합해 스토어 생성
  const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      auth: authSlice.reducer,
    },
  });

  export const counterActions = counterSlice.actions;
  export const authActions = authSlice.actions;

  export default store;
  ```

  <br>

  > 분할한 개선된 코드

  ```js
  // store/index.js

  import { configureStore } from '@reduxjs/toolkit';

  import counterSlice from './counter';
  import authSlice from './auth';

  // 여러개의 리듀서를 병합해 스토어 생성
  const store = configureStore({
    reducer: {
      counter: counterSlice,
      auth: authSlice,
    },
  });

  export default store;
  ```

  ```js
  // store/counter.js

  import { createSlice } from '@reduxjs/toolkit';

  const initialCounterState = {
    counter: 0,
    showCounter: true,
  };

  // counter, showCounter를 세트로 하나의 slice 생성
  const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
      increment(state) {
        // Redux toolkit과 createSlice를 사용하면 기존 상태를 바꿀 수 없다.
        state.counter++;
      },
      decrement(state) {
        state.counter--;
      },
      increase(state, action) {
        state.counter = state.counter + action.payload;
      },
      toggleCounter(state) {
        state.showCounter = !state.showCounter;
      },
    },
  });

  export const counterActions = counterSlice.actions;

  export default counterSlice.reducer;
  ```

  ```js
  // store/auth.js

  import { createSlice } from '@reduxjs/toolkit';

  const initialAuthState = {
    isAuthenticated: false,
  };

  const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
      },
      logout(state) {
        state.isAuthenticated = false;
      },
    },
  });

  export const authActions = authSlice.actions;

  export default authSlice.reducer;
  ```

---

## 9. 고급 리덕스

### 1. 리덕스의 비동기 처리 방법

### 2. 코드를 어디에 둘 것인가?

### 3. 리덕스 DevTools

---

<br>

- **리덕스의 비동기 처리와 부수효과**

  - 리듀서 함수란 동일한 인풋에 대해 항상 동일한 아웃풋을 생성하는 순수하고, 부수 효과가 없는 동기식 함수이다.

    > 리듀서 내부에는 부수 효과 절대 X

  - 그렇다면 리덕스에서 작업을 할 때 비동기 처리나 부수 효과가 있는 코드를 어디에 넣어야할까?

    1. 컴포넌트 내부 (`useEffect()` 사용)

    2. 액션 생성 함수 (`action creators`)

<br>

- **코드를 어디에 둘 것인가?**

  `Fat Reducers` vs `Fat Components` vs `Fat Actions`

  - 코드의 위치를 고려할 때는 다음을 구별해야 한다.
    1. 부수효과가 없는 코드
    2. 부수효과가 **있는** 코드
    3. 비동기식 코드

  1. 동기식 코드, 부수효과가 없는 코드를 다루는 경우

     - 리듀서 선호
     - 액션 생성 함수, 컴포넌트는 피할 것

  2. 비동기식 코드, 부수효과가 있는 코드를 다루는 경우

     - 액션 생성 함수, 컴포넌트 선호
     - 리듀서는 절대 X

<br>

- **What is a Thunk?**  
  다른 작업이 완료될 때까지 작업을 지연시키는 함수

  - 리덕스는 액션 객체가 아닌 함수를 디스패치 하는 것으로 확인되면 해당 함수를 자동으로 실행한다.

    ```js
    // store/cart.js

    const cartSlice = createSlice({
      // ...
    });

    // 액션 생성 함수 내부에서 비동기 처리 로직
    export const sendCartData = (cart) => {
      // 자동으로 dispatch 인자 전달
      return async (dispatch) => {
        // 반환되어 자동으로 실행되는 함수에서 다시 디스패치
        dispatch({
          // ...
        });
      };
    };

    export const cartActions = cartSlice.actions;

    export default cartSlice;

    // App.js

    function App() {
      // ...

      useEffect(() => {
        dispatch(sendCartData(cart));
      }, [cart, dispatch]);
    }
    ```

---

## 10. SPA 다중 페이지 라우팅

### 1. 라우팅 개요

### 2. React-Router

### 3. 데이터 Fetching & Submission

---

<br>

- **React-Router로 라우팅 구현**

  - 구성 단계 (React Router v6.4 ~)

    1. 라우트 정의  
       `createBrowserRouter`

       > URL 및 경로에 대한 컴포넌트 정의

       ```js
       // App.js

       import { createBrowserRouter } from 'react-router-dom';

       import Home from './pages/Home';

       const router = createBrowserRouter([
         {
           path: '/', // 도메인 뒤의 경로
           element: '<Home />', // 불러올 컴포넌트
         },
         {
           path: '/main',
           element: '<Main />',
         },
         // ...
       ]);

       function App() {
         return <div></div>;
       }

       export default App;
       ```

    2. 라우터 활성화 및 로딩  
       `RouterProvider`

       ```js
       import { createBrowserRouter, RouterProvider } from 'react-router-dom';

       import Home from './pages/Home';

       const router = createBrowserRouter([
         {
           path: '/',
           element: <Home />,
         },
       ]);

       function App() {
         return <RouterProvider router={router} />;
       }

       export default App;
       ```

    3. 모든 대상 컴포넌트들과 네비게이션 제공 확인  
       `Link`

       1. Link는 뒤에서 a 요소를 렌더링하지만 기본적으로 그 요소에 대한 클릭을 감시한다.

       2. 클릭했을 때 HTTP 요청을 전송하는 브라우저 기본 설정을 막는다.

       3. 그 대신에 라우트 정의를 확인해 페이지를 업데이트하고 컨텐츠를 로딩하게 된다.

       ```jsx
       import { Link } from 'react-router-dom';

       function Home() {
         return (
           <Link>
             <div>My Home Page</div>
             <p>
               Go to <Link to='/products'>the list of products</Link>
             </p>
           </>
         );
       }

       export default Home;
       ```

<br>

- **Outlet으로 레이아웃 구성**  
  페이지마다 공통적으로 보여줘야할 레이아웃이 있을 때 유용하다. (ex. 네비게이션)

  - `Outlet` 부분에 children을 렌더링

    ```js
    // pages/Root.js

    import { Outlet } from 'react-router-dom';

    import MainNavigation from '../components/MainNavigation';

    function RootLayout() {
      return (
        <>
          <MainNavigation />
          <main>
            <Outlet />
          </main>
        </>
      );
    }

    export default RootLayout;
    ```

    ```js
    // App.js

    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/products', element: <ProductsPage /> },
        ],
      },
    ]);

    function App() {
      // ...
    }
    ```

<br>

- **에러 페이지 표시**  
  지원하지 않는 경로로 접근했을 경우 등의 이유로 기본으로 제공되는 에러 페이지가 아닌 직접 제공할 수 있음

  - router의 errorElement 프로퍼티에 에러 페이지 연결

    ```js
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          // ...
        ],
      },
    ]);
    ```

<br>

- **`NavLink`**  
  `Link`와 똑같이 사용하지만 해당 링크가 활성중인지, 표시되도록 지원하기 위한 기능이 추가된 것

  - className: 함수를 받는 프로퍼티로, a 태그에 추가할 CSS 클래스를 리턴해 활성 요소의 조건부 스타일 지정에 용이하다.

    > 해당 함수는 자동으로 객체를 받는다.

    ```js
    <NavLink
      to='/'
      className={({ isActive }) => {
        // isActive: 해당 링크의 활성 상태 (boolean)
        isActive ? classes.active : undefined;
      }}

      // 인라인 스타일에도 활용 가능
      // style={({ isActive }) => {
      //   textAlign: isActive ? 'center' : 'left';
      // }}
    >
      Home
    </NavLink>
    ```

  - end: 기본적으로 `NavLink`는 설정된 경로로 시작하는 모든 경로들을 활성인 것으로 간주한다.

    > end={true}를 지정하지 않으면 '/' 로 시작하는 모든 경로에 대해 적용이 된다.

    ```js
    <NavLink
      to='/'
      className={({ isActive }) => {
        isActive ? classes.active : undefined;
      }}
      end // 기본값 true
    >
      Home
    </NavLink>
    ```

<br>

- **`useNavigate`**  
  프로그램적(타이머 만료 등)으로 강제 페이지 이동을 할 때 용이하다.

  ```js
  import { Link, useNavigate } from 'react-router-dom';

  function HomePage() {
    const navigate = useNavigate();

    function handleNavigate() {
      navigate('/products');
    }

    return (
      <>
        <h1>My Home Page</h1>
        <p>
          Go to <Link to='/procuts'>Products Page</Link>
        </p>
        <p>
          <button onClick={handleNavigate}>Navigate</button>
        </p>
      </>
    );
  }
  ```

<br>

- **동적 라우팅**  
  제품 리스트의 여러개의 제품 상세 페이지를 표현할 때 일일히 path를 지정해줘야하는데 이를 지원한다.

  - `:id`: 콜론은 Path Parameter가 올 것을 의미한다.

    > 콜론 뒤에 임의의 이름을 지정해줄 수 있다.  
    > ex) :productId

    ```js
    // products/product1
    // products/product2
    // ...

    {
      path: '/products/:productId',
      element: <ProductDetailPage />
    }
    ```

    - products/ 뒤에 어떤 값이 오던 라우팅된다.

  - `useParams()`: URL의 파라미터를 가져올 수 있다.

    ```js
    const params = useParams();

    return (
      <>
        <h1>Product Details!</h1>
        // URL: procuts/p1
        {params.productId} // p1이 표시됨.
      </>
    );
    ```

<br>

- **상대경로에서의 뒤로가기 구현**  
  Link의 relative 프로퍼티 활용

  - 라우트 정의 (상대경로)

    ```js
    const router = createBrowserRouter([
      {
        path: '/root',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: '', element: <HomePage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/:productId', element: <ProductDetailPage /> },
        ],
      },
    ]);
    ```

  - 잘못된 구현  
    `<Link to='..'>Back</Link>`

    ```js
    import { Link, useParams } from 'react-router-dom';

    function ProductDetailPage() {
      const params = useParams();

      return (
        <>
          <h1>Product Details!</h1>
          <p>{params.productId}</p>
          <p>
            <Link to='..'>Back</Link>
          </p>
        </>
      );
    }

    export default ProductDetailPage;
    ```

    - `'..'` 은 터미널에서처럼 이전으로 가라는 의미

    - `<ProductsPage />`, `<ProductDetailPage />` 모두 `/root`의 자식이면서 서로 형제 관계이다.

    - 형제이므로 이렇게 구현하면 `<ProductsPage />`로 한 단계 올라가는 것이 아닌 `/root`로 올라가게 된다.

  - `relative`를 사용해 수정  
    `<Link to='..' relative='path'>Back</Link>`

    > relative의 기본값은 'route'

    - path로 설정하면 현재 활성 경로를 살펴보고, 그 경로에서 한 세그먼트만 제거하게 된다.

<br>

- **라우트 정의에서 index 프로퍼티**  
  부모 라우트가 활성인 경우에 로딩되어야 하는 기본 라우트를 정의하는 옵션

  - `index: true` 로 설정하면 부모 라우트인 `'/'`에 있을 시 `index` 라우트가 활성화된다.

  - 꼭 써야하는건 아니지만 가끔은 필요할 것. (ex. 빈 경로의 대체 등)

    > `{ path: '', element: <HomePage /> }`

    ```js
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/:productId', element: <ProductDetailPage /> },
        ],
      },
    ]);
    ```

<br>

- **`loader({ request, params })` 프로퍼티**

  - 라우트를 정의할 때 `loader` 프로퍼티를 추가하게되면 리액트 라우터는 **해당 라우트를 방문하기 직전에** 항상 이 함수를 실행한다.

  - loader()는 항상 null 또는 다른 값을 리턴해야 한다.

  - loader 내부 로직은 서버가 아닌 브라우저에서 실행된다.  
    그러므로 loader 함수에서는 어떤 브라우저 API도 사용이 가능하다.

    > 같은 이유로 리액트 훅은 사용 불가능.

  - 해당 함수의 반환값은 `useLoaderData`를 통해 `loader`를 설정한 라우트와 같거나 낮은 수준의 컴포넌트들에서 사용할 수 있다.

    - `useLoaderData`: 가장 가까운 `loader` 데이터에 액세스하는 훅

      ```js
      import { useLoaderData } from 'react-router-dom';

      import EventsList from '../components/EventsList';

      function EventsPage() {
        const events = useLoaderData();

        return <EventsList events={events}>
      }

      export default EventsPage;
      ```

  - 그러나 이런식으로 `loader` 코드를 추가하다보면 App.js 파일 자체가 커지게되는 단점이 있다.  
    따라서 필요로 하는 페이지 컴포넌트 파일에 loader를 넣는 것이 **일반적인 패턴**이며 **권장사항**이다.

    ```js
    // pages/EventsPage.js

    function EventsPage() {
      // ...
    }

    export default EventsPage;

    export async function loader() {
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        // ...
      } else {
        const resData = await response.json();
        return resData.events;
      }
    }
    ```

    ```js
    // App.js

    import EventsPage, { loader as eventsLoader } from './pages/EventsPage';

    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: 'events',
            element: <EventsRootLayout />,
            children: [
              {
                index: true,
                element: <EventsPage />,
                loader: eventsLoader, // 실제 로직은 페이지 컴포넌트에 있다. (포인터)
              },
              // ..
            ],
          },
        ],
      },
    ]);
    ```

  - `useLoaderData('id')`: 여러 라우트에서 하나의 로더를 사용할 때 사용된다.

    > `eventDetailLoader`를 함께 사용하기위해 id, loader, children 설정

    ```js
    // App.js

    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          // { index: true } ...
          {
            path: 'events',
            element: <EventsRootLayout />,
            children: [
            // { index: true } ...
              {
                path: ':eventId',
                id: 'event-detail'
                loader: eventDetailLoader,
                children: [
                  { index: true, element: <EventDetailPage />},
                  { path: 'edit', element: <EditEventPage />}
                ]
              }
            ]
          }
        ]
      },
    ]);
    ```

    > `useRouteLoaderData()`를 설정한 id를 파라미터로 받아 같은 수준의 라우트들에서 같은 loader 데이터 사용

    ```js
    // pages/EventDetailPage.js

    import { useRouteLoaderData } from 'react-router-dom';

    function EventDetailPage() {
      const data = useRouteLoaderData('event-detail');

      return ...
    }

    export default EventDetailPage;

    export async function loader() {
      // ...
    }


    // pages/EditEventPage.js

    import { useRouteLoaderData } from 'react-router-dom';

    function EditEventPage() {
      const data = useRouteLoaderData('event-detail');

      return ...
    }

    export default EditEventPage;
    ```

<br>

- **`useNavigation()`**  
  리액트 라우터가 제공하는 훅으로,  
  현재 전환이 진행 중인지, 데이터를 로딩하는 중인지, 전환이 진행되지 않고 있는지 알 수 있다.

  1. `navigation.state`

     - idle: 실행하고 있지 않은 상태
     - loading: 데이터 로딩중
     - submitting: 전환 진행중

  2. `useEffect()`와의 차이점

     - 이 훅을 사용했을 때의 로딩 인디케이터는 전환 후의 페이지에 표시되는게 아닌  
       현재 화면에 표시되어 있는 페이지, 컴포넌트에 추가된다.

<br>

- **`action({ request, params })` 프로퍼티**  
  `loader` 함수와 마찬가지로 리액트 라우터에서 제공하는 브라우저에서 실행되는 함수로,  
  `loader`와 사용법이 같다.

  > useLoaderData와 같은 useActionData도 제공한다.

  - 폼 컴포넌트에서 받은 데이터는 request 객체에 전달된다.

    ```js
    export async function action({ request, params }) {
      const data = await request.formData();

      data.get('input-name'); // 인풋의 name 필드
    }
    ```

<br>

- **`<Form>` 컴포넌트**  
  리액트 라우터에서 제공하는 특수한 Form 컴포넌트로 form 태그를 대체한다.

  - 백엔드로 요청을 전송하는 브라우저 기본값을 생략하고, 해당 요청을 받아 모든 폼 데이터를 액션으로 전송한다.

  - `method` 프로퍼티를 설정해줘야 한다.

    ```js
    // 'post', 'delete', 'patch', ...
    <Form method=''>...</Form>
    ```

  - 일반적으로 활성 상태인 라우트의 action이 트리거되지만 `action` 프로퍼티를 설정해서 다른 라우트에 action을 트리거할 수 있다.
    ```js
    <Form method='' action='/other-route'>
      ...
    </Form>
    ```

<br>

- **제출 상태를 이용한 UI 업데이트**

  - `useNavigation.state` 의 submitting 값을 활용해 제출하면 버튼 비활성화 등의 사용자 피드백을 줄 수 있다.

    ```js
    function EventForm() {
      // ...

      const navigation = useNavigation();

      const isSubmitting = navigation.state === 'submitting';

      return (
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      );
    }
    ```

<br>

- **`useFetcher()`**  
  페이지를 전환하지 않은 채로 action이나 loader와 상호작용하려는 경우에 사용된다.

  - 쉽게 말해 라우트 변경을 트리거하지 않은 채로 배후에서 요청을 전송할 때 사용한다.

  - 즉 공통된 컴포넌트가 있거나, 같은 페이지에서 여러 번 사용되는 컴포넌트가 있을 경우에 배후에서 데이터만 업데이트하거나 받으려 할 때 유용하다.

  `const fetcher = useFetcher();`

  - 훅이 실행되면 객체를 반환하는데 유용한 프로퍼티와 메서드가 포함되어있다.
    ex) `fether.Form`, `fetcher.submit`, ...

    > Form 컴포넌트, useSubmit과는 다르다

  - 리액트 라우터 `Form`을 사용해 액션을 트리거하면 해당 액션이 등록된 페이지로 전환이 이루어진다.

    > ex) 뉴스레터 페이지, 네비게이션의 뉴스레터  
    > 네비게이션에서 이메일 입력하면 제출한 뒤 해당 페이지로 강제로 이동하게 되는데 이상적이지 않음.

  - 그러나 `fetcher.Form`을 사용하게 되면 위의 경우에 해당 페이지로 전환이 일어나지 않는다.

  - `fetcher`에는 트리거한 action, loader가 성공했는지 알 수 있는 프로퍼티도 많이 포함되어있다.
    > ex) data, state, ...

<br>

- **`defer()` / `<Await>` / `<Suspense>`**

  - `defer`를 사용하면 페이지 로딩 속도가 높아지고 콘텐츠를 기다리는 동안 약간의 콘텐츠를 미리 보여줄 수 있게 된다.

  - `defer()`: 객체의 형태로 지연시킬 값을 받아 Promise를 반환한다. (react-route-dom 제공)

    ```js
    async function loadEvents() {
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // }); // Response 객체 생성

        // json 형식의 데이터를 포함하는 Response 객체를 생성하는 함수.
        return json({ message: 'Could not fetch events.' }, { status: 500 });
      } else {
        return response;
      }
    }

    export function loader() {
      return defer({
        events: loadEvents(), // Promise를 반환
      });
    }
    ```

  - `<Await>`: resolve 프로퍼티에 defer의 Promise를 넣으면 그 데이터가 올 때 까지 기다린다. (react-route-dom 제공)

    ```js
    function EventsPage() {
      const { events } = useLoaderData(); // defer가 반환하는 Promise

      return (
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      );
    }

    export default EventsPage;
    ```

  - `<Suspense>`: 다른 데이터가 도착하기를 기다리는 동안 fallback을 보여주는 특정한 상황에서 사용할 수 있다. (react 제공)

    > Await를 감싸준다.

    ```js
    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    );
    ```

  - `defer()` 내부에서 await 키워드를 사용해 로딩되는동안 일부 데이터만 미리 표시하는 등,  
    페이지 이동 전 어떤 데이터를 기다려야 하는지, 어떤 데이터를 연기해야 하는지 등 제어할 수 있다.

  - `defer()`는 항상 사용하는 것이 아닌 모든 데이터가 도착하기 전에 뭔가를 표시해야 할 때 사용해야 한다.

<br>

- **섹션 요약**
  1. 라우트 설정하는 방법
  2. 여러 경로들에 대한 여러 컴포넌트들을 로딩하는 방법
  3. 에러 핸들링
  4. 여러 라우트를 감싸는 레이아웃 설정 방법
  5. 중첩된 라우트
  6. 데이터 가져오기 / 제출하기
  7. loader, action을 사용한 데이터 가져오기 / 제출하기
  8. useFetcher를 사용해 라우트 전환없이 데이터 조작하기
  9. 데이터를 지연시켜 가져오기
  10. 지연된 데이터가 도착하는 동안 페이지 표시 및 일부 데이터 표시

---

## 11. 인증 (Authentication)

### 1. 리액트 앱에서의 인증

### 2. 사용자 인증 구현

### 3. 인증 지속성 (Auth Persistene) 추가 & 일정 시간 뒤 자동 로그아웃

---

<br>

- **리액트에서의 인증 방식**

  - 인증 토큰
    1. 사용자가 로그인하면 백엔드에서 검증한 뒤 유효한 사용자라면 토큰을 생성해 응답을 돌려준다.
       > 백엔드만의 개인키를 활용해 토큰 생성
    2. 사용자는 받은 토큰을 클라이언트에 저장하고, 이후 요청을 보낼 때 토큰을 첨부해 백엔드에서 해당 요청의 검증이 이루어진다.

<br>

- **쿼리 매개변수**  
  URL에서 물음표 뒤에 붙는 매개변수를 뜻하며,  
  이를 활용해 용도에 따라 다른 요소들을 로딩할 수 있다.

  - `useSearchParams(arg1, arg2)`

    - arg1: 현재 설정된 쿼리 매개변수에 접근할 수 있는 객체
    - arg2(선택): 현재 설정된 쿼리 매개변수를 업데이트할 수 있는 함수

    ```js
    import { Form, Link, useSearchParams } from 'react-router-dom';

    function AuthForm() {
      const [searchParams] = useSearchParams();
      const isLogin = searchParams.get('mode') === 'login'; // 현재 URL에서 mode 쿼리 매개변수 값을 가져옴

      return (
        <>
          <Form>
            // 현재 모드에 따라 링크 연결 (로그인 <--> 가입)
            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
              {isLogin ? 'Create new user' : 'Login'}
            </Link>
          </Form>
        </>
      );
    }

    export default AuthForm
    ```

<br>

- **토큰 관리**

  - 토큰 저장

    > 임시로 브라우저의 로컬 스토리지 이용

    ```js
    // /pages/Authentication.js

    function AuthentiationPage() {
      // ...
    }

    export async function action() {
      // ...

      const resData = await response.json();
      const token = resData.token;

      localStorage.setItem('token', token);

      // ...
    }
    ```

  - 토큰 사용

    > 인증이 필요한 삭제 이벤트에 토큰을 담아 요청

    > 토큰 관리를 위한 함수를 한 파일에 모아 관리

    ```js
    // util/auth.js

    export function getAuthToken() {
      const token = localStorage.getItem('token');
      return token;
    }
    ```

    > 'Bearer'에 공백을 하나 추가하고 뒤에 토큰을 붙여 요청한다.  
    > ex) 'Bearer ' + token;

    ```js
    // pages/EventDetail.js

    function EventDetailPage() {
      // ...
    }

    export async function action({ request, params }) {
      const eventId = params.eventId;

      const token = getAuthToken(); // 저장해둔 토큰
      const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        // 헤더에 담아 백엔드로 요청
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    ```

---

## 12. 리액트 앱

### 1. 배포 단계 & 위험

### 2. Server-side Routing vs Client-side Routing

---

<br>

- **배포 단계**

  1. 테스트
  2. 최적화
     - Lazy loading
  3. 빌드
  4. 프로덕션 코드 서버에 업로드
  5. 서버 설정

<br>

- **Lazy Loading**

  - 한번에 모든 코드들을 불러오면 첫 페이지의 로딩이 느려져 안좋은 사용자 경험을 제공한다.

  - Lazy Loading을 사용하면 특정 컴포넌트를 나중에 필요할 때 불러오게돼서 성능이 향상된다.

  1. 적용할 컴포넌트의 `import`문을 제거한다.

  2. 라우트 정의 element의 컴포넌트를 대체 할 `React.lazy()` 적용한 컴포넌트 선언

     > `<Suspense>`로 감싸주고 fallback 추가도 가능

     ```js
         // App.js
         const { lazy, Suspense } from 'react';

         // React.lazy()
         const BlogPage = lazy(() => import('./pages/Blog'));

         const router = createBrowserRouter([
           {
             // ...
             children: [
               // ...
               {
                 // fallback 추가
                 element: (
                   <Suspense fallback={<p>Loading...</p>}>
                     <BlogPage />
                   </Suspense>
                   ),
               },
             ],
           },
         ])
     ```

  3. 라우트 정의 `loader` 코드에도 `lazy` 적용

     - import 함수는 Promise를 반환한다.

     - `loader`에서 `params`가 필요하다면 전달

     ```js
     // App.js

     const router = createBrowserRouter([
       {
         // ...
         children: [
           // ...
           element: ...,
           loader: ({ params }) => import('./pages/BlogPage').then((module) => module.loader({ params }))
         ]
       }
     ]);
     ```

  4. `Lazy Loading`이 적용된 페이지에 방문할 때 파일이 `import`되고 `loader` 함수가 실행된다.

<br>

- **배포 예시 (with Firebase)**

  - 리액트 SPA는 정적 웹사이트이기 때문에 정적 웹사이트 호스트를 사용하면 된다.

  1. Firebase 새 프로젝트 생성

  2. 생성한 프로젝트의 빌드 탭 -> 호스팅

  3. Firebase 서버에 코드를 업로드하기 위한 도구 설치

     - `$ npm install -g firebase-tools`

  4. Firebase 로그인 및 초기화

     - `$ firebase login`

  5. Firebase 프로젝트에 로컬 프로젝트 연결

     - `$ firebase init`
     - 사용할 기능 선택
     - 초기화 단계에서 SPA 설정 부분 중요!
       > react-router-dom은 클라이언트 측 패키지로 컴포넌트 전환이 브라우저에서 실행되기때문
     - 다른 호스팅 제공자에서 SPA 설정을 물어보지 않는 경우?
       > 모든 요청에 대해 index.html을 반환하도록 직접 리다이렉션 설정 필요

  6. 배포 중단

     - `$ firebase hosting:disable`

---

## 13. Tanstack 쿼리 (리액트 쿼리)

### 1. Tanstack 쿼리란? & 사용법

### 2. 데이터 가져오기 및 변형 (Mutating)

### 3. Tanstack 쿼리 설정

### 4. 심화: 캐시 무효화 & 낙관적 업데이트 등

---

<br>

- **Tanstack 쿼리**

  - useEffect, useState 등의 리액트 훅을 대체해 더 간편하게 HTTP 요청을 처리할 수 있다.

  - 적용하는 것만으로 페이지를 벗어나고 다시 돌아올 때 자동으로 데이터를 업데이트한다.

  - `App 컴포넌트`를 `QueryClientProvider`로 래핑하고 client 프로퍼티를 설정해 사용한다.

    ```jsx
    import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

    const queryClient = new QueryClient();

    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>
        </QueryClientProvider>
      )
    }
    ```

  - `QueryClient.invalidateQueries({target})`: 실행해서 특정 쿼리를 만료시켜 업데이트가 필요하다고 리액트 쿼리에 알려줄 수 있다.

    - 파라미터로 객체 형태의 `queryKey`를 받는다.

    - `queryKey`는 정확히 일치하지 않아도된다. 이는 곧 해당 키를 사용하는 쿼리를 모두 무효화시킨다.

    - 정확히 일치하는 특정 쿼리만 무효화하려면 `exact` 프로퍼티를 `true`로 설정하면 된다.

    - 쿼리 무효화 후 쿼리의 자동 업데이트를 막으려면 `refetchType` 프로퍼티를 `'none'`으로 설정하면 된다.

    ```js
    // 이벤트 쿼리 만료시킨 뒤 자동 업데이트 예시

    import queryClient from '../../util/http.js';

    useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['events'],
          // refetchType: 'none' // 쿼리 자동 트리거 방지해 업데이트 X
        });
      },
    });
    ```

<br>

- **`useQuery()`**  
  리액트 쿼리 팀에서 만든 커스텀 훅으로,  
  자체적으로 HTTP 요청을 전송하고 데이터를 가져와 로딩 상태에 대한 정보 제공, 요청 간 오류 등을 알 수 있다.

  - `GET 요청`에 사용된다.

  - 요청 전송 취소를 위한 `signal prop`을 반환한다.

  - Tanstack 쿼리에는 HTTP 요청을 전송하는 로직이 내장되어 있지 않아 요청을 전송하는 코드는 직접 작성해야 한다.  
    대신 요청을 관리하는 로직을 제공한다. (데이터, 에러 등을 추적하는 역할)

  ```js
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
  ```

  - 프로퍼티

    1. `queryFn`  
       요청 전송 시 실행할 코드 정의

       - 기본적으로 요청 전송을 취소하기위한 signal을 객체 형태로 반환한다.

       - 기본적으로 queryKey도 매개변수로 객체형태로 받는다.

    2. `queryKey`  
       내부에서 쿼리 키를 이용해 요청으로 생성된 데이터를 캐시 처리한다.

       - 전송하는 모든 GET 요청에는 쿼리 키가 있다.

         > 쿼리키는 배열의 형태로 원하는 대로 구성

       - 나중에 동일한 요청을 전송하면 이전 요청의 응답을 재사용할 수 있다.

       - max 프로퍼티로 쿼리의 최대개수를 전송할 수 있다.

    3. `enabled`: (false / true)  
       요청 전송 유무를 설정.
       > 조건부 요청 전송에 활용 가능.  
       > ex) 검색어 입력 전에는 전송하지 않도록 등...

  - 반환값들

    1. `data`: reponse 데이터
    2. `isPending`: 요청 상태
    3. `isLoading`: 로딩 상태
       > 쿼리가 비활성화일 때의 조건부 처리에 활용 가능
    4. `isError`: 에러 상태 (요청 로직에서 에러 처리 필요)
    5. `error`: 발생한 에러 정보
    6. `refetch`: 수동으로 호출시 동일한 쿼리 전송 가능

<br>

- **캐시 처리**

  - 리액트 쿼리는 요청을 통해 얻은 응답 데이터를 캐시 처리하고 나중에 동일한 쿼리 키를 가진 다른 `useQuery`가 실행되면 이 데이터를 재사용한다.

  - 이와 동시에 내부적으로 이 요청을 다시 전송해서 업데이트된 데이터가 있는지 확인하고, 교체해 화면에는 업데이트된 데이터가 표시된다.

  - `staleTime`, `gcTime`: 밀리초(ms) 기준으로 설정.

    1. `staleTime`: 설정한 시간동안은 해당 쿼리의 요청을 다시 전송하지않도록 제어하는 프로퍼티.

       - 불필요한 요청 전송을 방지한다.
       - 기본값은 0으로 캐시 데이터를 사용하지만, 업데이트된 데이터를 가져오기 위한 자체적인 요청을 **항상 전송**한다.

    2. `gcTime (garbage collect time)`: 데이터와 캐시를 얼마나 보관할지를 제어하는 프로퍼티로 기본값은 5분이다.

<br>

- **`useMutation()`**  
  `POST 요청`을 전송할 때 사용하는 리액트 쿼리 훅.

  - `useQuery`와 달리 컴포넌트가 렌더링될 때 요청이 즉시 전송되지 않도록 필요할 때만 전송을 할 수 있다.

  - 프로퍼티

    1. `mutationKey`: 선택 요소. reponse 데이터를 캐시 처리하지 않기때문.

    2. `mutationFn`: `queryFn`과 같은 전송 로직.

       - 데이터 전달 방법: 반환된 `mutate` 함수에 전달

    3. `onSuccess`: mutate 완료 시의 동작을 익명 함수로 작성할 수 있다.
       > `QueryClient`의 `invalidateQueries()`를 활용해 데이터 변동시 만료시켜 업데이트할 수 있다.

  - 반환값

    1. `mutate`: 요청의 실행 시기를 설정하는 프로퍼티로, 원하는 곳에서 이 함수를 호출해 실행한다.

<br>

- **낙관적 업데이트**

  - 리액트 쿼리가 지원하는 기능으로,  
    서버에서 응답을 기다리지않고 사용자에게 빠른 피드백을 제공해 사용자 경험을 개선할 수 있다.

  - 업데이트를 하면 백엔드에 요청을 하기 전 즉시 UI 업데이트가 실행되고 백엔드에서 업데이트 실패시 되돌리는 롤백 기능을 지원한다.

  1.  `useMutation` 훅의 `onMutate()`를 통해 수행할 수 있다.

      > `onMutate`는 `mutate()`를 호출하는 즉시 실행된다.

      - 일반적으로는 캐시되는 새 응답을 받을 때마다 리액트 쿼리에서 수정하지만, `queryClient.setQueryData(arg1, arg2)`를 호출해 직접 데이터를 수정할 수도 있다.
        - `arg1`: 편집하려는 쿼리의 key
        - `arg2`: 해당 쿼리에 저장하려는 새 데이터
          > mutate()에 전달한 값을 onMutate의 인자로 받을 수 있다.

  2.  낙관적 업데이트를 실행할 때 일반적으로 해야하는 다른 작업으로는 `queryClient`를 사용해 특정 키의 모든 활성 쿼리를 취소하는 것이다.

      > Promise를 반환한다.

      - `await cancleQueries({queryKey: [...]})`에 취소하려는 쿼리 key를 객체 형태로 설정한다.

      - 이렇게하면 해당 쿼리의 응답 데이터와 낙관적 업데이트된 쿼리 데이터가 충돌하지 않는다.

  3.  롤백 설정

      - `queryClient.getQueryData([queryKey])`: `setQueryData()` 전에 현재 쿼리 데이터를 변수에 저장해두고 반환해서 에러 발생시 롤백에 사용한다.

        ```js
        const { mutate } = useMutation({
          mutationFn: ...,
          onMutate: async (data) => {
            // ...

            const perviousEvent = queryClient.getQueryData(['events', { id }]);

            return {previousEvent}
          }
        })
        ```

      - `useMutation()`에 `onError(error, data, context)`를 작성한다.

        - data는 똑같이 mutate의 데이터가 전달된다.
        - context에는 onMutate에서 반환한 값이 프롭으로 전달되는데 해당 값으로 쿼리 데이터를 업데이트해준다.

        ```js
        onError: (error, data, context) => {
          queryClient.setQueryData(['events', { id }], context.previousEvent);
        };
        ```

  4.  낙관적 업데이트 적용의 마지막 단계로 `onSettled()` 설정

      - 값으로 함수를 받으며 mutation이 완료될 때마다 호출된다.
      - 쿼리 무효화를 통해 백엔드의 데이터와 프론트엔드의 데이터가 일치한지 확인하고, 동기화되지 않은 경우 리액트 쿼리에 데이터를 다시 가져오도록 내부적으로 작동한다.

      ```js
      onSettled: () => {
        queryClient.invalidateQueries(['events', { id }]);
      };
      ```

<br>

- **`useIsFetching()`**  
  리액트 쿼리에서 제공하는 데이터를 가져오는 상태를 알 수 있는 훅

  - 해당 값이 0이면 데이터를 가져온 것
  - 0보다 더 큰 수면 가져오는 중

  ```js
  const fetching = useIsFetching();

  // 데이터를 불러오는 중이면 progress 렌더링
  return <div id='main-header-loading'>{fetching > 0 && <progress />}</div>;
  ```

---

## 14. Next.js 소개 (Pretty deep dive)

### 1. Next.js란? 왜 사용하는지?

### 2. 파일 기반 라우팅 & 페이지 사전 렌더링

- Next.js의 주요 기능

### 3. 데이터 가져오기 & API 추가

---

<br>

- **프레임워크 vs 라이브러리**

  - 프레임워크는 라이브러리보다 더 크고 기능이 많다.

  - 프레임워크는 하나에 초점을 맞추기보다는 여러가지를 다룬다.

<br>

- **Next.js란?**  
  리액트의 풀스택 프레임워크로,  
  대규모의 양산형 리액트 앱을 편리하게 구축할 수 있는 많은 기능을 제공한다.

  - 리액트 자체도 자바스크립트 라이브러리지만  
    사용자 인터페이스 부분에만 초점을 맞춘다.

  - 보통 대규모 리액트 프로젝트 구축에는 라우팅, 인증에 필요한 라이브러리들을 추가해야한다.

<br>

- **주요 기능과 이점**

  **1. 서버 사이드 렌더링 내장 (SEO 향상)**

  > `SSR`: 페이지 콘텐츠를 전적으로 서버에서 준비

  - `클라이언트 사이드 렌더링`은 초기 HTML 페이지가 뼈대만 있고 비어있어 SEO가 좋지않고, 데이터 로딩시 화면이 깜빡이는 등 사용자 경험에 안좋을 수 있다.

  - `서버 사이드 렌더링`은 서버에서 해당 페이지를 사전 렌더링한 상태에서, 요청이 들어왔을때 완성된 페이지를 사용자와 검색 엔진 크롤러에 제공한다.

  - SEO가 필요없는 예시: 로그인이 필요한 대시보드

  - SEO가 중요한 예시: 검색엔진을 통해 찾아야하는 공개된 콘텐츠 페이지

  - 리액트에서도 SSR 기능이 내장되어 있긴하지만 사용하기 까다로운 반면에  
    Next.js는 추가 설정을 하지 않아도 자동으로 사전 렌더링을 한다.

  **2. 파일 기반 라우팅으로 라우팅 간소화**

  - 리액트에서 코드 내에 라우트를 정의했던 것과 달리  
    Next.js에서는 파일과 폴더를 이용해 페이지와 라우트를 정의한다.

    > 추가 코드가 필요없어져 코드를 적게 작성하면서 작업량이 줄어든다.

  - Next.js에는 특수한 페이지 폴더인 `pages`가 존재하는데  
    이 폴더를 구성하고 페이지가 지원하는 라우트, 경로를 정의하면 된다.

  **3. 풀스택 앱 빌드**

  - 풀스택 리액트 프로젝트를 구축하려면 클라이언트 코드를 비롯해 서버 사이드 렌더링, 백엔드 코드도 필요하다.

  - Next.js를 사용하면 개발자가 리액트 프로젝트에 백엔드 코드를 쉽게 추가할 수 있다.

<br>

- **Next 튜토리얼**

  - 프로젝트 생성 (13 버전)  
     `$ npx create-next-app`

    > 12 버전 다운그레이드

    1.  `$ npx create-next-app`
    2.  `$ npm install next@12 react@17 react-dom@17`

  - 프로젝트 구조 (12 버전)

    1. `/pages` (제일 중요): 파일 기반 라우팅을 설정하고, 앱을 구성할 여러 페이지를 정의.
       - `index.js`: 루트 페이지. (url에서 `/` 뒤에 아무것도 없을 때)
         > ex) index.js  
         > https://도메인/
       - `경로명.js`: 파일명이 `/` 뒤의 경로명으로 사용된다.
         > ex) news.js  
         > https://도메인/news
    2. `/public`: 페이지에서 사용할 공개 리소스. ex) 이미지 등..
       - 리액트 프로젝트와 구성이 다른데 `index.html`이 없다.
         > 사전 렌더링 기능을 내장하기때문
    3. `/styles`: 스타일 파일들

  - React import 생략 가능  
    `import React from 'react'`  
    이미 내부적으로 추가되어서 따로 import 하지 않아도됨.

<br>

- **중첩 라우팅**

  - /pages

    - `pages/index.js`: 루트 페이지
    - `pages/news.js`: news 페이지

  - /pages/news

    > news 하위 폴더 생성 후 중첩 라우팅

    - `pages/index.js`: 루트 페이지
    - `pages/news/index.js`: news 페이지

<br>

- **매개변수를 포함한 동적 페이지**

  - 파일/폴더명에 대괄호를 쓰면 Next.js가 동적 페이지로 인식한다.

  - 뉴스 상세 페이지 예시

    > url: 도메인/news/newsId/

    newsId 자리에 임의의 식별자들이 올 수 있다.

    ```js
    // /pages/news/[newsId.js]

    function DetailPage() {
      return <h1>The Detail Page</h1>;
    }

    export default DetailPage;
    ```

<br>

- **동적 매개변수 값 추출하기**

  - Next.js에서 제공하는 `useRouter()` 훅을 사용해 URL에 입력된 구체적인 값을 추출할 수 있다.

    ```js
    import { useRouter } from 'next/router';

    const router = useRouter();
    const newsId = router.query.newsId; // 라우트 파일의 대괄호 안에 넣은 식별자를 속성으로
    ```

<br>

- **페이지 폴더의 `_app.js`**

  - 각 페이지의 공통된 레이아웃 페이지를 적용하거나 글로벌 스타일을 적용하는데 사용할 수 있는 파일이다.

    > 아래의 경우 모든 컴포넌트에 레이아웃이 적용된다.

    ```js
    import Layout from '../components/layout/Layout';

    import '../styles/globals.css';

    function MyApp({ Component, pageProps }) {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }

    export default MyApp;
    ```

<br>

- **사전 렌더링 작동 방식에 의한 문제점**

  - `useState`, `useEffect`를 통해 데이터를 가져오는 방식으로는 렌더링이 2번 발생하게된다.

    > 컴포넌트가 처음 실행될 때의 초기값은 비어있는 상태  
    > useEffect에 의해 상태가 업데이트되면서 두번째 렌더링

  - 하지만 Next.js의 사전 렌더링은 두번째 렌더링 사이클을 기다리지않아 데이터를 가져온 뒤에 UI 업데이트는 일어나지만, 실제 HTML에는 비어있는 상태이다.

    > SEO에 치명적

  - 그러나 Next.js는 이 문제의 해결책에 대한 기능을 내장하고있다.

    > 두 가지 형태의 사전 렌더링 제공

    1. 정적 생성 (SSG, Static Site Generation)

       - **사전 렌더링 시점**  
         프로덕션용으로 빌드하는 시점. 배포되고 나면 변경되지 않는다.

         > 사전 렌더링한 페이지를 변경하려면 빌드를 다시 하고 배포해야 한다.

         > 많은 앱이나 페이지가 자주 바뀌지는 않지만 그런 경우 대안이 존재함.  
         > (`revalidate` 프로퍼티 사용)

       - **사용**  
         데이터를 기다려야 한다면 페이지 컴포넌트 파일 안에서 특수 함수 `getStaticProps()`를 `export`로 내보내야 한다.

    2. 서버 사이드 렌더링 (SSR)

<br>

- **`getStaticProps()`**  
  사전 렌더링 페이지의 `정적 생성 방식(SSG)`에 사용되는 함수로,  
  데이터를 기다려야하는 페이지 컴포넌트 파일 안에서 `export`해 사용한다.

  - 페이지 컴포넌트 파일에서만 작동한다.

  - Next.js는 사전 렌더링 프로세스 중에 해당 함수를 발견하면 실행한다.

  - 비동기 처리가 가능하다.

    > 컴포넌트에서 사용할 데이터들을 기다린 뒤 함께 렌더링 가능.

  - 여기서 작성되는 코드는 클라이언트 측에서 절대 실행되지 않으며, 빌드 프로세스 중에 실행된다.

  - API나 데이터베이스에서 데이터를 가져오는 작업 뒤에 항상 객체를 반환해야 한다.

    > 객체에는 반드시 props key 프로퍼티를 사용

    ```js
    export async function getStaticProps() {
      return {
        // 항상 props key 객체를 반환
        props: {
          meetups:
        },
        // 점진적 정적 생성 기능이 필요하면 추가
        // 데이터 변경이 잦은 애플리케이션에서 설정시간마다 페이지를 다시 생성함. (단위: 초)
        revalidate: 10 // 10초마다 서버에서 페이지를 다시 생성
      }
    }
    ```

  - 동적인 페이지에서 `getStaticProps()`를 사용할 경우 `getStaticPaths()`가 필요하다.

<br>

- **`getServerSideProps()`**  
  `getStaticProps()`의 `revalidate`를 통한 업데이트로 부족할 경우,  
  예를 들어 요청이 들어올 때마다 페이지를 다시 만들어야 하는 경우 동적으로 생성할 수 있다.

  - 빌드 프로세스 중이 아닌 서버가 배포된 후 실행된다.

  - 함수 내부 코드는 서버에서 실행된다. (클라이언트 측에서는 X)

  - `props key`로 객체를 반환하고,  
    매개변수로 `context`를 받아 요청 객체, 응답 객체 등에 접근할 수 있다.

    ```js
    export async function getServerSideProps(context) {
      const req = context.req;
      const res = context.res;

      return {
        props: {
          meetups: DUMMY_MEETUPS,
        },
      };
    }
    ```

<br>

- **`getStaticProps()` vs `getServerSideProps()`**

  - 무조건 한쪽이 더 좋은 것이 아닌 용도에 맞게 사용할 것

  1. 자주 바뀌는 데이터가 없거나, 인증같은 요청 객체에 접근할 필요가 없다면 `getStaticProps`가 좀 더 낫다.

  2. 자주 바뀌는 데이터가 있거나, 구체적인 요청 객체에 접근해야 할 경우 `getServerSideProps`를 사용해야 한다.

<br>

- **`getStaticPaths()`**  
  빌드 프로세스 중에 사전 렌더링 페이지가 생성되기때문에 동적 페이지 URL 정보가 없는데, 이 동적 URL 값들을 넣어주는 느낌

  - `paths` 배열을 반환하는데, 각 배열의 값은 fallback에 fallback 페이지 표시 여부를, params 객체에 동적 페이지 값을 포함한다.

    ```js
    export async function getStaticPaths() {
      return {
        fallback,
        paths: [
          // 동적 페이지 파일이 [meetupId].js
          { params: { meetupId: 'm1' } },
          { params: { meetupId: 'm2' } },
          { params: { meetupId: 'm3' } },
        ],
      };
    }
    ```

  - **fallback**
    - `false`: paths에 있는 페이지 외에는 404 에러
    - `true`: Next.js가 들어오는 요청에 의해 설정되어있는 paths의 id로 동적으로 생성한다.
    - `blocking`: true 처럼 동적으로 생성하지만 차이점이 있는데  
      `true`는 빈 페이지를 즉시 반환하고 동적으로 콘텐츠를 받는 반면에,  
      `blocking`은 페이지가 생성될 때까지 사용자는 볼 수 없고 완성된 페이지를 제공한다.

<br>

- **API 라우트**  
  API 라우트는 서버에서만 돌아가는 서버 사이드 코드를 포함하는 함수.

  - pages 폴더에 api 폴더를 만들고 그 안에 js 파일로 API 라우트 정의

  - 클라이언트에 노출되지 않아 인증 등의 로직에 용이하다.

  - 함수들은 라우트에 요청이 들어올 때마다 트리거된다.

  - **몽고DB 연결 예시**

    > API 라우트 정의

    ```js
    import { MongoClient } from 'mongodb';

    // /api/new-meetup
    // POST /api/new-meetup

    async function handler(req, res) {
      if (req.method === 'POST') {
        const data = req.body;

        // DB 연결
        // 비밀번호에 @ 포함됐을 경우 %40 으로 변경
        const client = await MongoClient.connect(
          'mongodb+srv://<username>:<password>@cluster0.sjwr7sg.mongodb.net/<dbname>?retryWrites=true&w=majority'
        );
        const db = client.db();

        // 컬렉션 추가
        const meetupsCollection = db.collection('meetups');

        // 컬렉션에 새 문서 삽입 (object)
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        // DB 연결 해제
        client.close();

        // 201: 삽입 성공
        res.status(201).json({ message: 'Meetup inserted!' });
      }
    }

    export default handler;
    ```

    > POST 요청

    ```js
    import { useRouter } from 'next/router';
    import NewMeetupForm from '../../components/meetups/NewMeetupForm';

    function NewMeetupPage() {
      const router = useRouter();

      async function handleAddMeetup(enteredMeetupData) {
        // url: 내부 api 파일 경로
        const response = await fetch('/api/new-meetup', {
          method: 'POST',
          body: JSON.stringify(enteredMeetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        console.log(data);

        router.push('/'); // 루트로 이동
      }

      return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
    }

    export default NewMeetupPage;
    ```

    > 데이터베이스에서 데이터 가져오기

    따로 api 파일로 정의하기보다는, 서버에서만 실행되어 번들에 포함되지않고, 보안에도 유용한 `getStaticProps()`에 작성

    ```js
    export async function getStaticProps() {
      // 서버에서만 실행되어 번들에 포함되지 않고 보안에도 유용하다.
      const client = await MongoClient.connect(
        'mongodb+srv://<username>:<password>@cluster0.sjwr7sg.mongodb.net/<dbname>?retryWrites=true&w=majority'
      );
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const meetups = await meetupsCollection.find().toArray(); // 해당 컬렉션의 모든 문서 찾아 배열로 받음

      client.close();

      return {
        props: {
          meetups: meetups.map((meetup) => ({
            image: meetup.image,
            title: meetup.title,
            address: meetup.address,
            id: meetup._id.toString(), // 데이터베이스에 저장할 때 객체 형태로 저장되는 id를 받아옴
          })),
        },
      };
    }
    ```

<br>

- **Vercel을 활용한 Next.js 프로젝트 배포**

  - Vercel을 통해 배포를 Github 저장소를 배포하면 해당 저장소의 `main` 브랜치를 감시하며 변화가 감지될 때마다 Vercel이 자동으로 빌드, 재배포를 한다.

  - 재배포 프로세스 중 이전 페이지는 계속 실행되고, 작업이 완료되면 새 페이지로 교체된다.
