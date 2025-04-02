import Link from "next/link";

const NotFound = () => {
  return (
    <section className="m-auto items-center w-full !h-full gap-16">
      <main className="flex flex-col mt-10 md:mt-24 gap-16 items-center !h-full justify-center relative">
        <div className="flex items-center flex-col gap-4 w-full">
          <h1 className="h1 text-center">Are you lost there, bud?</h1>
          <p className="h4 text-center">
            Aw shucks, looks like the page you&apos;re looking for doesn&apos;t
            exist.
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 w-fit py-2 px-4 border border-solid border-midgrey !bg-fullwhite rounded-full hover:bg-midgrey/5 transition-colors"
          >
            <p className="h4">Return Home</p>
          </Link>
        </div>
      </main>
    </section>
  );
};

export default NotFound;
