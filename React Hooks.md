# React Hooks

掌握两个，即可开发（`useState()`、`useEffect()`）。

#### React 常用的 Hook

> - useState() ：保存状态钩子
> - useEffect() ：处理副作用钩子 -- 向服务器请求数据，进行数据获取
> - useLayoutEffect()：开启同步机制（）
> - useRef()：保存引用
> - useCallback() ：性能优化，缓存函数的钩子
> - useMemo() ：性能优化，缓存 DOM 的钩子
> - useReducer() ：action 钩子
> - useContext() : 共享状态钩子 -- 保存上下文

#### useState()

- `useState` 参数可以是一个数值或带返回值的函数

  - 注意：react 是单向数据流，即不可变数据；
  - `const [state, setState] = useState(初始值))`  useState 函数返回一个数组，该数组可以结构出两个值，第一项是所需要使用的状态 `state`，第二项是改变状态暴露的方法 `setState`；
  - 理论上来说数组的解构按位置解构，命名可以随意，但还是请注意 react 的命名规范，即 const 定义的栈地址不可更改。
  - 不要直接改变 `state` 的值，这并不会触发组件的更新（直接改变 state 并不会触发组件的调用，也就不会触发 useEffect 的调用执行，即使它监听了该状态）；
  - **只有当执行了 `setState` 这个方法以后，=> 才会有新的状态被返回，新的状态被更新后=> 才会触发函数组件的调用；**
  - 实际上 `state` 并不是被改变了，而是 `setState` 函数产生了一个新的状态**替换**了原本的状态。
  - 推荐更新状态的方式：

  ```javascript
  /**
   * 初始值
   */
  useState(
    // 初始值，没有则为 undefined
  )

  /**
   * 保存状态： 
   */ 
  // 1. 直观一点：
  setState(newStatus);
  // 2. 函数返回值的形式（推荐）：
  setState((preState) => {
    return newStatus;
  });

  /**
   * 使用状态：
   */ 
  // 1. 状态（state）的声明是在函数作用域的最顶层声明的，所以状态的使用在这个函数组件内部相当于 “全局作用域”。
  // 2. 状态（state）可以被直接更改，这只是 js 本身的性质，但 React 并不推荐更改状态，这可能会导致状态更新的不确定性：
  const [demoState, setDemoState] = useState(10);

  demoState = 11; // 更改 demoState 并不会引起函数组件的更新； 即使是监听在了 useEffect 之中

  ```

  - 注意， hook 只能在最顶层使用，`setState` 可以在函数体内使用并不是 hook，而是 useState() 的返回值中解构出来的一个方法。

```javascript
 this.state = {
  status: 0
 }

 this.setState({
  status: 1
 })

==>

 const initialState = 0;
 const getInitialState = () => 0;

 const [status, setStatus] = useState(0)
 // const [state, setState] = useState(initialState);
 // const [state, setState] = useState(getInitialState);
```

#### useEffect

```javascript
 useEffect(() => {
    /**
     * 请求数据 || 处理逻辑 || 需求执行
     */ 
    return () => {
      /**
       * 回调函数，用来处理函数产生的副作用（消除副作用）
       * 执行机制：在更新阶段执行，依赖更新时先执行此回调，再执行函数请求内容
       */
    }
  }, [
    /**
     * 监听依赖，可以为空。
     * 监听的值因 setState 的改变才会执行此钩子
     * []：componentDidMount => (只能说类似)
     * [data]：componentDidUpdate => (只能说类似),
     * 补充：componentDidMount 与 componentDidUpdate 执行是在 React 更新 DOM 之后，而 useEffect 是与 DOM 的更新异步进行；
     * 
     */
  ]);

 const once = [];
 useEffect(() => {

 }, once);
```

1. useEffect 接收两个参数，第一个参数是 Effect 函数，第二个参数是一个数组,避免 effects 不必要的重复调用
2. useEffect 在 加载(第一次渲染) 和 更新 时被触发
3. useEffect 第二个参数用于定义所依赖的变量
   若传空数组，即避免更新时被触发，只用于初始化，第一次渲染
   若不传空，数组中变量之一更改，即会触发运行
4. 如何实现可重用的数据获取 hook? -- 自定义数据获取 hook
5. 第二个参数不存在的时候，每次 页面更新都会执行该 hook

#### useLayoutEffect()

1. 类比 `useEffect` 的使用方法去使用就好；
2. 注意几点不同：

- `useLayoutEffect` 开启同步，并不是该钩子内部的回调函数开启同步；
- 而是 `Commit` 阶段的新 DOM 准备完成以后（在页面浏览器加载 UI 之前），执行 useLayoutEffect 的内容；
- 相比于 `useEffect` 的执行时期（**Commit 阶段之后，与 UI 加载异步执行**），`useLayoutEffect` 会在 UI 加载之前**同步执行**；
- 代价就是，`useLayoutEffect` 可能会造成页面加载堵塞的问题（因为其同步执行机制）；

3. 理解 React 生命周期的执行机制，有助于理解该钩子。
4. 如无必要，勿增实体。
5. `useLayoutEffect` 一定会在 `useEffect` 执行之前去执行，如果其中包含大量同步的计算，则会影响到 `useEffect` 的执行与页面 UI 的绘制；

