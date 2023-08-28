/* eslint-disable react/display-name */
import { useEffect, useRef, MouseEventHandler  } from 'react';

type RenderFunction = (provided: any, ...args: any[]) => JSX.Element;

export const useDraggableInPortal = () => {
  const self = useRef<{ elt: HTMLDivElement | null }>({ elt: null }).current;

  useEffect(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.pointerEvents = 'none';
    div.style.width = '100%';
    div.style.height = '100%';
    self.elt = div;
    document.body.appendChild(div);
    return () => {
      if (self.elt) {
        document.body.removeChild(self.elt);
      }
    };
  }, [self]);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (self.elt) {
      const { clientX, clientY } = event;
      self.elt.style.left = `${clientX}px`;
      self.elt.style.top = `${clientY}px`;
    }
  };

  return (render: RenderFunction) => (provided: any, ...args: any[]) => {
    const element = render(provided, ...args);

    return (
      <div onMouseDown={handleMouseDown} style={{ position: 'relative' }}>
        {element}
      </div>
    );
  };
};
