const { createReactiveState } = require("..");

describe("createReactiveState", () => {
  let stateManager;

  beforeEach(() => {
    const initialState = {
      user: { name: "John", age: 30 },
      counter: 0,
    };
    stateManager = createReactiveState(initialState);
  });

  test("should create a reactive state", () => {
    expect(stateManager.state.user.name).toBe("John");
    expect(stateManager.state.counter).toBe(0);
  });

  test("should subscribe to state changes", () => {
    const mockListener = jest.fn();
    const unsubscribe = stateManager.onChange(mockListener);

    stateManager.setState({ counter: 1 });
    expect(mockListener).toHaveBeenCalledTimes(1);

    unsubscribe();
    stateManager.setState({ counter: 2 });
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should update state and notify listeners", () => {
    const mockListener = jest.fn();
    stateManager.onChange(mockListener);

    stateManager.setState({ counter: 1 });
    expect(stateManager.state.counter).toBe(1);
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should not notify listeners if reRender is false", () => {
    const mockListener = jest.fn();
    stateManager.onChange(mockListener);

    stateManager.setState({ counter: 1 }, false);
    expect(mockListener).toHaveBeenCalledTimes(0);
    expect(stateManager.state.counter).toBe(1);
  });

  test("should unsubscribe from state changes", () => {
    const mockListener = jest.fn();
    const unsubscribe = stateManager.onChange(mockListener);

    stateManager.setState({ counter: 1 });
    unsubscribe();
    stateManager.setState({ counter: 2 });
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should handle deeply nested objects", () => {
    const mockListener = jest.fn();
    stateManager.onChange(mockListener);

    stateManager.setState({ user: { name: "Alice", age: 25 } });
    expect(stateManager.state.user.name).toBe("Alice");
    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  test("should not notify on identical state updates", () => {
    const mockListener = jest.fn();
    stateManager.onChange(mockListener);

    stateManager.setState({ counter: 0 });
    expect(mockListener).toHaveBeenCalledTimes(0);
  });
});
