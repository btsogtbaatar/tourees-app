import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

function useTimer(
  onTick: (count: number, shouldButtonEnabled?: boolean) => void,
  onEnd: () => void,
  start: number,
) {
  const [counter, setCounter] = useState(start);
  const [_date, setDate] = useState<Date>(
    moment().add(start, 'seconds').toDate(),
  );

  const refOnTick =
    useRef<(count: number, shouldButtonEnabled?: boolean) => void>();
  const refOnEnd = useRef<() => void>();
  const resendButton = 0 - 3000 / 1000;

  useEffect(() => {
    if (start > counter) {
      setCounter(start);
      setDate(moment().add(start, 'seconds').toDate());
    }
  }, [start]);

  useEffect(() => {
    refOnTick.current = onTick;
    refOnEnd.current = onEnd;
  }, [onTick, onEnd]);

  useEffect(() => {
    function tick() {
      if (refOnTick.current) {
        const shouldButtonEnabled: boolean = resendButton >= counter;
        refOnTick.current(counter - 1, shouldButtonEnabled);
      }
      setCounter(counter - 1);
    }
    if (counter) {
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    } else {
      if (refOnEnd.current) {
        refOnEnd.current();
      }
    }
  }, [counter]);

  return <div>useTimer</div>;
}

export default useTimer;
