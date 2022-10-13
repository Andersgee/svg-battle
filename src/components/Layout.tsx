import { Nav } from "./Nav";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      {children}
      <footer className="mt-8"></footer>
    </>
  );
}
