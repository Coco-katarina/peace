/**
 * DragDropContext HOC
 */
import React from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
export default function contextWrapper(YComponent) {
  return <DndProvider backend={Backend}>
      <YComponent/>
    </DndProvider>
}
// import HTML5Backend from 'react-dnd-html5-backend';
// import {DndProvider} from 'react-dnd';

// export default function contextWrapper(YComponent) {
//     return DragDropContext(HTML5Backend)(YComponent);
// }