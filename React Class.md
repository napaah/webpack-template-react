# React Class

## 生命周期

react 生命周期：`https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/`；
图解 react 生命周期：`https://juejin.cn/post/6844903510538977287`；

生命周期时期：

⤵️ 挂载时
🔂 更新时
🔚 卸载时

⭐️ 常用
😑 不常用
🚮 已移除
💥 注意

#### 生命周期

> - constructor()：初始化state和绑定事件处理方法
> - getDerivedStateFromProps()：v16.3 之前只在挂载阶段，v16.4之后更新也执行；
> - componentWillMount()：组件即将挂载，只调用一次（**已废弃**）🚮
> - componentWillReceiveProps()：只会在props引起的组件更新时候调用（**已废除**）🚮
> - shouldComponentUpdate()：通过返回true跟false来决定组件是否更新，在这里不能调用setState，会引起循环调用
> - componentWillUpdate()：组件更新前，在这里不能调用setState，会引起循环调用（**已废除**）🚮
> - render()
> - getSnapshotBeforeUpdate()
> - componentDidMount()
> - componentDidUpdate()
> - componentWillUnmount() :
> - componentDidCatch()

- 被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现打断现有任务导致它们被执行多次

#### 完整声明周期函数概览

|          挂载时            |  备注  |              说明               |
| ------------------------- | ------ | ------------------------------- |
| constructor               | ⭐️ ⤵️ | 初始状态、定义初始状态等等 |
| getDerivedStateFromProps  | 😑 ⤵️ | 初始化外部属性以及初始化状态 |
| componentWillMount        | ⭐️ ⤵️ | 组件渲染到页面之前执行 |
| render                    | ⭐️ ⤵️ | 渲染阶段，初始化 Virtual Dom 用来描述 UI |
| React 更新 DOM 和 refs    | 💥     | Virtual Dom 完成，交付浏览器执行 UI 绘制 |
| 浏览器绘制 UI             | 💥     | 与 React 无关，浏览器执行 UI 绘制 |
| componentDidMount         | ⭐️ ⤵️ | 组件挂载后触发，此时页面 DOM 绘制已完成 |

|          更新时            |   备注  |              说明               |
| ------------------------- | ------- | ------------------------------- |
| componentWillReceiveProps | 😑 🔂  | 一般是 props 发生改变后触发（首次不触发） |
| getDerivedStateFromProps  | 😑 🔂  | v16.4 后可以从外部属性更新一些内部方法 |
| ① shouldComponentUpdate   | ⭐️ 🔂  | props、state 改变后触发，用来优化组件是否 render |
| componentWillUpdate       | ⭐️ 🔂  | 组件即将被更新时触发，执行更新逻辑 |
| ② render                  | ⭐️ 🔂  | 不执行 ① 中返回 false 的部分，计算其他虚拟 dom 的部分并执行 render |
| getSnapshotBeforeUpdate   | 😑💥🔂 | 在页面 UI 绘制之前调用 |
| React 更新 DOM 和 Refs    | 💥      | Virtual Dom 完成，执行真实 Dom 的更新 |
| 浏览器绘制 UI              | 💥      | 与 React 无关，浏览器根据 ② 绘制新 UI |
| componentDidUpdate        | ⭐️ 🔂  | render 之后 & UI 更新时触发，执行更新后逻辑 |

|          销毁时            |   备注  |              说明               |
| ------------------------- | ------- | ------------------------------- |
| componentWillUnmount      | ⭐️ 🔚  | 组件销毁触发，执行一些处理，释放内存 |

|          错误处理            |   备注  |              说明               |
| --------------------------- | ------- | ------------------------------- |
| componentDidCatch(err,info) | 😑💥   | 捕捉到它的子元素（包括嵌套子元素）抛出的异常 |

#### constructor()

1. 用于初始化内部状态，很少使用，只在初始化挂载时执行；
2. 唯一可以直接修改 `state` 的地方（唯一不调用 `this.setState()` 就可以修改 `state` 的方式）；
3. 用于设置组件的初始状态。

从技术上讲，构造函数并不是一个生命周期的方法。这里将它包含进来是因为它被用于组件初始化（这也是 State 被初始化的地方）。当然，当挂载某个组件时，构造函数永远都是第一个被触发的。 —— 《React 学习手册》（后文大部分内容摘抄于本书）

#### getDerivedStateFromProps()

1. v16.3 引入适用于 React 从外部属性初始化一些内部状态的方法；
2. 当 state 需要从 props 初始化时使用；
3. react 内部执行；
4. **尽量不要使用**，维护此状态会增加复杂度；
5. v16.4 以后每次 render 都会调用；
6. 使用场景：表单控件获取默认值

#### componentWillMount()

（**已废弃**）

1. 可用 constructor + componentDidMount 代替

- 请求 sessionStorage
- 定义初始化的数据（例如表头、一些不适合放在 constructor 内的大量的默认数据）
- 也有用作接口请求，用于初始化的数据

