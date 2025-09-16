interface DragState {
  active: boolean;
  pointerId: number | null;
  startX: number;
  scrollLeft: number;
  lastTime: number;
  lastScrollLeft: number;
  velocity: number;
}

interface MomentumOptions {
  threshold: number;
  maxVelocity: number;
  deceleration: number;
  snapSelector: string;
}

interface ContainerState {
  drag: DragState;
  options: MomentumOptions;
  momentumFrame?: number;
  cleanup: () => void;
}

const DEFAULT_OPTIONS: MomentumOptions = {
  threshold: 0.005,
  maxVelocity: 5,
  deceleration: 0.00375,
  snapSelector: ".forecast-item",
};

const stateMap = new WeakMap<HTMLElement, ContainerState>();

const createDragState = (): DragState => ({
  active: false,
  pointerId: null,
  startX: 0,
  scrollLeft: 0,
  lastTime: 0,
  lastScrollLeft: 0,
  velocity: 0,
});

export const enableMomentumScroll = (
  container: HTMLElement,
  customOptions: Partial<MomentumOptions> = {}
): (() => void) => {
  const existing = stateMap.get(container);
  if (existing) {
    return existing.cleanup;
  }

  const options: MomentumOptions = { ...DEFAULT_OPTIONS, ...customOptions };
  const state: ContainerState = {
    drag: createDragState(),
    options,
    momentumFrame: undefined,
    cleanup: () => {
      stopMomentum();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerEnd);
      container.removeEventListener("pointercancel", onPointerEnd);
      stateMap.delete(container);
    },
  };

  const cancelMomentumFrame = () => {
    if (state.momentumFrame !== undefined) {
      cancelAnimationFrame(state.momentumFrame);
      state.momentumFrame = undefined;
    }
  };

  const stopMomentum = () => {
    cancelMomentumFrame();
    container.classList.remove("momentum");
    container.classList.remove("dragging");
  };

  const alignToNearestItem = () => {
    cancelMomentumFrame();

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(options.snapSelector)
    );
    if (!items.length) {
      stopMomentum();
      return;
    }

    const style = getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft || "0");
    const containerRect = container.getBoundingClientRect();
    const alignStart = containerRect.left + paddingLeft;

    let closest: HTMLElement | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left - alignStart);
      if (distance < minDistance) {
        minDistance = distance;
        closest = item;
      }
    }

    if (!closest) {
      stopMomentum();
      return;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    const target =
      container.scrollLeft + (closest.getBoundingClientRect().left - alignStart);
    const clampedTarget = Math.max(0, Math.min(target, maxScroll));

    if (Math.abs(container.scrollLeft - clampedTarget) <= 0.5) {
      container.scrollLeft = clampedTarget;
      stopMomentum();
      return;
    }

    container.classList.add("momentum");
    container.classList.remove("dragging");

    const settle = () => {
      if (!container.isConnected) {
        stopMomentum();
        return;
      }

      const diff = Math.abs(container.scrollLeft - clampedTarget);
      if (diff <= 0.5) {
        container.scrollLeft = clampedTarget;
        stopMomentum();
        return;
      }

      state.momentumFrame = requestAnimationFrame(settle);
    };

    container.scrollTo({ left: clampedTarget, behavior: "smooth" });
    state.momentumFrame = requestAnimationFrame(settle);
  };

  const startMomentum = (initialVelocity: number) => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      stopMomentum();
      return;
    }

    stopMomentum();

    let velocity = initialVelocity;
    if (Math.abs(velocity) > options.maxVelocity) {
      velocity = Math.sign(velocity) * options.maxVelocity;
    }

    let lastTimestamp: number | null = null;
    container.classList.remove("dragging");
    container.classList.add("momentum");

    const step = (timestamp: number) => {
      if (!container.isConnected) {
        stopMomentum();
        return;
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
        state.momentumFrame = requestAnimationFrame(step);
        return;
      }

      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      container.scrollLeft += velocity * dt;
      const maxScrollable = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft <= 0 || container.scrollLeft >= maxScrollable) {
        container.scrollLeft = Math.max(
          0,
          Math.min(container.scrollLeft, maxScrollable)
        );
        alignToNearestItem();
        return;
      }

      const deceleration = options.deceleration;
      const deltaV = deceleration * dt;
      if (Math.abs(velocity) <= deltaV) {
        alignToNearestItem();
        return;
      }

      velocity -= Math.sign(velocity) * deltaV;
      state.momentumFrame = requestAnimationFrame(step);
    };

    state.momentumFrame = requestAnimationFrame(step);
  };

  const resetDragState = () => {
    state.drag = createDragState();
  };

  const onPointerDown = (ev: PointerEvent) => {
    if (!container.isConnected) {
      stopMomentum();
      return;
    }

    stopMomentum();

    if (ev.button !== undefined && ev.button !== 0) {
      return;
    }
    if (ev.pointerType !== "mouse" && ev.pointerType !== "pen") {
      return;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      return;
    }

    state.drag = {
      active: true,
      pointerId: ev.pointerId,
      startX: ev.clientX,
      scrollLeft: container.scrollLeft,
      lastTime: ev.timeStamp,
      lastScrollLeft: container.scrollLeft,
      velocity: 0,
    };

    try {
      container.setPointerCapture(ev.pointerId);
    } catch (err) {
      /* Ignore pointer capture issues */
    }

    container.classList.add("grabbing");
    container.classList.add("dragging");
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!state.drag.active || ev.pointerId !== state.drag.pointerId) {
      return;
    }

    const deltaX = ev.clientX - state.drag.startX;
    container.scrollLeft = state.drag.scrollLeft - deltaX;
    const dt = ev.timeStamp - state.drag.lastTime;
    if (dt > 0) {
      const velocity = (container.scrollLeft - state.drag.lastScrollLeft) / dt;
      state.drag.velocity = velocity;
    }
    state.drag.lastTime = ev.timeStamp;
    state.drag.lastScrollLeft = container.scrollLeft;
    ev.preventDefault();
  };

  const onPointerEnd = (ev: PointerEvent) => {
    if (ev.pointerId !== state.drag.pointerId) {
      return;
    }

    const velocity = state.drag.velocity;
    resetDragState();

    try {
      if (container.hasPointerCapture?.(ev.pointerId)) {
        container.releasePointerCapture(ev.pointerId);
      }
    } catch (err) {
      /* Ignore release errors */
    }

    container.classList.remove("grabbing");
    if (Math.abs(velocity) > options.threshold) {
      startMomentum(velocity);
    } else {
      container.classList.remove("dragging");
      alignToNearestItem();
    }
  };

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove, { passive: false });
  container.addEventListener("pointerup", onPointerEnd);
  container.addEventListener("pointercancel", onPointerEnd);

  state.cleanup = () => {
    stopMomentum();
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerEnd);
    container.removeEventListener("pointercancel", onPointerEnd);
    stateMap.delete(container);
  };

  stateMap.set(container, state);
  return state.cleanup;
};

export const disableMomentumScroll = (container: HTMLElement) => {
  const state = stateMap.get(container);
  if (state) {
    state.cleanup();
  }
};