```javascript
// 视图更新时同步执行
useLayoutEffect(() => {
  /**
   * 用法同 useEffect;
   */ 
},[])
```

#### useRef

1. ref 主要用于保持引用；
2. 项目中的用法：

- ref 获取绑定 dom：

```javascript
const refValue = useRef(null);  ①
let refData = useRef(null);  ②

const dom = (<>
  <div ref={refValue}></div>
  <div ref={(preRef) => refData = preRef}></div>
</>)

/**
 * ①：refValue 是将 dom 中的 ref 属性进行了绑定
 * ②：refData 是将 ref 进行了赋值
*/

// refValue 绑定了以后，使用时，所有的属性和方法实质是在 refValue.current 中
// refData 为赋值操作，使用时，dom 对象中的属性和方法在 refData 实例中。
```

3. 参见 `components/DateTimePicker` 双选时间组件的应用

- 其父组件利用 useRef 绑定并拿到 这个组件中的属性和方法；

4. 参见项目中 一些自适应表格的实现

- 获取其父 Dom 的宽/高属性，改写其表格本身滚动的临界值；

##### useRef

    const refContainer = useRef(initialValue);

##### React.forwardRef

因为函数组件没有实例，所以函数组件无法像类组件一样可以接收 ref 属性
_Warning： Function components cannot be given refs._

    const TextInput =  forwardRef((props,ref) => {
     return <input ref={ref}></input>
    }

1. forwardRef 可以在父组件中操作子组件的 ref 对象
2. forwardRef 可以将父组件中的 ref 对象转发到子组件中的 dom 元素上
3. 子组件接受 props 和 ref 作为参数

#### useMemo

1. useCallback 与 useMemo 区别
   useCallback 是缓存了函数自身，而 useMemo 是缓存了函数的返回值。

2. 应用场景：

- `useMemo` 一般在性能优化时才会用到，React 支持手动控制 DOM 的更新，单向数据流的改变会引起组件更新，此时如果使用 `useMemo` 包裹一层，则**只有监听的依赖项发生更新的时候（如果没有则任何时候都不更新），所对应的 DOM 结点才会重新渲染**；
- 一般应用在大量的组件渲染时（比较消耗浏览器性能的情况下），数据的更改不需要组件的更新的时候才会使用；
- **不要去使用自己没有完全掌握的钩子。**

```javascript
  /** 
   * 点击事件会触发 => 状态的改变 => 触发 dom 的更新
   * useMemo 则会优化 Dom 的更新机制，若监听的状态（无状态的时候，dom 就只会被创建一次并且缓存起来）发生更改，useMemo 中的第一个参数才会执行；
   */ 
  const [first, setFirst] = useState(0);
  <h1
    onClick={() => setFirst((pre) => pre + 3)}  // 点击事件会引发组件的更新机制
  >
    {useMemo(() => {
      return <>{
        // 假设加载此 dom 是一个极其损耗性能且没有必要的操作
        first
      }</>;  // 此时不需要 first 的更新。
    }, [])}
  </h1>;
```

- `useMemo` 对函数返回值进行了缓存，如无必要则不更新；

#### useCallback

1. `useCallback` 将备忘 fn 函数的值。与 `useMemo` 和 `useEffect` 一样，`useCallback` 的第二个参数也是一个依赖数组。
2. 第二个参数若为空，这个备忘只回调就值创建一次。

```javascript
  /** 
   * 点击事件会触发 => 状态的改变 => 触发 dom 的更新
   * 
   */ 
  const [first, setFirst] = useState(0);

  // const fn = () => {
  //   // 原函数每次都会被调用，因为 这个 fn 每次状态改变都是一个新的返回值
  //   console.log("fn 被调用");
  // };
  // or
  const fn = useCallback(() => {
    // 该函数就只会被缓存一次，此时的 fn 是被 useCallback 缓存再来的函数值
    console.log("fn 被调用");
  }, [
    // 监听不发生改变，fn 就只会被创建一次并缓存下来；
  ]);

  useEffect(() => {
    console.log("first 更新");
    fn();
  }, [fn  // 使用 useCallback 缓存 fn，则每次 setFirst 改变状态以后，函数更新 fn 会执行调用
  ]); 
  <h1
    onClick={() => setFirst((pre) => pre + 3)}  // 点击事件会引发组件的更新机制
  >{first}</h1>;
```

##### useImperativeHandle

1. useImperativeHandle 可以在使用 ref 时，自定义暴露给父组件的实例值
2. 父组件可以使用操作子组件中的多个 ref

        function Child(props, parentRef) {
        // 子组件内部自己创建 ref
        let focusRef = useRef();
        let inputRef = useRef();
        useImperativeHandle(parentRef, () => {
            // 这个函数会返回一个对象
            // 该对象会作为父组件 current 属性的值
            // 通过这种方式，父组件可以使用操作子组件中的多个 ref
            return {
                focusRef,
                inputRef,
                name: '计数器',
                focus() {
                    focusRef.current.focus();
                },
                changeText(text) {
                    inputRef.current.value = text;
                }
            }
        });
        return (
            <>
                <input ref={focusRef} />
                <input ref={inputRef} />
            </>
        )

    }

#### useReducer

    const [state, dispatch] = useReducer(reducer, initialState);
