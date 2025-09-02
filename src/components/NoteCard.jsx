import { useRef, useEffect, useState } from 'react';
import Trash from '../assets/icons/Trash';
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../pages/utils';

const NoteCard = ({ note }) => {
  const body = bodyParser(note.body);
  const [position, setPositon] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseDown = (e) => {
    mouseStartPos = { x: e.clientX, y: e.clientY };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    setZIndex(cardRef.current);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    console.log('MouseMoveDir : ', mouseMoveDir);

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setPositon(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        background: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ background: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};
export default NoteCard;
