'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileNav = () => {
  const current = usePathname();

  const links = [
    { href: '/profil/sejarah', label: 'Sejarah' },
    { href: '/profil/sambutan', label: 'Sambutan' },
    { href: '/profil/visi-misi', label: 'Visi dan Misi' },
  ];

  return (
    <div className="flex space-x-4 my-4 border-b pb-2 mt-16">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded ${
            current === link.href ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default ProfileNav;
