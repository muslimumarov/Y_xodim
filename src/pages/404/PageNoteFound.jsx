import { Link } from "react-router-dom";

export const PageNoteFound = () => {
  return (
    <section className="py-10 bg-white h-screen rounded-2xl flex items-center justify-center flex-col">
      {/* https://cdn.dribbble.com/users/2657768/screenshots/6413526/404_43.gif */}
      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
        <h1 className="text-center text-7xl font-bold">404</h1>
      </div>
      <div className="mt-[-50px]">
        <Link
          to={"/"}
          className="text-white py-3 px-6 bg-[#39ac31] text-center mt-5 block w-max rounded no-underline"
        >
          Orqaga
        </Link>
      </div>
    </section>
  );
};
