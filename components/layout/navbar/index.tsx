import Image from "next/image";
import nasaLogo from "@/assets/images/nasa.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-3 h-14 flex items-center justify-center md:justify-start bg-dark-200 relative z-50">
      <Link href="/" className="gap-3 flex items-center">
        <Image className="w-8" src={nasaLogo} alt="Nasa's Logo" />
        <h1 className="font-extrabold uppercase tracking-wide">Nasa Gallery</h1>
      </Link>
    </div>
  );
};

export default Navbar;