一旦属性被获取并且初始化了 State，`componentWillMount` 方法将会被触发。该方法是在 DOM 被渲染之前触发的，并且可以用来初始化第三方脚本库、启动动画、请求数据，以及其他可能需要在组件被渲染之前执行的额外步骤。还可以在该方法中触发 `setState` 方法，在组件初次被渲染之前修改组件的 State。

一般可以用来请求接口，返回值作为数据源来判断表格的 loading 状态等。

- **在组件被渲染完毕之前调用 `setState` 方法将不会启动更新生命周期。**
- 在组件渲染我完毕之后就调用 `setState` 方法就会启动更新生命周期。如果用户在 `componentWillMount` 方法中定义的回调函数内调用了 `setState` 方法，那么它将会在组件被完全渲染之后触发，并且会启动更新生命周期。

#### componentWillReceiveProps(prevProps)

（**已废除**）

1. 会破坏state数据的单一数据源，导致组件状态不好预测，还会增加重绘次数，用 getDerivedStateFromProps 替代

- 父组件中的 props 发生改变时候，一般用于父组件状态更新时子组件的重新渲染。
- 仅当新的属性被传递给组件后才会调用。这可以调用 setState 方法。

#### shouldComponentUpdate(nextprops, nextstates)

1. 决定 Virtual Dom 是否需要重绘；
2. 若状态改变该函数返回 false，则不会调用 render，否则状态改变会执行 render；
3. 应用场景：性能优化，**返回 false 来阻止不必要的 UI 更新**；

- 项目中一般用来组织调用 render，以及处理一些更新的事件。
- 更新生命周期的门卫，一个可以取消更新操作的谓词。该方法可以通过值允许执行必须的更新来改进性能。

`shouldComponentUpdate` 方法可以比较新旧属性之间的差异。新属性会作为参数传给该方法，旧属性仍然在当前 props 中，并且该组件还未被更新。
如果 `shouldComponentUpdate` 返回的是 true，其余更新的生命周期将会知道这一点。其余的生命周期函数也会通过参数接收到新的 props 和新的 State。（`componentDidUpdate` 方法会接收到上一个 props 和上一个 State，因为一旦该方法被触发了，更新操作就已经执行了，props 也会发生了变化）。

#### componentWillUpdate(nextProps, nextState)

（**已废除**）

1. 用 getSnapshotBeforeUpdate(prevProps, prevState) 返回的值作为 componentDidUpdate 第三个参数;
2. componentDidUpdate(prevProps, prevState, snapshot)

- 已废除的生命周期推荐使用，但仍然可以作为组件数据更新后，render 前执行的操作；
- 在组件更新之前执行触发。和 `componentWillMount` 类似，它只会在每次更新操作之前触发。
- **在生命周期中，`componentWillUpdate` 紧跟着 `shouldComponentUpdate` 方法之后执行。**

#### render()

1. 渲染阶段，用来描述 UI，即生成 虚拟 Dom；
2. 更新时不会去执行 `shouldComponentUpdate()` 返回 false 的部分；
3. 计算虚拟 Dom 中需要更新的部分并去 render 它；
4. 定义 Dom，并返回 React Dom；

#### getSnapshotBeforeUpdate()

（**v16.3 新增**）推荐使用

1. 在页面 render 之前调用，state 已更新；
2. 应用场景：获取 render 之前的 DOM 状态；
3. 会在最终确定的render执行之前执行，能保证到跟 componentDidUpdate 的元素状态相同

#### componentDidMount()

1. UI 渲染完成之后调用；
2. 只执行一次；
3. 典型场景：获取外部资源
4. 一般在挂载阶段 发起 `Ajax`请求、定义资源、做一些处理副作用的事情

- `componentDidMount` 方法是另外一个创建 API 请求的地方，该方法只会在组件渲染完毕之后触发。该方法中任意的 `setState` 方法调用都将启动更新生命周期，并且重新渲染组件。
- 也是初始化任何需要用到 DOM 的第三方 JavaScript 的地方，例如，一些交互生成的 dom 可以在这里处理。
- 该方法的另一个有点事可以用于启动诸如 `intervals` 或者 `timers` 这样的后台进程。任何 `componentDidMount` 或者 `componentWillMount` 方法中启动的进程都可以在 `componentWillUnmount` 方法中被清除。当不需要这些后台进程时，用户可能也不希望它们继续在后台执行。

#### componentDidUpdate(prevProps, prevState, snapshot)

1. 每次 UI 更新后都会被调用；
2. 做一些更新后的操作；
3. 应用场景：页面需要 props 变化重新获取数据；

- 只在更新操作发生之后，调用 render 方法之后触发。类似 `componentDidmount` 方法，不过它在每次更新之后触发。

#### componentWillUnmount()

1. 组件卸载及销毁之前执行，做一些释放资源的事情；

`componentWillUnmount` 方法只会在组件被卸载之前触发。

#### componentDidCatch()

