# @anikghosh256/reactive-state

A lightweight, reactive state management library with deep reactivity using `Proxy`. It is ideal for managing application state with automatic updates to subscribed listeners, making it easy to build reactive applications.

## Features

- **Deep Reactivity**: Automatically creates deeply reactive objects using `Proxy`, so nested objects or arrays also trigger reactivity.
- **Automatic Updates**: Subscribed listeners are automatically notified when the state changes.
- **Simple API**: Easy-to-use methods for managing state and triggering re-renders.

## Installation

To install `@anikghosh256/reactive-state`, use npm or yarn:

```bash
npm install @anikghosh256/reactive-state
```

## Usage

### Creating a Reactive State

Use the createReactiveState function to create a reactive state. Pass an initial state object, and it returns an object with the reactive state and methods for managing it.

```js
const { createReactiveState } = require("@anikghosh256/reactive-state");

// Initial state
const initialState = {
  user: {
    name: "John",
    age: 30,
  },
  counter: 0,
};

// Create reactive state
const stateManager = createReactiveState(initialState);

// Accessing the reactive state
console.log(stateManager.state.user.name); // John
console.log(stateManager.state.counter); // 0
```

### Subscribing to State Changes

To listen for changes to the state, use the onChange method. This method takes a listener function that is called whenever the state is updated.

```js
// Subscribe to state changes
const unsubscribe = stateManager.onChange(() => {
  console.log("State updated:", stateManager.state);
});

// Trigger a state change
stateManager.setState({ counter: 1 }); // This will trigger the listener

// Unsubscribe from state changes
unsubscribe();
```

### Updating the State

Use the setState method to update parts of the state. This method takes an object with the updated state values. If any values have changed, all subscribed listeners are notified.

```js
// Update state and trigger listeners
stateManager.setState({ user: { name: "Alice" } }); // This will trigger the listener

// Optional: Prevent automatic notification of listeners by passing false as the second argument
stateManager.setState({ counter: 2 }, false); // This will not trigger the listener
```

### Unsubscribing from State Changes

To stop listening for state updates, call the unsubscribe function that `onChange` returns. This prevents the listener from being triggered when the state changes.

```js
// Subscribe to state updates
const unsubscribe = stateManager.onChange(() => {
  console.log("State updated:", stateManager.state);
});

// Unsubscribe from state updates
unsubscribe();

// State changes will no longer trigger the listener
stateManager.setState({ counter: 3 });
```

## Full Example

Here’s a full example demonstrating how to create reactive state, subscribe to changes, update the state, and unsubscribe from changes:

```js
const { createReactiveState } = require("@anikghosh256/reactive-state");

const initialState = {
  user: {
    name: "John",
    age: 30,
  },
  counter: 0,
};

// Create reactive state
const stateManager = createReactiveState(initialState);

// Subscribe to state changes
const unsubscribe = stateManager.onChange(() => {
  console.log("State updated:", stateManager.state);
});

// Trigger a state update
stateManager.setState({ user: { name: "Alice" } }); // State updated: { user: { name: 'Alice', age: 30 }, counter: 0 }

// Update counter
stateManager.setState({ counter: 1 }); // State updated: { user: { name: 'Alice', age: 30 }, counter: 1 }

// Prevent re-render by passing false
stateManager.setState({ counter: 2 }, false); // State updated: { user: { name: 'Alice', age: 30 }, counter: 2 }

// Unsubscribe from state changes
unsubscribe();

// This change will NOT trigger the listener
stateManager.setState({ counter: 3 }); // (No output)
```

## API Reference

### `createReactiveState(initialState)`

- Parameters:
  - initialState (Object) - The initial state object to create the reactive state.
- Returns:
  - An object with the following methods:
    - state (Object) - The deeply reactive state object.
    - onChange(listener) (Function) - Subscribes to state changes. Returns an unsubscribe function.
    - setState(updates, reRender) (Function) - Updates the state. If reRender is true (default), listeners are notified. Set reRender to false to prevent notification.

### `onChange(listener)`

- Parameters:
  - listener (Function) - A callback function that is called when the state changes.
- Returns:
  - A function to unsubscribe from state updates.

### `setState(updates, reRender)`

- Parameters:
  - updates (Object) - The new values to update in the state.
  - reRender (Boolean) - Optional. Defaults to true. If set to false, listeners won't be notified of the change.
- Returns:
  - void.

### `unsubscribe()`

- A function returned by onChange that stops further notifications for state updates.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
