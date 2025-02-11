/**
 * A lightweight reactive state management library with deep reactivity using Proxy.
 * Ideal for managing application state with automatic updates to subscribed listeners.
 */

/**
 * Creates a deeply reactive object using Proxy.
 * @param {Object} obj - The initial object to be made reactive.
 * @returns {Object} - A reactive proxy of the given object.
 */
const deepReactive = (obj) => {
  return new Proxy(obj, {
    get(target, key) {
      const value = target[key];
      if (typeof value === "object" && value !== null) {
        return deepReactive(value);
      }
      return value;
    },
    set(target, key, value) {
      if (target[key] !== value) {
        target[key] = value;
      }
      return true;
    },
  });
};

/**
 * Creates a reactive state manager with deep reactivity.
 * @param {Object} initialState - The initial state object.
 * @returns {Object} - The reactive state instance.
 */
const createReactiveState = (initialState) => {
  const listeners = new Set();
  const state = deepReactive(initialState);

  const notify = () => {
    listeners.forEach((fn) => fn());
  };

  return {
    state,
    /**
     * Subscribes to state changes.
     * @param {Function} listener - Callback function to be called on state update.
     * @returns {Function} - Unsubscribe function.
     */
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    /**
     * Updates the state and notifies listeners if changes occurred.
     * @param {Object} updates - The state updates.
     * @param {boolean} [reRender=true] - Whether to notify listeners.
     */
    setState(updates, reRender = true) {
      let hasChanges = false;
      Object.keys(updates).forEach((key) => {
        if (JSON.stringify(state[key]) !== JSON.stringify(updates[key])) {
          state[key] = updates[key];
          hasChanges = true;
        }
      });
      if (reRender && hasChanges) {
        notify();
      }
    },
  };
};

module.exports = { createReactiveState };
module.exports.default = createReactiveState;
