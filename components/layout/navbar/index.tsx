import Image from "next/image";
import nasaLogo from "@/assets/images/nasa.png";

const Navbar = () => {
  return (
    <div className="px-3 py-4 bg-dark-100">
      <div className="gap-3 flex justify-center items-center">
        <Image className="w-8" src={nasaLogo} alt="Nasa's Logo" />
        <h1 className="font-extrabold uppercase tracking-wide">Nasa Gallery</h1>
      </div>
    </div>
  );
};

export default Navbar;
