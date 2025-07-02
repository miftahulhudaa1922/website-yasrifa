"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, UserCircle2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isActive = (path: string) => pathname.startsWith(path);

  // Optional auto-refresh on logout
  useEffect(() => {
    if (status === "unauthenticated") {
      router.refresh();
    }
  }, [status]);

  return (
    <div className="w-full bg-green-900 z-50 fixed top-0 left-0">
      <div className="flex items-center justify-between py-4 px-6 md:px-16">
        <img
          className="w-40 md:w-48"
          src="/images/Logo.png"
          alt="Logo Pondok Pesantren"
        />

        <button className="md:hidden text-white" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center gap-6 text-white text-lg font-semibold">
          <Link href="/" className={navClass(pathname === "/")}>
            Beranda
          </Link>
          <Dropdown
            title="Profil"
            isActive={isActive("/profil")}
            links={[
              { href: "/profil/sejarah", label: "Sejarah" },
              { href: "/profil/sambutan", label: "Sambutan" },
              { href: "/profil/visi-misi", label: "Visi dan Misi" },
            ]}
          />
          <Dropdown
            title="Unit Pendidikan"
            isActive={isActive("/unit-pendidikan")}
            links={[
              { href: "/unit-pendidikan/madrasah-diniyah", label: "Madrasah Diniyah" },
              { href: "/unit-pendidikan/paud", label: "PAUD" },
              { href: "/unit-pendidikan/mi", label: "MITQ" },
              { href: "/unit-pendidikan/smp", label: "SMPI" },
              { href: "/unit-pendidikan/ma", label: "MA" },
              { href: "/unit-pendidikan/smk", label: "SMK" },
            ]}
          />
          <Link
            href="/informasi"
            className={navClass(pathname === "/informasi")}
          >
            Informasi
          </Link>
          <Link href="/galeri" className={navClass(pathname === "/galeri")}>
            Galeri
          </Link>
          <Link href="/kontak" className={navClass(pathname === "/kontak")}>
            Kontak
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/psb">
            <span className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-1 rounded-3xl block text-center">
              PSB
            </span>
          </Link>

          {session?.user?.role === "admin" ? (
            <div className="relative group">
              <button className="text-white hover:text-yellow-400">
                <UserCircle2 size={32} />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/admin-login"
              className="text-white font-bold px-4 py-2 block text-center hover:text-yellow-500 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-green-800 text-white px-6 pb-4 text-base font-semibold space-y-2 transition-all duration-300">
          <MobileLink href="/" label="Beranda" />
          <MobileDropdown
            title="Profil"
            links={[
              { href: "/profil/sejarah", label: "Sejarah" },
              { href: "/profil/sambutan", label: "Sambutan" },
              { href: "/profil/visi-misi", label: "Visi dan Misi" },
            ]}
          />
          <MobileDropdown
            title="Unit Pendidikan"
            links={[
              { href: "/unit-pendidikan/diniyah", label: "Madrasah Diniyah" },
              { href: "/unit-pendidikan/paud", label: "PAUD" },
              { href: "/unit-pendidikan/mi", label: "MITQ" },
              { href: "/unit-pendidikan/smp", label: "SMPI" },
              { href: "/unit-pendidikan/ma", label: "MA" },
              { href: "/unit-pendidikan/smk", label: "SMK" },
            ]}
          />
          <MobileLink href="/informasi" label="Informasi" />
          <MobileLink href="/galeri" label="Galeri" />
          <MobileLink href="/kontak" label="Kontak" />
          <MobileLink href="/psb" label="Pendaftaran" isPrimary />
          {session?.user?.role === "admin" ? (
            <>
              <MobileLink href="/admin" label="Dashboard" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="text-left font-bold text-white px-4 py-2 hover:text-yellow-400"
              >
                Logout
              </button>
            </>
          ) : (
            <MobileLink href="//admin-login" label="Login Admin" />
          )}
        </div>
      )}
    </div>
  );
};

const navClass = (active: boolean) =>
  `px-3 py-2 rounded ${
    active ? "text-yellow-500 font-bold" : "hover:text-yellow-500 font-bold"
  }`;

const Dropdown = ({
  title,
  isActive,
  links,
}: {
  title: string;
  isActive: boolean;
  links: { href: string; label: string }[];
}) => (
  <div
    className={`relative group px-3 py-2 rounded ${
      isActive ? "text-yellow-500 font-bold" : "hover:text-yellow-500 font-bold"
    }`}
  >
    <button className="focus:outline-none">{title} ▾</button>
    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block px-4 py-2 hover:bg-gray-200"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);

const MobileLink = ({
  href,
  label,
  isPrimary = false,
}: {
  href: string;
  label: string;
  isPrimary?: boolean;
}) => (
  <Link
    href={href}
    className={`block font-bold px-4 py-2 rounded-full text-center ${
      isPrimary ? "bg-yellow-600 text-black" : "hover:text-yellow-500"
    }`}
  >
    {label}
  </Link>
);

const MobileDropdown = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => (
  <details className="group">
    <summary className="cursor-pointer hover:text-yellow-500">
      {title} ▾
    </summary>
    <div className="pl-4 flex flex-col text-sm space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-yellow-400"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </details>
);

export default Navbar;
