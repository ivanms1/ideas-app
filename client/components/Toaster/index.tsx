import { Position, Toaster } from '@blueprintjs/core';

export const AppToast =
  typeof window !== 'undefined'
    ? Toaster.create({
        className: 'my-toaster',
        position: Position.TOP
      })
    : null;
