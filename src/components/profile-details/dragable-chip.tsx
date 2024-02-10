import React, { useRef } from 'react';
import { Chip } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
import { Skill } from '@/types';

export type DragSkillItem = {
  name: string;
  type: Skill['type'];
  index: number;
};

const DraggableChip = ({
  label,
  onDelete,
  skillType,
  index,
  moveCard
}: {
  label: string;
  onDelete: Function;
  skillType: Skill['type'] | 'new_skill';
  index: number;
  moveCard: Function;
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: skillType,
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = (item as DragSkillItem).index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      if (skillType !== (item as DragSkillItem).type) return;

      // Determine rectangle on screen
      const hoverBoundingRect = (ref.current as any)?.getBoundingClientRect();
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the item's width
      // When dragging to the right, only move when the cursor is to the right of 50%
      // When dragging to the left, only move when the cursor is to the left of 50%
      // Dragging to the right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging to the left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, (item as DragSkillItem)?.type);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      (item as DragSkillItem).index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: skillType,
    item: { name: label, type: skillType, index } as DragSkillItem,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  drag(drop(ref));
  return (
    <Chip
      ref={ref}
      onDelete={() => onDelete()}
      label={label}
      sx={{
        color: 'white',
        border: '1px solid white',
        opacity: isDragging ? 0.4 : 1,
        '& svg': {
          color: '#ffffff80 !important'
        }
      }}
    />
  );
};

export default DraggableChip;