1. React 16 提供的一个内置函数 componentDidCatch(err,info)，如果 render() 函数抛出错误，该函数可以捕捉到错误信息，并且可以展示相应的错误信息
2. 第一个参数指的是抛出的实际错误。第二个参数是指错误信息。

#### 练习 Demo

```javascript
/**
 * react 类组件继承了 react Component 这个基类，才能使用 生命周期的方法
 * 函数组件不能使用生命周期方法的原因也是如此
 */ 
import React, { useState, Component } from "react";

// 子 (类)组件
class ChoidrenComponent extends Component {
  /**
   * 构造函数
   * @param {object} props 不可被更改的组件
   */
  constructor(props) {
    super(props);
    this.state = { count: 0, color: "#FFF000" };
    console.log("构造函数-执行");
  }

  /**
   * getDerivedStateFormProps 阶段：
   * 纯净且不包含副作用。可能会被 React 暂停，中止或重新启动
   * 16.3 以后新加
   */
  getDerivedStateFormProps() {
    // 不推荐使用， React 内部执行
    console.log("getDerivedStateFormProps 被执行");
  }

  /**
   * componentWillmount阶段：
   * 现版本已移除
   */
  componentWillMount() {
    // 不推荐使用， React 内部执行
    console.log("componentWillMount 执行");
  }

  /**
   * 组件更新阶段 - 手动更新 (性能优化)
   * react 组件的灵活性的体现：将不需要引起 dom 更新的值 return false，可阻止不必要的性能浪费
   * 升级到 hook 的版本 => useMemo()
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.color !== this.props.color) {
      console.log("执行了 shouldComponentUpdate");
      return true;
    }
  }

  /**
   * 组件更新阶段 - 监听
   * props 数据更新后才会执行此函数
   * 一般可以用来操作一些更新操作
   * @param {object} nextProps 更新的 props 传入的 porps 改变执行
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.setState({ color: nextProps.color });
      console.log(`count 由 ${this.state.color} 变化到了 ${nextProps.color}`);
    }
    console.log("执行了 componentWillReceiveProps，说明 props 的内容发生改变");
  }

  /**
   * 刚开始渲染的时候--生命周期函数
   */
  componentDidMount() {
    console.log(
      `componentDidMount => You Clicked ${this.state.count}，执行了--渲染--`
    );
  }

  /**
   * 组件更新的时候调用--生命周期函数
   */
  componentDidUpdate() {
    console.log(
      `componentDidUpdate=> You Clicked ${this.state.count}，执行了--更新--`
    );
  }

  /**
   * 组件卸载阶段执行
   * 通常是 react 组件以及从 DOM 中移除（即 UI 卸载之后执行），但是组件中还有一些操作未结束：
   * 1. 清除定时器
   * 2. 解绑 dom 事件
   * 3. 清除网络状态
   *
   * **将状态或者变量设置 null 后，浏览器会在下次垃圾回收中清除没用的变量**
   */
  componentWillUnmount() {
    console.log("组件卸载，执行 => componentWillUnmount");
  }

  /**
   * 此后都为自定义函数
   */
  addCount() {
    this.setState({
      count: this.state.count + 4,
    });
  }

  /**
   * 渲染阶段 -- 一般 render 写在最后
   * @returns react dom
   */
  render() {
    console.log("执行了 render");
    return (
      <div style={{ fontSize: "18px" }}>
        <h1
          style={{ backgroundColor: this.state.color }}
        >{`props改变color ${this.state.color}`}</h1>
        <br />
        {this.state.count} times<br></br>
        <button onClick={this.addCount.bind(this)}>Click</button>
      </div>
    );
  }
}

// 父组件
const ClassComponent = () => {
  const [color, setVal] = useState(null);
  const [isShow, setIsShow] = useState(true);
  return (
    <div
      style={{ border: "2px solid #1995d3" }}
      onClick={() => setVal((v) => `#${Math.random().toString(16).substr(-6)}`)}
    >
      <button onClick={() => setIsShow(!isShow)}>卸载子组件</button>
      {isShow && <ChoidrenComponent color={color} />}
    </div>
  );
};

export default ClassComponent;

```

#### 更新生命周期

更新生命周期是当组件 State 发生变化或者从父组件接收到新的属性时触发的一系列方法。该系列生命周期可以用来在更新组件之前或者之后与 DOM 交互时集成 JavaScript。此外它还可以用来改进应用程序的性能，因为它为用户提供了取消不必要更新操作的能力。

更新生命周期会在每次调用 setState 方法后启动。**调用 setState 方法过程内部的更新生命周期将会引发无限递归循环**，从而导致堆栈溢出的错误。因此，只能在 `componentWillReceiveProps` 方法内部调用 setState 方法，它允许组件属性被更新后更新 State。

😄😆😊😃😏😍😘😚😳😌😆😁😉😜😝😀😗😙😛😴😟😦😧😮😬😕😯😇
    *文档不合理的地方敬请及时更正，谢谢*
😑😒😅😓😥😩😔😞😖😨😰😣😢😭😂😲😱😫😠😡😤😪😋😷😎😵😐😶
