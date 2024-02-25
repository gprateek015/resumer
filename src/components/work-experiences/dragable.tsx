import React, { ReactNode, Ref, useRef } from 'react';
import { Experience } from '@/types';
import { Grid, Icon, Typography } from '@mui/material';

import { Button } from '../onboarding-questions/styles';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import ExperienceBox from './experience-box';

type DragableExp = {
  index: number;
};

const DragableExperience = ({
  index,
  moveObject,
  renderItem
}: {
  index: number;
  moveObject: (dragIndex: number, hoverIndex: number) => void;
  renderItem: (ref: Ref<HTMLDivElement>) => ReactNode;
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'work_experience',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = (item as DragableExp).index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = (ref.current as any)?.getBoundingClientRect();
      // Get vertical middle
      const hoverFifthY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 5;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels above
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging down, only move when the cursor is below 50%
      // When dragging up, only move when the cursor is above 50%
      // Dragging down
      if (dragIndex < hoverIndex && hoverClientY < hoverFifthY) {
        return;
      }
      // Dragging up
      if (dragIndex > hoverIndex && hoverClientY > hoverFifthY) {
        return;
      }

      // Time to actually perform the action
      moveObject(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (item as DragableExp).index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'work_experience',
    item: { index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  drag(drop(ref));

  return renderItem(ref);
};

export default DragableExperience;
