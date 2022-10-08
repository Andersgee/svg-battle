import React, { useState, createContext, useContext } from "react";
import { useImageDataFromSvg } from "src/hooks/useImageData";

interface Props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  imageData?: ImageData;
}

const defaultValue: Props = {
  code: "",
  setCode: () => null,
};

const Context = createContext(defaultValue);

interface ProviderProps {
  children: React.ReactNode;
}

const WIDTH = 240;
const HEIGHT = 240;

export function TargetProvider({ children }: ProviderProps) {
  const [code, setCode] = useState("");
  const imageData = useImageDataFromSvg(code, WIDTH, HEIGHT);

  return (
    <Context.Provider
      value={{
        code,
        setCode,
        imageData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useTargetContext = () => useContext(Context);
