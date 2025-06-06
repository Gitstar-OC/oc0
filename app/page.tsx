import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <Link href="/fonts" className="text-blue-500 hover:underline">
        Go to Fonts Page
      </Link>
      <Link href="/images" className="text-blue-500 hover:underline ml-4">
        Go to Images Page
      </Link>
    {/* <Link href="/budframe" className="text-blue-500 hover:underline ml-4">
      Learn to build your own docs framework
    </Link> */}
    </div>
  );
}