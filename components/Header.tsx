import Image from "next/image";

const Header = () => {
  return (
    <>
    <nav className="sticky top-0 bg-primary z-50">
      <div className="mx-auto p-6 px-8">
        <div className="flex justify-center items-center">
          <a href="/">
            <Image
              src="/Heatmap_logo.svg"
              alt="Heatmap Logo"
              width={200}
              height={100}
            />
          </a>
        </div>
      </div>
    </nav>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[160px] pb-16 md:pb-[100px] lg:pt-[190px] lg:pb-[140px] flex justify-between"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[1000px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:leading-tight lg:text-5xl md:leading-tight md:text-4xl">
                <span className="text-primary">Mentalome: </span> Unveiling the Complex Landscape of Psychiatric Disorders through Comprehensive Transcriptome Analysis
                  
                </h1>
              </div>
            </div>
          </div>
        </div>
        </section>
    </>
  );
};

export default Header;
