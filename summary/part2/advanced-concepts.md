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
       <!-- div, h1 태그는 건들지않고 p 태그만 추가 -->
       <div>
         <h1>Hi there!</h1>
         <!-- 차이점 -->
         <p>This is new!</p>
       </div>
       ```
