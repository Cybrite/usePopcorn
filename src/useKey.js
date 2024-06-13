import { useEffect } from "react";

export function useKey(action, key) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.tolowerCase() === key.tolowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
