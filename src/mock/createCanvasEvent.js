/**
 * This function returns a CanvasRenderingContext2DEvent. Whenever an operation would modify the canvas
 * context, this function should be used to generate an "event" that represents that sort of modification.
 * This will be used to mock for snapshots.
 *
 * @example
 * interface CanvasRenderingContext2DEvent {
 *   type: string;
 *   transform?: [number, number, number, number, number, number];
 *     // the resulting current transform
 *     // if undefined, defaults to identity transform [1, 0, 0, 1, 0, 0]
 *   props: {
 *     // if the event is a property was set, `event.props.value` would be set
 *     [propName: string]: any;
 *   };
 * }
 */
export default function createCanvasEvent(type, transform, props) {
  // do not pass identity transform matrix to make snapshots smaller
  const [a, b, c, d, e, f] = transform;
  if (a == 1 && b == 0 && c == 0 && d == 1 && e == 0 && f == 0)
    return { type, props };
  return { type, transform, props };
}
