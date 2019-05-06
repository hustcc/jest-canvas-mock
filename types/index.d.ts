export interface CanvasRenderingContext2DEvent {
  /**
   * This is the type of canvas event that occured.
   */
  type: string;
  /**
   * This is a six element array that contains the current state of the canvas `currentTransform`
   * value.
   */
  transform: [number, number, number, number, number, number];
  /**
   * These are the relevant properties related to this canvas event.
   */
  props: {
    [key: string]: any;
  };
}

declare global {
  interface CanvasRenderingContext2D {
    /**
     * Get all the events associated with this CanvasRenderingContext2D object.
     *
     * This method cannot be used in a production environment, only with `jest` using
     * `jest-canvas-mock` and should only be used for testing.
     *
     * @example
     * expect(ctx.__getEvents()).toMatchSnapshot();
     */
    __getEvents(): CanvasRenderingContext2DEvent[];

    /**
     * Get all the successful draw calls associated with this CanvasRenderingContext2D object.
     *
     * This method cannot be used in a production environment, only with `jest` using
     * `jest-canvas-mock` and should only be used for testing.
     *
     * @example
     * expect(ctx.__getDrawCalls()).toMatchSnapshot();
     */
    __getDrawCalls(): CanvasRenderingContext2DEvent[];

    /**
     * Get the current path associated with this CanvasRenderingContext2D object.
     *
     * This method cannot be used in a production environment, only with `jest` using
     * `jest-canvas-mock` and should only be used for testing.
     *
     * @example
     * expect(ctx.__getPath()).toMatchSnapshot();
     */
    __getPath(): CanvasRenderingContext2DEvent[];
  }
}
