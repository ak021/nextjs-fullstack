import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="font-medium text-lg ">Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        <Link href="/auth/login">
          <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
            Join now
          </a>
        </Link>
      </ul>
    </nav>
  );
}
