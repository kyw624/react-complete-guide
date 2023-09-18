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
