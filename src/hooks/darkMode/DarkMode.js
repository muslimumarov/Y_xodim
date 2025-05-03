import { useEffect } from "react";
import { useState } from "react";

export const DarkMode = () => {
  const [theme, settheme] = useState("ligth");
  const [color, setcolor] = useState("purple");
  const [family, setfamily] = useState("inter");
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(theme);
    document.body.classList.add(color);
    document.body.classList.add(family);
  }, [theme, color, family]);

  return { settheme, setcolor, setfamily };
};
